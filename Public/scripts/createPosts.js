"use strict";

const mainBody = document.getElementById("js-main-body");

const detailedPost = (post) => {
  const clickedPost = post;
  console.log("this is the post: " + post.comments);
  if (userType != "anonymous") {
    displayUser(post.content.user_id);
  } else {
    displayUser(post.content.user_id, true);
  }

  mainBody.innerHTML = "";

  const newCard = document.createElement("div");
  newCard.classList.add("card-detail");

  const newImg = document.createElement("img");
  newImg.src = url + "/thumbnails/" + post.content.imgfilename;

  const newCaption = document.createElement("p");
  newCaption.classList.add("caption-text");
  newCaption.innerText = post.content.caption;

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("card-details-container");

  const newUpVote = document.createElement("p");
  newUpVote.classList.add("upvotes");
  newUpVote.innerHTML = `Likes: ${post.upvotes.length} <span id="js-like-btn"><i class="far fa-thumbs-up fa-2x"></i></span>`;

  const newTags = document.createElement("p");
  if (post.tags.length !== 0) {
    newTags.classList.add("tags");
    newTags.innerText += "Tags:";
    for (let i = 0; i < post.tags.length; i++) {
      newTags.innerText += ` #${post.tags[i].tag}`;
    }
    detailsContainer.append(newTags, newUpVote);
    newCard.append(newImg, detailsContainer, newCaption);
  } else {
    newTags.classList.add("tags");
    newTags.innerText += "Tags:";
    detailsContainer.append(newTags, newUpVote);
  }

  const userComments = document.createElement("div");
  const commentTitle = document.createElement("p");
  commentTitle.innerText = "Comments:";
  userComments.append(commentTitle);

  userComments.classList.add("comments-container");
  console.log(post.comments.length);
  if (post.comments.length != 0) {
    for (let i = 0; i < post.comments.length; i++) {
      const comment = document.createElement("p");
      console.log(post.comments[i].user_id);

      comment.innerText = `${post.comments[i].username} says:
            ${post.comments[i].content}`;

      userComments.append(comment);
    }
  }

  const newPostComment = document.createElement("form");
  newPostComment.classList.add("post-comment-container");

  const newLabel = document.createElement("label");
  newLabel.innerText = "New Comment:";

  const newInput = document.createElement("textarea");
  newInput.setAttribute("class", "input-textbar");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("rows", "4");
  newInput.setAttribute("cols", "100");
  newInput.setAttribute("maxLength", "text");
  newInput.setAttribute("name", "content");
  newInput.setAttribute("placeholder", "Your comment");
  newInput.setAttribute("type", "text");
  newInput.required = true;

  const postCommentbtn = document.createElement("button");
  postCommentbtn.classList.add("post-comment-btn", "button");
  postCommentbtn.setAttribute("type", "submit");
  postCommentbtn.setAttribute("id", "js-add-comment-btn");
  postCommentbtn.innerText = "Add Comment";

  newPostComment.append(newLabel, newInput, postCommentbtn);

  if (userType != "anonymous") {
    newCard.append(newImg, detailsContainer, newCaption, userComments, newPostComment);

    postCommentbtn.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log(newInput.value);
      try {
        const fetchOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: post.content.post_id,
            content: newInput.value,
          }),
        };

        const response = await fetch(url + "/comment/", fetchOptions);
        const json = await response.json();
        console.log(json);
        if (json) {
          newInput.value = "";
          console.log(json.post_id);
          const refreshed = await getPostById(json.post_id);
          detailedPost(refreshed);
        }
      } catch (e) {
        console.log("comment post error: " + e);
      }
    });
  } else {
    newCard.append(newImg, detailsContainer, newCaption, userComments);
  }

  if (userType != "anonymous") {
    postCommentbtn.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log(newInput.value);
      try {
        const fetchOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: post.content.post_id,
            content: newInput.value,
          }),
        };

        const response = await fetch(url + "/comment/", fetchOptions);
        const json = await response.json();
        console.log(json);
        if (json) {
          newInput.value = "";
          console.log("This is the post id: " + json.post_id);
        }
      } catch (e) {
        console.log("comment post error: " + e);
      }
    });
  }

  newImg.addEventListener("click", (Event) => {
    Event.preventDefault();
    getDiscoverPosts();
    displayUser(user);
  });

  mainBody.append(newCard);
};

const createDiscoverCards = (posts) => {
  mainBody.innerHTML = "";
  console.log(posts);
  posts.forEach((post) => {
    //create new card
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    const newImg = document.createElement("img");
    newImg.src = url + "/thumbnails/" + post.content.imgfilename;

    const newCaption = document.createElement("p");
    newCaption.classList.add("caption-text");
    newCaption.innerText = post.content.caption;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("card-details-container");

    const newUpVote = document.createElement("p");
    newUpVote.classList.add("upvotes");
    newUpVote.innerText = `Likes: ${post.upvotes.length}`;

    const newTags = document.createElement("p");
    if (post.tags.length !== 0) {
      newTags.classList.add("tags");
      newTags.innerText += "Tags:";
      for (let i = 0; i < post.tags.length; i++) {
        newTags.innerText += ` #${post.tags[i].tag}`;
      }
      detailsContainer.append(newTags, newUpVote);
      newCard.append(newImg, detailsContainer, newCaption);
    } else {
      newTags.classList.add("tags");
      newTags.innerText += "Tags:";
      detailsContainer.append(newTags, newUpVote);
    }
    newCard.append(newImg, detailsContainer, newCaption);

    newCard.addEventListener("click", (Event) => {
      Event.preventDefault();
      console.log(post.content.post_id);
      sessionStorage.setItem("postId", JSON.stringify(post.content.post_id));

      detailedPost(post);
    });

    mainBody.append(newCard);
  });
};

const getDiscoverPosts = async () => {
  try {
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 20,
      }),
    };

    const response = await fetch(url + "/posts/discover", options);
    const discoverPosts = await response.json();

    createDiscoverCards(discoverPosts);
  } catch (e) {
    console.log(e.message);
  }
};

const getPostById = async (postId) => {
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/post/` + postId, options);
    const json = await response.json();

    return json;
  } catch (e) {
    console.log(e.message);
  }
};

getDiscoverPosts();
