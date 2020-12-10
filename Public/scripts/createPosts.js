"use strict";
const mainBody = document.getElementById("js-main-body");
const blockedListContainer = document.getElementById("js-blocked-list-cards");
const blockListSection = document.getElementById("js-blocked-list-section");
const followingTitle = document.getElementById("js-following-title");
const state = document.getElementById("js-current-state");

/**
 *
 * @param {*} userType the type of user currently logged in.
 * @param {*} post the specific post to attach the action bar too.
 * Decides which button to be displayed depending on userType.
 */
const createActionBar = (userType, post) => {
  const actionButtons = document.createElement("div");
  actionButtons.classList.add("action-button-container");

  const backSpan = document.createElement("span");
  backSpan.classList.add("icon");
  backSpan.setAttribute("id", "js-back-btn");
  backSpan.innerHTML = `<i class="fas fa-arrow-left fa-2x"></i><p>Back</p>`;

  const postCreator = document.createElement("h1");
  postCreator.innerText = post.content.username;

  const deleteSpan = document.createElement("span");
  deleteSpan.classList.add("icon");
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
    if (window.location.pathname.includes("/home.html")) {
      getHomePosts();
    } else if (window.location.pathname.includes("/followers.html")) {
      getFollowerPosts();
      getBlockedList();
    } else if (window.location.pathname.includes("/search.html")) {
      location.reload();
    } else {
      getDiscoverPosts();
    }
  });

  return actionButtons;
};

/**
 *
 * @param {*} post idividual post containing information relevent for a detailed displayed
 * Builds a detailed card of the post clicked. Users can comment and upvote. When an action
 * is performed the card is refreshed.
 */
const detailedPost = (post) => {
  mainBody.innerHTML = "";

  if (userType != "anonymous") {
    getUserByID(post.content.user_id);
  }

  if (window.location.pathname.includes("/followers.html")) {
    blockListSection.classList.add("hide");
    followingTitle.classList.add("hide");
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

  const newViews = document.createElement("p");
  newViews.classList.add("upvotes");
  newViews.innerText = `Views: ${post.content.views}`;

  const newUpVote = document.createElement("p");
  newUpVote.classList.add("upvotes");

  isLiked(post.content.post_id, newUpVote, post);

  // Adds an upvote to post
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

  if (post.tags.length !== 0) {
    newTags.classList.add("tags");
    newTags.innerText += "Tags:";
    for (let i = 0; i < post.tags.length; i++) {
      newTags.innerText += ` #${post.tags[i].tag}`;
    }
    detailsContainer.append(newTags, newUpVote, newViews);
    newCard.append(newImg, detailsContainer, newCaption);
  } else {
    newTags.classList.add("tags");
    newTags.innerText += "Tags:";
    detailsContainer.append(newTags, newUpVote, newViews);
  }

  /**
   *
   */
  const userComments = document.createElement("div");
  const commentTitle = document.createElement("p");
  commentTitle.innerText = "Comments:";
  userComments.append(commentTitle);

  userComments.classList.add("comments-container");
  if (post.comments.length != 0) {
    for (let i = 0; i < post.comments.length; i++) {
      const comment = document.createElement("p");
      comment.innerHTML = `<b>${post.comments[i].username} says:</b><br>
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

  // checks for anonymous user and only adds components relevent.
  if (userType != "anonymous") {
    newCard.append(
      actionButtons,
      newImg,
      detailsContainer,
      newCaption,
      userComments,
      newPostComment
    );

    // Submits a comment to the post
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

  /**
   *  Allows the user to block other post creators. Has confirmation before execution and alerts
   *  for responses
   */
  blockBtn.addEventListener("click", async (Event) => {
    Event.stopImmediatePropagation();
    Event.preventDefault();
    console.log("block button pressed" + post.content.user_id);
    const data = post.content.user_id;
    const check = confirm(`"Do you want to block ${post.content.username}?`);
    if (check) {
      console.log("block successful " + check);
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
          alert(`${post.content.username} has been blocked`);
          location.reload();
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert(`${post.content.username} was not blocked`);
    }
  });

  /**
   *  Moderator accounts can permanently ban any user that they think is being inappropriate.
   *  A confirmation and warning with reason response required before banning takes effect.
   */
  banBtn.addEventListener("click", async (Event) => {
    Event.stopImmediatePropagation();
    Event.preventDefault();
    console.log("ban button pressed" + post.content.user_id);
    const check = prompt("Reason for banning?");
    const confirmation = confirm(`Do you want to ban ${post.content.username}?`);
    const data = post.content.user_id;
    console.log(check);
    if (check != "" && confirmation) {
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
          alert(`${post.content.username} has been banned`);
          location.reload();
        }
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert(`${post.content.username} was not banned`);
    }
  });
};

/**
 *
 * @param {*} posts List of posts to be created
 * Builds the individual thumbnail cards for all posts in the list. If a card is clicked a detailed
 * post is called
 */
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

    newCard.addEventListener("click", async (Event) => {
      Event.preventDefault();
      const p = await getPostById(post.content.post_id);
      detailedPost(p);
    });

    mainBody.append(newCard);
  });
};

/**
 * Calls on the server to return a list of the latest x number of public posts. X being assigned to
 * the amount variable in the body.
 */
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

/**
 *  Fetches a list of posts of the currently logged in user and calls create discover cards
 *  to generate thumbnails.
 */
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

/**
 *  Fetches a list of posts by the accounts the current user is following
 *  and calls create discover cards to generate thumbnails.
 */
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

/**
 *
 * @param {*} postId Id of individual post
 *  Returns a single post depending on the postId passed.
 */
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

/**
 *
 * @param {*} postId Id of individual post
 *  Deletes a single post depending on the postId passed.
 */
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

/**
 * Creates a form for the user to fill and submit a post.
 */
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
  postTags.setAttribute("placeholder", "Your tags go here");
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
    state.classList.remove("hide");
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
        state.classList.add("hide");
        location.reload();
      } else {
        state.innerHTML = `<h1> Error with upload...</h1>`;
      }
    } catch (e) {
      console.log("error: " + e);
    }
  });
};

/**
 *
 * @param {*} postId post ID of current focused post to create the fetch
 * @param {*} newUpVote passes a newVote element to attach to
 * @param {*} post details of the post in focus
 *
 *  Checks to see if current user has liked the post previously, then if true changes the icon displayed.
 */
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

/**
 *
 * @param {*} userId User ID of the reciptiant follow request
 * @param {*} followBtn button element to attach a response too
 *  Checks if current user is already following a user and the set the button text to either follow
 *  or un-follow.
 */
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

    if (followResponse == true) {
      followBtn.innerText = "Un-Follow";
    }
  } catch (e) {
    console.log(e.message);
  }
};

/**
 *  Check on page load which function to call depending on location html name
 */
if (window.location.pathname.includes("/home.html")) {
  getHomePosts();
} else if (window.location.pathname.includes("/discover.html")) {
  getDiscoverPosts();
}
