"use strict";

const mainBody = document.getElementById("js-main-body");

const detailedPost = (post) => {
  console.log("this is the post: " + post.comments);
  displayUser(post.content.user_id);
  mainBody.innerHTML = "";

  const newCard = document.createElement("div");
  newCard.classList.add("card-detail");

  const newImg = document.createElement("img");
  newImg.src = url + "/thumbnails/" + post.content.imgfilename;
  //newImg.src = url + "/thumbnails/cat.jpg";

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
    //console.log(post.tags.tag[0]);
  }

  const newComments = document.createElement("div");
  const commentTitle = document.createElement("p");
  commentTitle.innerText = "Comments:";
  newComments.append(commentTitle);

  newComments.classList.add("comments-container");
  console.log(post.comments.length);
  if (post.comments.length != 0) {
    for (let i = 0; i < post.comments.length; i++) {
      const comment = document.createElement("p");
      console.log(post.comments[i].user_id);

      comment.innerText = `${post.comments[i].user_id} says:
            ${post.comments[i].content}`;

      newComments.append(comment);
    }
  }

  newCard.append(newImg, detailsContainer, newCaption, newComments);
  newImg.addEventListener("click", (Event) => {
    Event.preventDefault();
    getDiscoverPosts();
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
    //newImg.src = url + "/thumbnails/cat.jpg";

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
      //console.log(post.tags.tag[0]);
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

getDiscoverPosts();
