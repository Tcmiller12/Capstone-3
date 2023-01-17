$(document).ready(function(){
    $('.like-button').on('click', function(){
        var $likeCount = $(this).siblings('.like-count');
        var currentCount = parseInt($likeCount.text());
        $likeCount.text(currentCount + 1);
    });
});

// comment section //

document.getElementById("comment-button").addEventListener("click", function(){
    var comment = document.getElementById("comment-text").value;
    var comments = document.getElementById("comments");
    var newComment = document.createElement("p");
    newComment.innerHTML = comment;
    comments.appendChild(newComment);
});
