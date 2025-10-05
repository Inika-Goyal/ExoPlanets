# Contributing to ExoPlanets

Thank you for your interest in contributing! This guide will help you get started.

## 1. Branch Strategy
- `main`: Stable, deployable code.
- Feature branches: `feature/<short-description>`
- Bug fixes: `fix/<short-description>`

## 2. Getting Started
```bash
# Clone and install
git clone <repo-url>
cd ExoPlanets/frontend
npm install
npm run dev
```

## 3. Making Changes
1. Create a branch: `git checkout -b feature/add-planet-table`
2. Make changes and run lint & type checks:
   - `npm run lint`
   - `npm run build` (or `npx tsc --noEmit`)
3. Commit using conventional commits (e.g., `feat: add planet detail panel`).
4. Push and open a Pull Request (PR) into `main`.

## 4. Pull Request Guidelines
- Keep PRs focused (one logical change set).
- Include a clear description: purpose, approach, screenshots if UI.
- Ensure no ESLint errors.
- Add or update docs if behavior changes.

## 5. Code Style
- TypeScript + React.
- Prefer explicit types over `any`.
- Use existing utility functions in `src/lib/`.
- Keep components small and composable.

## 6. Feature Flags
Use `featureFlags.ts` for gated behavior. Add env vars prefixed with `VITE_`.

## 7. Assets
Place static assets under `frontend/public/`. Refer to them with absolute paths like `/kepler.gif`.

## 8. Testing (Future)
Add lightweight tests when a testing framework is introduced.

## 9. Communication
Use PR comments for discussion. For larger changes, open an issue first.

## 10. License and Attribution
Ensure external assets have proper attribution or licensing.

Happy contributing! 🌌
