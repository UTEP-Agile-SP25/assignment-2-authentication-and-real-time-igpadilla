import { logout, signUp, login } from "./auth";

const signUpForm = document.querySelector("#signupForm");
signUpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  signUp(email, password);
});

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  login(email, password);
});

const logOutForm = document.querySelector("#logoutForm");
logOutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  logout();
});
