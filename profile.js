//JavaScript function to handle form submission
function submitPost() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;
    // Add code here to send the title and content to the server for storage and displaying on the page
}
function submitPost() {
    var title = document.getElementById("title").value;
    var content = document.getElementById("content").value;

    // Send the title and content to the server for storage
    fetch("/api/create-post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            content: content
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.success) {
            // The post was successfully created, display it on the page
            var postContainer = document.createElement("div");
            postContainer.classList.add("post");

            var postTitle = document.createElement("h3");
            postTitle.innerText = title;
            postContainer.appendChild(postTitle);

            var postContent = document.createElement("p");
            postContent.innerText = content;
            postContainer.appendChild(postContent);

            var posts = document.getElementById("posts");
            posts.appendChild(postContainer);
        } else {
            // There was an error, display an error message
            alert("Error: " + data.error);
        }
    });
}