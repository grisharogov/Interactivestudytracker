# SQE1 Study Tracker

An interactive study tracker for SQE1 exam preparation spanning 11 weeks (21 Oct - 30 Dec).

## Features

- ✅ Weekly study plan with daily tracking
- 📊 Total Activities tracking (58 activities across 7 subjects)
- 🎥 Videos tracking (18 videos)
- 📝 Tests Plan (8 tests with duration and placement)
- 💾 **Auto-save**: All changes are saved locally in your browser
- ✏️ **Edit Mode**: Each table has its own edit/save/cancel controls

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

This app is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup Steps:

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to repository Settings → Pages
4. Under "Build and deployment", select "GitHub Actions" as the source
5. The app will automatically build and deploy on every push to main

Your site will be available at: `https://[your-username].github.io/[repository-name]`

## Data Persistence

All your progress is saved automatically in your browser's localStorage:
- Checked items (days, activities, videos, tests)
- Actual pages studied
- All edits are preserved even after page reload

**Note**: Data is stored locally in your browser. If you clear your browser data or use a different browser/device, you'll need to re-enter your progress.
