
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBdArMOQX7_8Q5FqmnrzyNk1mOXbcBVXEc",
  authDomain: "netflix-clone-63099.firebaseapp.com",
  projectId: "netflix-clone-63099",
  storageBucket: "netflix-clone-63099.appspot.com",
  messagingSenderId: "378498751217",
  appId: "1:378498751217:web:788ed45402028953fae750",
  measurementId: "G-GC4FZ4SD6Z"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup =async(name,email,password)=>{
  try{
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user =res.user;
    await addDoc(collection(db,"user"),{
        uid:user.uid,
        name,
        authProvider:"local",
        email
    })
  }catch(error){
     console.log(error)
     toast.error(error.code.split('/')[1].split('-').join(""))
  }
}
const login= async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
        
    }catch(error){
        toast.error(error.code.split('/')[1].split('-').join(""));
    }
}
const logout=()=>{
    signOut(auth);
}
export {auth,db,login,signup,logout};