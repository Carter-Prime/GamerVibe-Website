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
      if (check) {
        deletePostById(post.content.post_id);
      }
    });
  } else {
    actionButtons.append(backSpan);
  }

  backSpan.addEventListener("click", (Event) => {
    Event.preventDefault();
    if (window.location.pathname === "/home.html") {
      getHomePosts();
    } else if (window.location.pathname === "/followers.html") {
      getFollowerPosts();
    } else if (window.location.pathname === "/search.html") {
      location.reload();
    } else {
      getDiscoverPosts();
    }
  });

  return actionButtons;
};

const detailedPost = (post) => {
  mainBody.innerHTML = "";

  if (userType != "anonymous") {
    console.log("detailed post called: " + post.content.user_id);
    getUserByID(post.content.user_id);
  }

  const newCard = document.createElement("div");
  newCard.classList.add("card-detail");

  const actionButtons = createActionBar(userType, post);

  const newImg = document.createElement("img");
  newImg.src = url + "/uploads/" + post.content.imgfilename;

  const newCaption = document.createElement("p");
  newCaption.classList.add("caption-text");
  newCaption.innerText = post.content.caption;

  const detailsContainer = document.createElement("div");
  detailsContainer.classList.add("card-details-container");

  const newUpVote = document.createElement("p");
  newUpVote.classList.add("upvotes");

  //checks the post to see if user has already liked the post and changes the icon appropriately
  isLiked(post.content.post_id, newUpVote, post);

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
      if (json.message != "Upvoted successfully") {
        console.log("upvote unsuccessful");
      }
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

  blockBtn.addEventListener("click", async (Event) => {
    Event.stopImmediatePropagation();
    Event.preventDefault();
    console.log("block button pressed" + post.content.user_id);
    const data = post.content.user_id;
    try {
      const options = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blockedId: data,
        }),
      };

      const response = await fetch(url + "/block/", options);
      const blockedUserResponse = await response.json();
      console.log("blocked user response " + JSON.stringify(blockedUserResponse, null, 1));
      if (blockedUserResponse != null) {
      }
    } catch (e) {
      console.log(e.message);
    }
  });

  banBtn.addEventListener("click", async (Event) => {
    Event.stopImmediatePropagation();
    Event.preventDefault();
    console.log("ban button pressed" + post.content.user_id);
    const check = prompt("Reason for banning?");
    const data = post.content.user_id;
    console.log(check);
    try {
      const options = {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bannedId: data,
          reason: check,
        }),
      };

      const response = await fetch(url + "/ban/", options);
      const bannedUserResponse = await response.json();
      console.log("banned user response " + JSON.stringify(bannedUserResponse, null, 1));
      if (bannedUserResponse != null) {
      }
    } catch (e) {
      console.log(e.message);
    }
  });
};

const createDiscoverCards = (posts) => {
  mainBody.innerHTML = "";
  posts.forEach((post) => {
    //create new card
    const newCard = document.createElement("div");
    newCard.classList.add("card");

    if (user == post.content.user_id) {
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

//Finds post by search for post ID
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

//Deletes post by search for post ID
const deletePostById = async (postId) => {
  try {
    const options = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    const response = await fetch(url + `/post/id/` + postId, options);
    const json = await response.json();
    if (json != null) {
      alert(`${postId} was deleted`);
      location.reload();
    }
  } catch (e) {
    console.log(e.message);
  }
};

//Create a user post and upload to server
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
    location.reload();
    if (user == userInfo.user_id) {
      postBtn.classList.remove("hide");
      followBtn.classList.add("hide");
      blockBtn.classList.add("hide");
    } else {
      postBtn.classList.add("hide");
      followBtn.classList.remove("hide");
      blockBtn.classList.remove("hide");
    }
  });

  postForm.append(infoDiv, capDiv, tagsDiv, postImg, uploadBtn);
  mainBody.append(postForm);

  uploadBtn.addEventListener("click", async (Event) => {
    Event.preventDefault();
    const tags = postTags.value;
    const tagsArray = tags.trim().split(" ");
    const caption = postCaption.value;

    const data = new FormData();

    for (let i = 0; i < tagsArray.length; i++) {
      data.append(`tags[]`, tagsArray[i]);
    }
    data.append("gameImage", postImg.files[0]);
    data.append("caption", caption);

    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: data,
      };

      const response = await fetch(url + "/post/", fetchOptions);
      const post = await response.json();
      if (post.caption != null) {
        location.reload();
      }
    } catch (e) {
      console.log("error: " + e);
    }
  });
};

// get posts from the currently logged in user
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

    const response = await fetch(url + "/posts/feed", options);
    const discoverPosts = await response.json();
    createDiscoverCards(discoverPosts);
    if (userType != "anonymous") {
      getUserByID(user);
    }
  } catch (e) {
    console.log(e.message);
  }
};

// get posts of all the currently logged in users followers
const getFollowerPosts = async () => {
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

    const response = await fetch(url + "/posts/following", options);
    const followingPosts = await response.json();
    createDiscoverCards(followingPosts);
    if (userType != "anonymous") {
      getUserByID(user);
    }
  } catch (e) {
    console.log(e.message);
  }
};

const isLiked = async (postId, newUpVote, post) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url + "/post/upvote/" + postId, options);
    const likedResponse = await response.json();
    if (likedResponse) {
      newUpVote.innerHTML = `Likes: ${post.upvotes.length} <span id="js-like-btn"><i class="fas fa-thumbs-up fa-2x"></i></span>`;
    } else {
      newUpVote.innerHTML = `Likes: ${post.upvotes.length} <span id="js-like-btn"><i class="far fa-thumbs-up fa-2x"></i></span>`;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const isFollower = async (userId, followBtn) => {
  try {
    const options = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url + "/follow/" + userId, options);
    const followResponse = await response.json();
    console.log(followResponse);
    if (followResponse == true) {
      followBtn.classList.add("hide");
    }
  } catch (e) {
    console.log(e.message);
  }
};
