-- Create tables
CREATE TABLE User (
    user_id int,
    username varchar(30) UNIQUE,
    fname varchar(50),
    lname varchar(50),
    email varchar(255),
    passwd varchar(255),
    imagename varchar(255),
    theme varchar(50),
    discord varchar(100),
    youtube varchar(100),
    twitch varchar(100),
    created_at datetime,
    deleted_at datetime,
    private_acc boolean,
    blacklisted_at datetime,
    unblacklisted_at datetime,
    blacklisted_by int,
    blacklisted_reason varchar(255),
    PRIMARY KEY(user_id)
);
CREATE TABLE Post (
    post_id int,
    user_id int,
    caption varchar(255),
    created_at datetime,
    deleted_at datetime,
    imgfilename varchar(255),
    PRIMARY KEY (post_id)
);
CREATE TABLE PostTag (
    post_id int,
    tag varchar(100),
    tagged_at datetime,
    untagged_at datetime,
    PRIMARY KEY (post_id, tag)
);
CREATE TABLE Comments (
    user_id int,
    post_id int,
    content varchar(255),
    commented_at datetime,
    edited_at datetime,
    deleted_at datetime,
    PRIMARY KEY (user_id, post_id, commented_at)
);
CREATE TABLE Upvote (
    user_id int,
    post_id int,
    liked_at datetime,
    unliked_at datetime,
    PRIMARY KEY (user_id, post_id)
);
CREATE TABLE UserTag (
    comment_id int,
    user_id int,
    tagged_at datetime,
    untagged_at datetime,
    PRIMARY KEY (comment_id, user_id)
);
CREATE TABLE Moderator (
    moderator_id int,
    moderator_since datetime,
    moderator_until datetime,
    PRIMARY KEY (moderator_id, moderator_since)
);
CREATE TABLE Following (
    follower_id int,
    following_id int,
    requested_at datetime,
    approved_at datetime,
    canceled_at datetime,
    approved boolean,
    PRIMARY KEY (follower_id, following_id, requested_at)
);