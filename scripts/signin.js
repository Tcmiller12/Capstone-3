/* Landing Page JavaScript */

"use strict";

window.onload = function () {
    const loginForm = document.querySelector("#login");
    const errorMessage = document.querySelector('.error-message');
    const username = document.querySelector("#username");
    const password = document.querySelector("#password");
    const loginButton = document.querySelector("#loginButton");
    const successMessage = "You have successfully logged in!";

    loginForm.onsubmit = function (event) {
        event.preventDefault();
        // clear any previous error messages
        errorMessage.innerHTML = '';

        // validate the inputs
        if (!username.value) {
            errorMessage.innerHTML = 'Please enter a username';
            return;
        }
        if (!password.value) {
            errorMessage.innerHTML = 'Please enter a password';
            return;
        }
        //disable the button to prevent multiple submissions
        loginButton.disabled = true;
        //create loginData object
        const loginData = {
            username: username.value,
            password: password.value
        }

        // Time to actually process the login using the function from auth.js!
        login(loginData)
          .then(response => {
            console.log(response);
            if (response.status === 'success') {
              alert(successMessage);
              // handle successful login
            } else {
              errorMessage.innerHTML = 'Invalid login credentials';
            }
            // re-enable the button
            loginButton.disabled = false;
          })
          .catch(error => {
            console.log(error);
            errorMessage.innerHTML = '';
            // re-enable the button
            loginButton.disabled = false;
          });
    }
}