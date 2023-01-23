document.addEventListener("DOMContentLoaded", function () {
    const writePostBtn = document.getElementById("writePostBtn");
    const submitPostBtn = document.getElementById("submitPostBtn");
    const postSubject = document.getElementById("postSubject");
    const postContent = document.getElementById("postContent");
    const writePostContainer = document.getElementById("write-post-container");
    const blogContainer = document.getElementById("blog-container");
    // Add event listener to write post button
    writePostBtn.addEventListener("click", function () {
        // Check if the writePostContainer exists
        if (writePostContainer) {
            // Show the write post container
            writePostContainer.style.display = "block";
        }
        getPosts()
    });
    //Add event listener to submit post button
    submitPostBtn.addEventListener("click", function () {
        //Get the subject and post data
        const subject = postSubject.value;
        const post = postContent.value;
        // Use the fetch API to send a POST request to the server with the subject and post data
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTY3NDQzNjc4MywiZXhwIjoxNjc0NTIzMTgzfQ.BhF5gDxl5PbYJHAOhhx6PrR7Ga1PnM7Tn9vgeU0W458");
        myHeaders.append("Content-Type", "application/json");
        const postData = {
            subject: subject,
            post: post,
            text: subject + '-' + post
        }
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(postData),
            redirect: "follow",
        };
        // Replace this with the correct url of your API endpoint
        fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        // Clear the postSubject and postContent fields
        postSubject.value = "";
        postContent.value = "";
        // Check if the writePostContainer exists
        if (writePostContainer) {
            // Hide the write post container
            writePostContainer.style.display = "none";
        }
        displayPost()
    });
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
    
    // Call the getPosts function to retrieve and display all posts on page load
    
})