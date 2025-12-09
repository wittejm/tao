# Deployment Guide

This app is configured to deploy to GitHub Pages at `wittejm.github.io/tao`.

## Setup Steps

1. **Create GitHub repository**
   - Create a new repository named `tao` at https://github.com/wittejm/tao
   - Push this code to the repository:
     ```bash
     cd taoteching-app
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/wittejm/tao.git
     git push -u origin main
     ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the settings

3. **Deploy**
   - The workflow will run automatically on push to `main` branch
   - Or trigger manually from Actions tab → "Deploy to GitHub Pages" → Run workflow
   - After a few minutes, your app will be live at https://wittejm.github.io/tao/

## Manual Deployment

To deploy manually from your local machine:

```bash
npm run build
# Upload the dist/ folder contents to your hosting provider
```

## Local Development

The app is configured with `base: '/tao/'` for GitHub Pages. To develop locally:

```bash
npm run dev
# App runs at http://localhost:5173/tao/
```

If you want to develop without the `/tao/` prefix, temporarily comment out the `base` option in `vite.config.ts`.
