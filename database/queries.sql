-- INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);
INSERT INTO Post (
        post_id,
        user_id,
        caption,
        created_at,
        deleted_at,
        imgfilename,
,
        banned_at,
        banned_by,
        banned_reason
    )
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
--UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?;
UPDATE Post
SET user_id = ?,
    caption,
    created_at = ?,
    deleted_at = ?,
    imgfilename = ?,
    banned_at = ?,
    banned_by = ?,
    banned_reason = ?
WHERE post_id = ?;
--DELETE FROM wop_cat WHERE cat_id = ?
--We should never use DELETE, instead, set the deleted time.
UPDATE Post
SET deleted_at = ?
WHERE post_id = ?;
--e.g. 
UPDATE Post
SET deleted_at = '2020-11-22 12:00:00'
WHERE post_id = 13;
--SELECT * FROM wop_user
SELECT *
FROM User --But to see only active users
SELECT *
FROM User
WHERE deleted_at IS NULL;
-- See all active posts
SELECT *
FROM Post
WHERE deleted_at IS NULL;
--INSERT INTO wop_user(name, email, password) VALUES(?, ?, ?)
INSERT INTO User (
        user_id,
        username,
        fname,
        lname,
        email,
        passwd,
        imagename,
        theme,
        discord,
        youtube,
        twitch,
        created_at,
        deleted_at,
        private_acc,
        banned_at,
        banned_by,
        banned_reason
    )
VALUES (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    );
--UPDATE wop_user SET name = ?, email = ?, passwd = ? WHERE user_id = ?;
UPDATE User
SET username = ?,
    fname ?,
    lname = ?,
    email ?,
    passwd = ?,
    imagename ?,
    theme ?,
    discord = ?,
    youtube = ?,
    twitch ?,
    created_at = ?,
    deleted_at = ?,
    private_acc = ?,
    banned_at = ?,
    banned_by = ?,
    banned_reason = ?
WHERE user_id = ?;
--DELETE FROM wop_user WHERE user_id = ?
--We should never use DELETE, instead, set the deleted time.
UPDATE User
SET deleted_at = ?
WHERE user_id = ?;
--e.g.
UPDATE User_t
SET deleted_at = CURRENT_TIMESTAMP
WHERE user_id = 1;
--SELECT * FROM wop_user WHERE email = ?;
SELECT *
FROM User
WHERE email = ?;
-- Get all posts that a user can see when not logged in--
-- Posts that are not banned or deleted
-- From Users that are not banned or deleted or private
--example for user with id 1
SELECT p.post_id,
    p.user_id,
    p.caption,
    p.created_at,
    p.imgfilename
FROM Post AS p,
    User AS u
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id = p.user_id
    AND u.private_acc != 1
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND TIMESTAMPDIFF(SECOND, p.created_at, NOW()) > 0
ORDER BY p.created_at DESC
LIMIT 30;
-- same as above but ordered by number of upvotes
SELECT p.post_id,
    p.user_id,
    p.caption,
    p.created_at,
    p.imgfilename,
    (
        SELECT count(post_id)
        FROM Upvote l
        WHERE p.post_id = l.post_id
            AND l.unliked_at IS NULL
    ) Upvote
FROM Post AS p,
    User AS u
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id = p.user_id
    AND u.private_acc != 1
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND TIMESTAMPDIFF(SECOND, p.created_at, NOW()) > 0
ORDER BY Upvotes DESC
LIMIT 30;
--TODO
-- Get all posts that a logged-in user can see--
-- Same as above
-- + add posts from private account with accepted friendship
-- + exclude posts from blocked accounts
SELECT DISTINCT p.post_id,
    p.user_id,
    p.caption,
    p.created_at,
    p.imgfilename,
    (
        SELECT count(post_id)
        FROM Upvote l
        WHERE p.post_id = l.post_id
            AND l.unliked_at IS NULL
    ) Upvotes,
    (
        SELECT count(approved)
        FROM Following f
        WHERE f.following_id = u.user_id
            AND f.approved = 1
    ) PosterFollowers
FROM Post AS p,
    User AS u,
    Following AS f
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id != 3
    AND u.user_id = p.user_id
    AND (
        u.private_acc = 0
        OR (
            f.follower_id = 3 
            AND f.following_id = u.user_id
            AND f.approved = 1
        )
    )
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND TIMESTAMPDIFF(SECOND, p.created_at, NOW()) > 0
ORDER BY Upvotes DESC
LIMIT 30;
