function registerUser(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value;
  const fullnameInput = document.getElementById('fullname').value;
  const passwordInput = document.getElementById('password').value; 
  const confirmPasswordInput = document.getElementById('cpassword').value; 

  if (passwordInput !== confirmPasswordInput) {
      return alert("Passwords do not match");
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "username": usernameInput,
    "fullName": fullnameInput,
    "password": passwordInput,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  fetch("https://microbloglite.herokuapp.com/api/users", requestOptions)
    .then(response => {
      if (response.ok) {
        console.log("User registered successfully!");
        alert("User registration created successfully!");
        window.location.href = 'signin.html';
      } else {
        throw new Error("Registration failed!");
      }
    })
    .catch(error => console.log('error', error));
    window.localStorage.setItem(username, raw);
    window.localStorage.getItem(username);
}
