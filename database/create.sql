CREATE TABLE User (
    user_id INT AUTO_INCREMENT,
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    private_acc BOOLEAN DEFAULT TRUE,
    banned_at TIMESTAMP NULL,
    unbanned_at TIMESTAMP NULL,
    banned_by INT,
    banned_reason VARCHAR(255),
    PRIMARY KEY(user_id)
);
CREATE TABLE Post (
    post_id INT AUTO_INCREMENT,
    user_id INT,
    caption VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    imgfilename VARCHAR(255),
    PRIMARY KEY (post_id)
);
ALTER TABLE Post
ADD CONSTRAINT FK_PostUser FOREIGN KEY (user_id) REFERENCES User(user_id);
CREATE TABLE Comments (
    comment_id INT AUTO_INCREMENT,
    user_id INT,
    post_id INT,
    content VARCHAR(255),
    commented_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    edited_at TIMESTAMP NULL,
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (post_id) REFERENCES Post (post_id)
);
CREATE TABLE PostTag (
    post_id INT,
    tag VARCHAR(100),
    tagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    untagged_at TIMESTAMP NULL,
    FOREIGN KEY (post_id) REFERENCES Post (post_id)
);
CREATE TABLE Upvote (
    user_id INT,
    post_id INT,
    liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unliked_at TIMESTAMP NULL,
    FOREIGN KEY (post_id) REFERENCES Post (post_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id)
);
CREATE TABLE UserTag (
    comment_id INT,
    user_id INT,
    tagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    untagged_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (comment_id) REFERENCES Comments (comment_id)
);
CREATE TABLE Moderator (
    moderator_id INT,
    moderator_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    moderator_until TIMESTAMP NULL,
    PRIMARY KEY (moderator_since),
    FOREIGN KEY (moderator_id) REFERENCES User (user_id)
);
CREATE TABLE Following (
    relationship_id INT AUTO_INCREMENT,
    follower_id INT,
    following_id INT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP NULL,
    canceled_at TIMESTAMP NULL,
    approved BOOLEAN,
    PRIMARY KEY (relationship_is),
    FOREIGN KEY (follower_id) REFERENCES User (user_id)
);
ALTER TABLE Following
ADD FOREIGN KEY (following_id) REFERENCES User(user_id);
CREATE TABLE Blocking (
    blocker_id INT,
    blocking_id INT,
    blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unblocked_at TIMESTAMP NULL,
    PRIMARY KEY (blocked_at),
    FOREIGN KEY (blocker_id) REFERENCES User (user_id)
);
ALTER TABLE Blocking
ADD FOREIGN KEY (blocking_id) REFERENCES User (user_id);