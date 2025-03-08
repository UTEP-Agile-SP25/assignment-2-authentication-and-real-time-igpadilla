import { signUp, logout, login, onAuthStateChanged } from "./auth";
import { db } from "./config";
import {
  doc,
  setDoc,
  collection,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const saveSong = async function () {
  const songName = document.getElementById("songname").value.trim();
  const songArtist = document.getElementById("songartist").value.trim();
  const songRating = document.getElementById("songrating").value.trim();

  try {
    const songRef = doc(
      db,
      "songs",
      songName.toLowerCase() + "-" + songArtist.toLowerCase()
    );
    await setDoc(songRef, {
      name: songName,
      artist: songArtist,
      rating: songRating,
      time: Date(),
    });
    console.log("song Succesfully created");
    document.getElementById("songname").value = "";
    document.getElementById("songartist").value = "";
    document.getElementById("songrating").value = "";
  } catch (error) {
    console.error("Error saving song", error);
  }
};

const deleteSong = async function (collection, docID) {
  try {
    await deleteDoc(doc(db, collection, docID));
    console.log(`Document with ID ${docID} deleted succesfully`);
  } catch (error) {
    console.error("Error deleting song", error);
  }
};

const songCollection = collection(db, "songs");
onSnapshot(songCollection, (snapshot) => {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    const row = document.createElement("tr");
    row.innerHTML = `
        <td> ${doc.id}</td>
        <td> ${data.name}</td>
        <td> ${data.artist}</td>
        <td> ${data.rating}</td>
        `;
    tableBody.appendChild(row);
  });
});

const addSongForm = document.querySelector("#addsong");
addSongForm.addEventListener("submit", (event) => {
  event.preventDefault();
  saveSong();
});

const deleteSongForm = document.querySelector("#deletesong");
deleteSongForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const song = document.getElementById("songID").value;
  deleteSong("songs", song);
});

const logOutForm = document.querySelector("#logoutForm");
logOutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  logout();
});
