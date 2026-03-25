#!/bin/bash
# ============================================================
# push.sh — Deploy MyReality portfolio to GitHub Pages
# Usage: bash push.sh
# ============================================================

REPO_URL="https://github.com/kayoinreality/MyReality.git"
BRANCH="main"
COMMIT_MSG="feat: separate CSS/JS, fix GitHub API with cache & fallback"

echo "🚀 MyReality — Git Push"
echo "========================"

# Check if already a git repo
if [ ! -d ".git" ]; then
  echo "📁 Initializing git repo..."
  git init
  git remote add origin "$REPO_URL"
else
  echo "✅ Git repo already initialized"
  # Make sure remote is set
  git remote set-url origin "$REPO_URL" 2>/dev/null || git remote add origin "$REPO_URL"
fi

echo "📦 Staging files..."
git add index.html styles.css script.js CNAME .nojekyll package.json

echo "✍️  Committing..."
git commit -m "$COMMIT_MSG"

echo "⬆️  Pushing to $BRANCH..."
git push -u origin "$BRANCH"

echo ""
echo "✅ Done! Site will be live at https://myreality.tech in ~1 min"
