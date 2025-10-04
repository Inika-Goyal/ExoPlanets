import traceback
try:
    import importlib.util
    spec = importlib.util.spec_from_file_location('m','model.py')
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    print('IMPORT OK')
except Exception:
    traceback.print_exc()
