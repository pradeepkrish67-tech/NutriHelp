#!/bin/sh
# Initialize git repository and make initial commits
git init
git add .
git commit -m "chore: initial commit - NutriHelp starter"
git branch -M main
echo "Repository initialized. Add remote and push:"
echo " git remote add origin <your-repo-url>"
echo " git push -u origin main"
