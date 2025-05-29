// src/firebase/firebase-auth.js
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import app from "./firebase-config";

const auth = getAuth(app);
const provider = new GithubAuthProvider();

export const signInWithGitHub = () => {
  return signInWithPopup(auth, provider);
};

export const signOutUser = () => {
  return auth.signOut();
};

// Esta función NO EXISTE en Firebase Auth SDK, por eso da error
// export const getCurrentUser = () => {
//   return auth.currentUser;
// };

export default auth;
