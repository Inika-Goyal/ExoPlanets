import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_predict, StratifiedKFold
from sklearn.metrics import classification_report, roc_auc_score, confusion_matrix
import lightgbm as lgb
import xgboost as xgb
import os
os.environ["OMP_NUM_THREADS"] = "1"

# Load data
print("Loading data...")
train = pd.read_csv("../data/train_labeled_scaled.csv")
test = pd.read_csv("../data/test_labeled_scaled.csv")

feature_cols = [
    'orbital_period', 'planet_radius', 'transit_duration', 
    'transit_depth', 'equilibrium_temp', 'insolation_flux',
    'stellar_teff', 'stellar_radius', 'stellar_logg'
]

X_train = train[feature_cols]
y_train = train['label']
X_test = test[feature_cols]
y_test = test['label']

# Define base models with tuned parameters
print("\nInitializing base models...")
base_models = {
    'LightGBM': lgb.LGBMClassifier(
        max_depth=4,
        n_estimators=400,
        learning_rate=0.1,
        subsample=0.75,
        colsample_bytree=1,
        class_weight='balanced',
        random_state=67,
        verbose=-1,
        num_threads=1,
        scale_pos_weight=np.sum(y_train == 0) / np.sum(y_train == 1)
    ),
    'XGBoost': xgb.XGBClassifier(
        n_estimators=175,
        learning_rate=0.1,
        max_depth=6,
        subsample=0.75,
        colsample_bytree=1,
        scale_pos_weight=(y_train==0).sum()/(y_train==1).sum(),
        random_state=67,
        gamma=0,
        reg_lambda=0.1,
        eval_metric='logloss'
    ),
    'RandomForest': RandomForestClassifier(
        n_estimators=200,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        class_weight='balanced',
        random_state=67
    ),
    'ExtraTrees': ExtraTreesClassifier(
        n_estimators=300,
        max_depth=None,
        min_samples_split=5,
        min_samples_leaf=1,
        class_weight='balanced',
        random_state=67,
        max_features=None
    ),
    'LogisticRegression': LogisticRegression(
        C=100,
        class_weight='balanced',
        max_iter=1000,
        random_state=67,
        penalty='l2'
    )
}

# Generate out-of-fold predictions
print("\n=== Generating Out-of-Fold Predictions ===")
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=67)
oof_predictions = np.zeros((len(X_train), len(base_models)))
test_predictions = np.zeros((len(X_test), len(base_models)))

for idx, (name, model) in enumerate(base_models.items()):
    print(f"Processing {name}...")
    
    # Get out-of-fold predictions
    oof_pred = cross_val_predict(
        model, X_train, y_train, 
        cv=skf, method='predict_proba', n_jobs=-1
    )[:, 1]
    
    oof_predictions[:, idx] = oof_pred
    
    # Train on full training data and predict on test
    model.fit(X_train, y_train)
    test_pred = model.predict_proba(X_test)[:, 1]
    test_predictions[:, idx] = test_pred
    
    # Evaluate individual model
    train_auc = roc_auc_score(y_train, oof_pred)
    test_auc = roc_auc_score(y_test, test_pred)
    print(f"  Train AUC: {train_auc:.4f}, Test AUC: {test_auc:.4f}")

# Train final meta-learner
print("\n=== Training Final Meta-Learner ===")
final_meta_model = lgb.LGBMClassifier(
    n_estimators=100,
    learning_rate=0.05,
    max_depth=3,
    class_weight='balanced',
    random_state=67,
    verbose=-1
)
final_meta_model.fit(oof_predictions, y_train)

# Make final predictions
final_predictions = final_meta_model.predict_proba(test_predictions)[:, 1]
final_auc = roc_auc_score(y_test, final_predictions)

print("\n" + "="*80)
print("FINAL MODEL PERFORMANCE")
print("="*80)
print(f"\nTest AUC: {final_auc:.4f}")

# Binary predictions
final_pred_binary = (final_predictions >= 0.5).astype(int)

print("\nClassification Report:")
print(classification_report(y_test, final_pred_binary, 
                          target_names=['FALSE POSITIVE', 'CONFIRMED']))

print("\nConfusion Matrix:")
cm = confusion_matrix(y_test, final_pred_binary)
print(f"TN: {cm[0,0]}, FP: {cm[0,1]}")
print(f"FN: {cm[1,0]}, TP: {cm[1,1]}")

print("\n=== Meta-Model Feature Importances ===")
print("(Contribution of each base model)")
importances = final_meta_model.feature_importances_
for name, importance in zip(base_models.keys(), importances):
    print(f"  {name}: {importance:.4f}")

print("\n=== Base Model Feature Importances ===")
for name, model in base_models.items():
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
        sorted_idx = np.argsort(importances)[::-1]
        print(f"\n{name} Top 5 Features:")
        for i in sorted_idx[:5]:
            print(f"  {feature_cols[i]}: {importances[i]:.4f}")

# Predict on unlabeled candidates
print("\n=== Predicting on Unlabeled Candidates ===")
candidates = pd.read_csv('../data/candidates_unlabeled_scaled.csv')
print(f"Loaded {len(candidates)} unlabeled candidates")

# Handle non-numeric columns
non_numeric_cols = candidates.select_dtypes(include=['object']).columns.tolist()
if non_numeric_cols:
    print(f"\nDropping non-numeric columns: {non_numeric_cols}")
    candidates = candidates.drop(columns=non_numeric_cols)

# Select features in correct order
feature_names = base_models['LightGBM'].feature_name_
candidates_features = candidates[feature_names]

# Generate predictions from base models
candidate_predictions = np.zeros((len(candidates_features), len(base_models)))
for idx, (name, model) in enumerate(base_models.items()):
    pred = model.predict_proba(candidates_features)[:, 1]
    candidate_predictions[:, idx] = pred

# Apply meta-learner
candidate_final_predictions = final_meta_model.predict_proba(candidate_predictions)[:, 1]
candidates['exoplanet_probability'] = candidate_final_predictions

# Get top 10 candidates
top_10_candidates = candidates.nlargest(10, 'exoplanet_probability')

# Get top 3 features
feature_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': base_models['LightGBM'].feature_importances_
}).sort_values('importance', ascending=False)
top_3_features = feature_importance.head(3)['feature'].tolist()

print("\n" + "="*80)
print("TOP 10 MOST LIKELY EXOPLANET CANDIDATES")
print("="*80)

for i, (idx, row) in enumerate(top_10_candidates.iterrows(), 1):
    print(f"\nRank {i}: Candidate {idx}")
    print(f"  Top 3 Features:")
    for feat in top_3_features:
        print(f"    {feat}: {row[feat]:.4f}")

print("\n" + "="*80)

# Prediction statistics
print(f"\nCandidate Prediction Statistics:")
print(f"  Mean probability: {candidate_final_predictions.mean():.4f}")
print(f"  Median probability: {np.median(candidate_final_predictions):.4f}")
print(f"  Std deviation: {candidate_final_predictions.std():.4f}")
print(f"  Min probability: {candidate_final_predictions.min():.4f}")
print(f"  Max probability: {candidate_final_predictions.max():.4f}")

# Distribution
print(f"\nPrediction Distribution:")
bins = [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1.0]
for i in range(len(bins)-1):
    count = np.sum((candidate_final_predictions >= bins[i]) & (candidate_final_predictions < bins[i+1]))
    pct = count / len(candidate_final_predictions) * 100
    print(f"  {bins[i]:.1f} - {bins[i+1]:.1f}: {count:5d} candidates ({pct:5.2f}%)")

# Save results
candidates.to_csv('../data/candidate_predictions.csv', index=False)
top_100 = candidates.nlargest(100, 'exoplanet_probability')
top_100.to_csv('../data/top_100_candidates.csv', index=False)
print(f"\nResults saved to ../data/candidate_predictions.csv and ../data/top_100_candidates.csv")