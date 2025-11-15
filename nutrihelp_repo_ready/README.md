# NutriHelp — Full Project (Demo)
This zip contains a multi-page demo of NutriHelp with:
- Dark futuristic theme
- Donation upload, preview, offline saving (demo)
- NGO/Volunteer pages (UI)
- Live heatmap (Leaflet) — demo data
- 3D drone simulation (Three.js)
- PWA manifest & service-worker
- Firebase client helper (replace config)
- Firebase Cloud Functions skeleton (index.js) for automation:
  - onNewDonation trigger to schedule expiry/drone tasks
  - scheduled check for expiring donations
- Drone AI helper (chooseDrone)
- AI assistant client demo, multi-language helpers

## How to use
1. Unzip and host with a static server (for module imports use a bundler for firebase and threejs modules).
2. Replace Firebase config in firebase.js and deploy Cloud Functions:
   - `firebase deploy --only functions` (requires firebase-tools)
3. Serve the static site (Live Server / http-server).
4. For full functionality, integrate Firestore rules and FCM for notifications.

This package is intended as a solid starter for your hackathon app. Good luck!


## Quick Git & Deploy Steps

1. Create a GitHub repo and copy the URL.
2. Run `./init_repo.sh` to initialize and commit locally.
3. Add GitHub secret `FIREBASE_SERVICE_ACCOUNT` (service account JSON) to enable GitHub Action deploy.
4. Setup Firebase project and replace config in `firebase.js`.
5. Deploy Cloud Functions: `firebase deploy --only functions`.
6. Deploy hosting via GitHub Action by pushing to `main`.
