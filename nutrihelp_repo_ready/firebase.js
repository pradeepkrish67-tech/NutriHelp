// Firebase initialization - replace with your config and host this via module-supporting server
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js';
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Example: save donation (use from frontend with bundler)
export async function saveDonation(donation, file){
  const col = collection(db, 'donations');
  const docRef = await addDoc(col, {...donation, createdAt: new Date()});
  if(file){
    const sref = ref(storage, `donation_images/${docRef.id}`);
    await uploadBytes(sref, file);
    const url = await getDownloadURL(sref);
    await setDoc(doc(db,'donations',docRef.id), {...donation, image:url}, {merge:true});
  }
  return docRef.id;
}
