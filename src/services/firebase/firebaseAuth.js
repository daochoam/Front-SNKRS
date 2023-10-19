import { URL_SNKRS } from '../../const';
import { URL_SNKRS_FRONT } from '../../const/const';
import { firebase } from './firebaseConfig';
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail as sendPasswordReset,
    updatePassword as updateCurrentUserPassword,
} from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const auth = getAuth(firebase);


const createUser = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { status: 200, user: userCredential.user };

    } catch (error) {

        return { status: 400, user: {} };
    }
}


const signIn = async (email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        return { user: null }
    }
};
const logOut = async () => {
    return await signOut(auth);
}

const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider)
}

const signInWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider)
}
const signInWithTwitter = () => {
    return signInWithPopup(auth, twitterProvider)
}

const resetPassword = async (email) => {
    await sendPasswordReset(auth, email, {
        url: `${URL_SNKRS_FRONT}/`,
        handleCodeInApp: true
    })
};

const updateUserPassword = async (newPassword) => {
    await updateCurrentUserPassword(auth.currentUser, newPassword);
};

export {
    createUser,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    logOut,
    resetPassword,
    updateUserPassword
}