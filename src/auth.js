import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";
import { db } from "./config";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log("Logged In User: ", user.email);
    await fetchUserData(user.uid);
  } else {
    console.log("No User is signed in");
  }
});

async function fetchUserData(userID) {
  try {
    const userDoc = await getDocs(collection(db, "users"));
    const userData = userDoc.docs.find((doc) => doc.id === userID)?.data();
    console.log("User data: ", userData);
    document.getElementById("greeting").innerHTML =
      "<h1> Hi, " + userData.firstname + "</h1>";
  } catch (error) {
    console.error("Error getting user data: ", error.message);
  }
}

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up: ", userCredential.user.email);
    console.log("User ID: ", userCredential.user.uid);
    const userRef = doc(db, "users", userCredential.user.uid);

    await setDoc(userRef, {
      timestamp: new Date(),
    });
    window.location.href = "userprofilemanager.html";
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    window.location.href = "musicmanager.html";
  } catch (error) {
    console.error("Login error: ", +error.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    console.log("User Logged Out");
    window.location.href = "index.html";
  } catch (error) {
    console.error("Logout error", error.message);
  }
}
