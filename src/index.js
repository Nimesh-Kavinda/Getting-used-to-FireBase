import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp} from "firebase/firestore";

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
const qRef = query(colRef, where("category", "==", "drama"), orderBy("createdAt"));


getDocs(qRef)
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

// onSnapshot(colRef, (data) => {
//     let movies = [];
//     data.docs.forEach(document => {
//       movies.push({...document.data(),id : document.id});
//     });
//     console.log(movies);
// });

    const addForm = document.querySelector(".add");
    addForm.addEventListener("submit", event => {
      event.preventDefault();
      addDoc(colRef, {
        name: addForm.name.value,
        category: addForm.category.value,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      .then(() => {
        addForm.reset();
      });
    });

    const deletForm = document.querySelector(".delete");
    deletForm.addEventListener("submit", event => {
      event.preventDefault();
      
      const documentRef = doc(db, "movies", deletForm.id.value);
      deleteDoc(documentRef)
        .then(() => {
          deletForm.reset();
        });
    });