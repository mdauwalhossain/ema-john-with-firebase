import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../firebase.init";

initializeAuthentication();

const useFirebase = () =>{
    const [user, setUser] = useState({});

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup(auth, googleProvider)
           .then (result => {
            console.log(result.user)
        })
    }
    
    const logOut = () => {
        signOut(auth).then(() => {
            setUser({})
          }).catch((error) => {
            // An error happened.
          });
    }
    // obserserved whether user auth state change or not
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
             setUser(user);            
             
            } 
          });
    } ,[])

    return{
        user,
        signInUsingGoogle,
        logOut
    }
}

export default useFirebase;