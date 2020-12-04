"use strict";

const mainBody = document.getElementById("js-main-body");

const createActionBar = (userType, post) => {
  const actionButtons = document.createElement("div");
  actionButtons.classList.add("action-button-container");

  const backSpan = document.createElement("span");
  backSpan.setAttribute("id", "js-back-btn");
  backSpan.innerHTML = `<i class="fas fa-arrow-left fa-2x"></i><p>Back</p>`;

  const postCreator = document.createElement("h1");
  postCreator.innerText = post.content.username;

  const deleteSpan = document.createElement("span");
  deleteSpan.setAttribute("id", "js-delete-btn");
  deleteSpan.innerHTML = `<i class="fas fa-times fa-2x"></i><p>Delete</p>`;

  if (userType == "anonymous") {
    actionButtons.append(backSpan, postCreator);
  } else if (user == post.content.user_id || userType == "moderator") {
    actionButtons.append(backSpan, deleteSpan);

    deleteSpan.addEventListener("click", (Event) => {
      Event.preventDefault();
      const check = confirm("are you sure you want to delete this post?");
      console.log("post will be deleted " + check);
    });
  } else {
    actionButtons.append(backSpan);
  }

  backSpan.addEventListener("click", (Event) => {
    Event.preventDefault();
    if (window.location.pathname === "/home.html") {
      getHomePosts();
    } else {
      getDiscoverPosts();
    }
  });

  return actionButtons;
};

const detailedPost = (post) => {
  mainBody.innerHTML = "";
  console.log(post);
  if (userType != "anonymous") {
    getUserByID(post.content.user_id, true);
  }

  const newCard = document.createElement("div");
  newCard.classList.add("card-detail");

  const actionButtons = createActionBar(userType, post);

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

  newUpVote.addEventListener("click", async (Event) => {
    Event.preventDefault();
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post.content.post_id,
        }),
      };

      const response = await fetch(url + "/post/upvote/", fetchOptions);
      const json = await response.json();
      console.log(json);
      const refreshed = await getPostById(post.content.post_id);
      detailedPost(refreshed);
    } catch (e) {
      console.log("comment post error: " + e);
    }
  });

  const newTags = document.createElement("p");
  //checks for tags then builds element if present
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

  // builds the comments section of a post detail card
  const userComments = document.createElement("div");
  const commentTitle = document.createElement("p");
  commentTitle.innerText = "Comments:";
  userComments.append(commentTitle);

  userComments.classList.add("comments-container");
  console.log(post.comments.length);
  if (post.comments.length != 0) {
    for (let i = 0; i < post.comments.length; i++) {
      const comment = document.createElement("p");
      comment.innerText = `${post.comments[i].username} says:
            ${post.comments[i].content}`;

      userComments.append(comment);
    }
  }

  const newPostComment = document.createElement("form");
  newPostComment.classList.add("post-comment-container");

  const postLabel = document.createElement("label");
  postLabel.innerText = "New Comment:";

  const commentInput = document.createElement("textarea");
  commentInput.setAttribute("class", "input-textbar");
  commentInput.setAttribute("type", "text");
  commentInput.setAttribute("rows", "4");
  commentInput.setAttribute("cols", "100");
  commentInput.setAttribute("maxLength", "255");
  commentInput.setAttribute("name", "content");
  commentInput.setAttribute("placeholder", "Your comment");
  commentInput.required = true;

  const postCommentbtn = document.createElement("button");
  postCommentbtn.classList.add("post-comment-btn", "button");
  postCommentbtn.setAttribute("type", "submit");
  postCommentbtn.setAttribute("id", "js-add-comment-btn");
  postCommentbtn.innerText = "Add Comment";

  newPostComment.append(postLabel, commentInput, postCommentbtn);

  //  check to see if logged in and will show add comments
  if (userType != "anonymous") {
    newCard.append(
      actionButtons,
      newImg,
      detailsContainer,
      newCaption,
      userComments,
      newPostComment
    );

    // Click event that will submit the comment and refresh the detailed view of the post
    postCommentbtn.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const fetchOptions = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postId: post.content.post_id,
            content: commentInput.value,
          }),
        };

        const response = await fetch(url + "/post/comment/", fetchOptions);
        const json = await response.json();
        console.log(json);
        if (json) {
          commentInput.value = "";
          const refreshed = await getPostById(json.post_id);
          detailedPost(refreshed);
        }
      } catch (e) {
        console.log("comment post error: " + e);
      }
    });
  } else {
    newCard.append(actionButtons, newImg, detailsContainer, newCaption, userComments);
  }
  mainBody.append(newCard);
};

const createDiscoverCards = (posts) => {
  mainBody.innerHTML = "";
  console.log(posts);
  posts.forEach((post) => {
    //create new card
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    if (user == post.content.post_id) {
      newCard.classList.add("my-post-card");
    }

    const postCreator = document.createElement("h1");
    postCreator.innerText = post.content.username;

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
      newCard.append(postCreator, newImg, detailsContainer, newCaption);
    } else {
      newTags.classList.add("tags");
      newTags.innerText += "Tags:";
      detailsContainer.append(newTags, newUpVote);
    }
    newCard.append(postCreator, newImg, detailsContainer, newCaption);

    newCard.addEventListener("click", (Event) => {
      Event.preventDefault();
      console.log(post.content.post_id);
      sessionStorage.setItem("postId", JSON.stringify(post.content.post_id));

      detailedPost(post);
    });

    mainBody.append(newCard);
  });
};

// call a array of latest posts
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
    if (userType != "anonymous") {
      getUserByID(user);
    }
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
    const response = await fetch(url + `/post/id/` + postId, options);
    const json = await response.json();

    return json;
  } catch (e) {
    console.log(e.message);
  }
};

const createPost = () => {
  mainBody.innerHTML = "";

  const postForm = document.createElement("form");
  postForm.classList.add("post-form");
  postForm.setAttribute("id", "js-post-form");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("upload-info-div");

  const uploadTitle = document.createElement("h1");
  uploadTitle.innerText = "Create a Post";

  const backSpan = document.createElement("span");
  backSpan.classList.add("upload-back-btn");
  backSpan.setAttribute("id", "js-back-btn");
  backSpan.innerHTML = `<i class="fas fa-arrow-left fa-2x"></i><p>Back</p>`;

  infoDiv.append(backSpan, uploadTitle);

  const capDiv = document.createElement("div");
  capDiv.classList.add("upload-caption-div");

  const captionLabel = document.createElement("label");
  captionLabel.innerText = "Caption";

  const postCaption = document.createElement("textarea");
  postCaption.classList.add("post-input");
  postCaption.setAttribute("type", "text");
  postCaption.setAttribute("rows", "4");
  postCaption.setAttribute("maxLength", "255");
  postCaption.setAttribute("name", "caption");
  postCaption.setAttribute("placeholder", "Your caption");
  postCaption.required = true;

  capDiv.append(captionLabel, postCaption);

  const tagsDiv = document.createElement("div");
  tagsDiv.classList.add("upload-tags-div");

  const tagsLabel = document.createElement("label");
  tagsLabel.innerText = "Tags";

  const postTags = document.createElement("textarea");
  postTags.classList.add("post-input");
  postTags.setAttribute("type", "text");
  postTags.setAttribute("rows", "4");
  postTags.setAttribute("maxLength", "255");
  postTags.setAttribute("name", "tags");
  postTags.setAttribute("id", "js-upload-tags-value");
  postTags.setAttribute("placeholder", "Your tags #tagGoesHere");
  postTags.required = true;

  tagsDiv.append(tagsLabel, postTags);

  const postImg = document.createElement("input");
  postImg.classList.add("post-input");
  postImg.setAttribute("type", "file");
  postImg.setAttribute("name", "gameImage");
  postImg.setAttribute("accept", "image/*");
  postImg.setAttribute("placeholder", "choose file");
  postImg.required = true;

  const uploadBtn = document.createElement("button");
  uploadBtn.classList.add("button", "upload-btn");
  uploadBtn.setAttribute("type", "submit");
  uploadBtn.innerText = "Upload Post";

  backSpan.addEventListener("click", (Event) => {
    Event.preventDefault();
    console.log("upload back button pressed");
    location.reload();
  });

  postForm.append(infoDiv, capDiv, tagsDiv, postImg, uploadBtn);
  mainBody.append(postForm);

  uploadBtn.addEventListener("click", async (Event) => {
    Event.preventDefault();
    console.log("upload clicked");
    const tags = postTags.value;
    const tagsArray = tags.split(" ");
    console.log("tags before split: " + tags);
    console.log("tagsArray: " + tagsArray);
    const caption = postCaption.value;

    const data = new FormData();

    for (let i = 0; i < tagsArray.length; i++) {
      console.log(tagsArray[i]);
      data.append(`tags[]`, tagsArray[i]);
    }
    data.append("gameImage", postImg.files[0]);
    data.append("caption", caption);

    console.log("form data: " + data);
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: data,
      };

      const response = await fetch(url + "/post/", fetchOptions);
      const json = await response.json();
      console.log("json response", json);
      if (json) {
      }
    } catch (e) {
      console.log("error: " + e);
    }
  });
};

const getHomePosts = async () => {
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

    const response = await fetch(url + "/posts/home", options);
    const discoverPosts = await response.json();

    createDiscoverCards(discoverPosts);
    if (userType != "anonymous") {
      getUserByID(user);
    }
  } catch (e) {
    console.log(e.message);
  }
};
