# How to push this repo to GitHub

This repository was initialized locally and a commit was created. To push these changes to GitHub, follow these steps:

1. Create a repository on GitHub (e.g., `nuvision-news`).
2. Add the remote and push:

```bash
cd "/Users/demarcuscrump/Desktop/NuVision News"
# replace <your-remote-url> with the HTTPS or SSH url from GitHub
git remote add origin <your-remote-url>
# push main branch
git branch -M main
git push -u origin main
```

3. (Optional) Set up branch protection or CI as you prefer.

If you'd like, I can add a `README` badge or GitHub Actions workflow next.
