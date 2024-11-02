import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxfDib__VrFYO65tSK7mnd4Di7aczbfbo",
  authDomain: "notnotion-131c3.firebaseapp.com",
  projectId: "notnotion-131c3",
  storageBucket: "notnotion-131c3.firebasestorage.app",
  messagingSenderId: "953994329145",
  appId: "1:953994329145:web:74af641e3cb95ff3b8e1e8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "movies");


getDocs(colRef)
      .then(data => {
         let movies = [];
          data.docs.forEach(document => {
          movies.push({...document.data(), id:document.id});
         })
         console.log(movies);
    })
    .catch(error => {
      console.log(error);
    });
