import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: "AIzaSyBt3MAkx72RfMwqu2aI-zyH-6GFPzDHCFQ",
//   authDomain: "photo-sharing-aa8ef.firebaseapp.com",
//   projectId: "photo-sharing-aa8ef",
//   storageBucket: "photo-sharing-aa8ef.appspot.com",
//   messagingSenderId: "774667601400",
//   appId: "1:774667601400:web:5a7ace92588be208e9420d",
//   measurementId: "G-EV3D8WETD0"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBYIFGigxzGUpLBDNgMYPk6kX0AYpRC-wc",
  authDomain: "photo-sharing-499cb.firebaseapp.com",
  databaseURL: "https://photo-sharing-499cb-default-rtdb.firebaseio.com",
  projectId: "photo-sharing-499cb",
  storageBucket: "photo-sharing-499cb.appspot.com",
  messagingSenderId: "700189357013",
  appId: "1:700189357013:web:c30e74ca0864abca85435c",
  measurementId: "G-VVQVLD2XZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)