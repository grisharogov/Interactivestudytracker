# SQE1 Study Tracker

An interactive study tracker for SQE1 exam preparation spanning 11 weeks (21 Oct - 30 Dec).

## Features

- ✅ Weekly study plan with daily tracking
- 📊 Total Activities tracking (58 activities across 7 subjects)
- 🎥 Videos tracking (18 videos)
- 📝 Tests Plan (8 tests with duration and placement)
- 💾 **Auto-save**: All changes are saved locally in your browser
- ✏️ **Edit Mode**: Each table has its own edit/save/cancel controls

## Simple HTML Version

This is a standalone HTML file that requires no build process. Just open `index.html` in a browser or deploy to GitHub Pages.

## Deployment to GitHub Pages with Custom Domain

### Step 1: Update CNAME file
Edit the `CNAME` file and replace `yourdomain.com` with your actual custom domain.

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit - SQE1 Study Tracker"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to your repository Settings → Pages
2. Under "Source", select "Deploy from a branch"
3. Under "Branch", select `main` and `/ (root)`
4. Click Save

Your site will be live at your custom domain in 2-3 minutes!

## Data Persistence

All your progress is saved automatically in your browser's localStorage:
- Checked items (days, activities, videos, tests)
- All edits are preserved even after page reload

**Note**: Data is stored locally in your browser. If you clear your browser data or use a different browser/device, you'll need to re-enter your progress.
