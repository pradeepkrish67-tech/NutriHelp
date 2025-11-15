// auth.js - client-side firebase auth helpers (modular SDK)
// Replace firebaseConfig in firebase.js and import these helpers via bundler.
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';

export async function signUp(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
export async function signIn(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

// FCM registration (requires firebase-messaging and proper setup)
export async function registerForPush(messaging) {
  try {
    const token = await messaging.getToken({ vapidKey: '<YOUR_VAPID_KEY>' });
    return token;
  } catch (e) {
    console.error('FCM token error', e);
    return null;
  }
}
