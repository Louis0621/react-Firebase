import { useState } from 'react';

import { auth, googleProvider } from './FirebaseLearning';
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
export const Auth = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(true);
    // console.log(auth?.currentUser?.photoURL);
    //If it is define, we print it out.
    const confirm = ()=>{
        if(auth.currentUser){
            setShow(true);
        }
        else{
            setShow(false);
        }
    }
    const signIn = async()=>{
        try{
            await createUserWithEmailAndPassword(auth, email, password)
            confirm();
        }catch(err){
            console.error(err);
        }
    }
    const signInWithGoogle = async()=>{
        try{
            await signInWithPopup(auth, googleProvider);
            //We can use the pop-up to sign in with Google
            confirm();
        }catch(err){
            
            console.error(err);
        }
    }
    const logOut = async()=>{
        try{
            await signOut(auth, googleProvider);
            //We can use the pop-up to sign in with Google
            confirm();
        }catch(err){
            console.error(err);
        }
    }
    return <div>
        <input placeholder="Email..." onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password..." onChange={(e)=>setPassword(e.target.value)}/>
        
        {
            show === true ? <button onClick={logOut}>logOut</button>: 
                <span>
                    <button onClick={signIn}>Sign In</button>
                    <button onClick={signInWithGoogle}>Sign In With Google</button>
                </span>
            
        }
    </div>
}