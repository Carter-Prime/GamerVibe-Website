CREATE TABLE User (
    user_id INT,
    username VARCHAR(30) UNIQUE,
    fname VARCHAR(50),
    lname VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    passwd VARCHAR(255),
    imagename VARCHAR(255),
    theme VARCHAR(50),
    discord VARCHAR(100),
    youtube VARCHAR(100),
    twitch VARCHAR(100),
    created_at TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    private_acc BOOLEAN,
    blacklisted_at TIMESTAMP NULL,
    unblacklisted_at TIMESTAMP NULL,
    blacklisted_by INT,
    blacklisted_reason VARCHAR(255),
    PRIMARY KEY(user_id)
);
CREATE TABLE Post (
    post_id INT,
    user_id INT,
    caption VARCHAR(255),
    created_at TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    imgfilename VARCHAR(255),
    PRIMARY KEY (post_id, user_id)
);
CREATE TABLE PostTag (
    post_id INT,
    tag VARCHAR(100),
    tagged_at TIMESTAMP,
    untagged_at TIMESTAMP NULL,
    PRIMARY KEY (post_id, tag)
);
CREATE TABLE Comments (
    comment_id INT,
    user_id INT,
    post_id INT,
    content VARCHAR(255),
    commented_at TIMESTAMP,
    edited_at TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (user_id, post_id, commented_at, comment_id)
);
CREATE TABLE Upvote (
    user_id INT,
    post_id INT,
    liked_at TIMESTAMP,
    unliked_at TIMESTAMP NULL,
    PRIMARY KEY (user_id, post_id)
);
CREATE TABLE UserTag (
    comment_id INT,
    user_id INT,
    tagged_at TIMESTAMP,
    untagged_at TIMESTAMP NULL,
    PRIMARY KEY (comment_id, user_id)
);
CREATE TABLE Moderator (
    moderator_id INT,
    moderator_since TIMESTAMP,
    moderator_until TIMESTAMP NULL,
    PRIMARY KEY (moderator_id, moderator_since)
);
CREATE TABLE Following (
    follower_id INT,
    following_id INT,
    requested_at TIMESTAMP,
    approved_at TIMESTAMP NULL,
    canceled_at TIMESTAMP NULL,
    approved BOOLEAN,
    PRIMARY KEY (follower_id, following_id, requested_at)
);
CREATE TABLE Blocking (
    moderator_id INT,
    user_id INT,
    blocked_at TIMESTAMP,
    unblocked_at TIMESTAMP NULL,
    PRIMARY KEY (moderator_id, user_id, blocked_at)
);

