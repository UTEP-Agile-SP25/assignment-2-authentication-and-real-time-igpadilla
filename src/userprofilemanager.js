import { signUp, logout, login, onAuthStateChanged } from "./auth";
import { auth } from "./config";
import { db } from "./config";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const saveProfile = async function () {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();

  const user = auth.currentUser;

  if (!user) {
    console.error("No user is logged in.");
    return;
  }

  try {
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        firstname: firstName,
        lastname: lastName,
      },
      { merge: true }
    );

    console.log("Profile successfully updated");
    window.location.href = "musicmanager.html";
  } catch (error) {
    console.error("Error updating profile", error);
  }
};

const updateProfileForm = document.querySelector("#updateprofile");
updateProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveProfile();
});
