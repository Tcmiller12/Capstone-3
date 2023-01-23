// Get the input elements for the post subject and content
const postContent = document.querySelector('#postContent');

// Get the submit button for creating a new post
const submitPostBtn = document.querySelector('#submitPostBtn');

// Add an event listener to the submit button
submitPostBtn.addEventListener('click', function () {
    // Get the text from the input elements
    const textContent = postContent.value;
    if (!textContent) {
        alert("Content is required");
        return;
    }

    // Create the JSON object to send in the request
    const postData = {
        text: textContent,
    };

    // Create the headers for the request
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY3NDQyNjI5MywiZXhwIjoxNjc0NTEyNjkzfQ.Etz7ZQv2eSYXDcHgwmmg6bGiXaRTh7JqQUhn40BOEcs");
    myHeaders.append("Content-Type", "application/json");

    // Create the request options
    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(postData),
        redirect: 'follow'
    };

    // Make the request to the endpoint
    fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            // Clear the input elements
            postContent.value = '';
        })
        .catch(error => console.log('error', error));
});

// Get the write post button
const writePostBtn = document.querySelector('#writePostBtn');

// Get the write post container
const writePostContainer = document.querySelector('.write-post-container');

// Add an event listener to the write post button
writePostBtn.addEventListener('click', function () {
    // Toggle the visibility of the write post container
    writePostContainer.style.display = writePostContainer.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener("DOMContentLoaded", function () {
    if (isLoggedIn() === false) window.location.href = "signin.html";
});



// Get the element where the post will be displayed
const postContainer = document.querySelector('#blog-container');



// Function to get and display the post
function displayPost() {

    // Create the headers for the request
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY3NDQyNjI5MywiZXhwIjoxNjc0NTEyNjkzfQ.Etz7ZQv2eSYXDcHgwmmg6bGiXaRTh7JqQUhn40BOEcs");

    // Create the request options
    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // Make the request to the endpoint
    fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
        .then(response => response.json())
        .then(data => {
            const postHTML = `
        <div class="post">
          <h2>${data.text}</h2>
          <p>By: ${data.username}</p>
          <p>Time: ${data.createdAt}</p>
        </div>
      `;
            postContainer.innerHTML += postHTML;
        })
        .catch(error => console.log('error', error));
}

// Call the displayPost function when the page loads
document.addEventListener("DOMContentLoaded", displayPost);


// Get the element where the post will be displayed
const blogContainer = document.querySelector('#blog-container');

function getPosts() {
    // Use the fetch API to send a GET request to the server to retrieve all posts
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY3NDQzNjc4MywiZXhwIjoxNjc0NTIzMTgzfQ.BhF5gDxl5PbYJHAOhhx6PrR7Ga1PnM7Tn9vgeU0W458");
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    // Replace this with the correct url of your API endpoint
    fetch("https://microbloglite.herokuapp.com/api/posts?limit=5&offset=0", requestOptions)
        .then(response => response.json())
        .then(data => {
            // Use a for loop to iterate through the jsonData array
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                // Use the object properties to create an HTML blog article
                let article = `
                <div class="blog-post">
                    <h3>${item.username}</h3>
                    <p>${item.text}</p>
                    <div class="post-actions">
                        <button class="like-button">Like</button>
                        <button class="comment-button">Comment</button>
                    </div>
                </div>`;
                // Append the created article to the blog-container
                blogContainer.insertAdjacentHTML('beforeend', article);
            }
        })
        .catch(error => console.log('error', error));
}

document.addEventListener("DOMContentLoaded", function () {
    if (isLoggedIn() === false) window.location.href = "signin.html";
    // call the getPosts function
    getPosts();
});

