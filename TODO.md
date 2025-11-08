# TODO List for Netlify Firebase Fix

- [x] Edit `netlify.toml` to remove all Firebase environment variables and add `SECRETS_SCAN_OMIT_KEYS = "REACT_APP_FIREBASE_*"`
- [x] Check `.gitignore` to ensure `.env` is listed; add if missing
- [x] Run `npm run build` locally to verify build succeeds without errors
- [x] Execute git commands: add, commit, and push changes
