
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3Nk8-x-JYcaHvkoyr5wc6NoX-O_re6EM",
  authDomain: "mini-blog-12c8e.firebaseapp.com",
  projectId: "mini-blog-12c8e",
  storageBucket: "mini-blog-12c8e.appspot.com",
  messagingSenderId: "626619447547",
  appId: "1:626619447547:web:bf50dcecb15146b3dc585e"
};


const app = initializeApp(firebaseConfig);

const dataBase = getFirestore(app)


export {dataBase, app};