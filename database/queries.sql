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
-- Get all posts that a logged-in user can see--
-- Same as above
-- + add posts from private account with accepted friendship
-- + exclude posts from blocked accounts
-- example below for user 3
SELECT DISTINCT p.post_id,
    p.user_id,
    p.caption,
    u.username,
    p.created_at,
    p.imgfilename,
    p.deleted_at,
    p.banned_at,
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
    ) PosterFollowers,
    (
        SELECT count(blocked_at)
        FROM Blocking AS b
        WHERE b.blocking_id = u.user_id
    ) HiddenFrom
FROM Post AS p,
    User AS u,
    Following AS f,
    Blocking AS b
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
    AND NOT (
        b.blocker_id = 3
        AND b.blocking_id = u.user_id
        AND b.unblocked_at IS NULL
    )
ORDER BY Upvotes DESC
LIMIT 30;
-- List approved friends -- example for user 3
-- TODO exclude unfollowed and blocked
SELECT *
FROM Following f,
    User u
WHERE f.follower_id = 3
    AND f.following_id = u.user_id
    AND f.approved = 1
    AND f.banned_at IS NULL;
-- List pending follow requests
SELECT *
FROM Following f,
    User u
WHERE f.follower_id = 3
    AND f.following_id = u.user_id
    AND f.approved = 1;
-- List users by name
SELECT u.user_id,
    u.username,
    u.fname,
    u.lname,
    u.email,
    u.imagename,
    u.discord,
    u.youtube,
    u.twitch
FROM User AS u
WHERE (
        username LIKE '%$name%'
        OR fname LIKE '%$name%'
        OR lname LIKE '%$name%'
    )
    AND deleted_at IS NULL
    AND banned_at IS NULL;

-- Search tags with given tagname
SELECT DISTINCT t.post_id,
    t.tag,
    t.tagged_at,
    t.untagged_at
FROM PostTag AS t
WHERE (tag LIKE '%$tagname%')
    AND untagged_at IS NULL;

-- For discover page
-- Doesn't show posts from users that user is blocked or from users that accounts are private
-- !!!!I tested this nd this IMHO does not exclude deleted users
-- Now it work and it's used - Joonas
SELECT p.post_id,
    p.user_id,
    u.username,
    p.caption,
    p.created_at,
    p.imgfilename
FROM Post AS p
    LEFT JOIN User AS u ON u.user_id = p.user_id
    LEFT JOIN Blocking AS b ON b.blocker_id = 3
    AND b.blocking_id = p.user_id
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id != 3
    AND u.private_acc != 1
    AND u.banned_at IS NULL
    AND u.deleted_at IS NULL
    AND b.blocked_at IS NULL
    AND p.post_id < 9999999
ORDER BY created_at DESC
LIMIT 30 


-- For home page
    -- Show only those posts for users that user is following
SELECT p.post_id,
    p.user_id,
    u.username,
    p.caption,
    p.created_at,
    p.imgfilename
FROM Post AS p
    LEFT JOIN User AS u ON u.user_id = p.user_id
    LEFT JOIN Following AS f ON f.follower_id = 7
    AND f.following_id = p.user_id
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.banned_at IS NULL
    AND (
        u.user_id != 7
        AND f.approved = 1
        OR u.user_id = 7
    )
    AND p.post_id < 999999999
ORDER BY created_at DESC
LIMIT 30 

-- Discovery query that will not show friends and excludes posts from blocked users and deleted users--
    -- example below for user 76
SELECT DISTINCT p.post_id,
    p.user_id,
    p.caption,
    u.username,
    p.created_at,
    p.imgfilename,
    p.deleted_at,
    p.banned_at,
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
    ) PosterFollowers,
    (
        SELECT count(blocked_at)
        FROM Blocking AS b
        WHERE b.blocking_id = u.user_id
    ) HiddenFrom
FROM Post AS p,
    User AS u,
    Following AS f,
    Blocking AS b
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id != 3
    AND u.user_id = p.user_id
    AND (u.private_acc = 0)
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND (
        SELECT COUNT(*)
        FROM Blocking as b
        WHERE b.blocker_id = 76
        AND b.blocking_id = p.user_id
        AND b.unblocked_at IS NULL
    ) = 0
    AND (
        SELECT COUNT(*)
        FROM Following as f1
        WHERE f1.follower_id = 76
        AND f1.following_id = p.user_id
        AND f1.canceled_at IS NULL
    ) = 0
ORDER BY created_at DESC
LIMIT 30;

-- Friends query that will show friends only and excludes posts from blocked users and deleted users and itself--
-- example below for user 3
SELECT DISTINCT p.post_id,
    p.user_id,
    p.caption,
    u.username,
    p.created_at,
    p.imgfilename,
    p.deleted_at,
    p.banned_at,
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
    ) PosterFollowers,
    (
        SELECT count(blocked_at)
        FROM Blocking AS b
        WHERE b.blocking_id = u.user_id
    ) HiddenFrom
FROM Post AS p,
    User AS u,
    Following AS f,
    Blocking AS b
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id = p.user_id
    AND u.user_id != 3
    AND (
        f.follower_id = 3
        AND f.following_id = u.user_id
        AND f.approved = 1
        AND (
            u.private_acc = 0
            OR u.private_acc = 1
        )
    )
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND TIMESTAMPDIFF(SECOND, p.created_at, NOW()) > 0
    AND NOT (
        b.blocker_id = 3
        AND b.blocking_id = u.user_id
        AND b.unblocked_at IS NULL
    )
ORDER BY created_at DESC
LIMIT 30;

-- Friends query 2.0
SELECT p.post_id, p.user_id, u.username, p.caption, p.imgfilename, p.created_at, p.deleted_at, p.banned_at,
    (
    	SELECT COUNT(*)
        FROM Upvote l
        WHERE p.post_id = l.post_id
        AND l.unliked_at IS NULL
	) Upvotes,
    (
    	SELECT COUNT(*)
        FROM Following f
        WHERE f.following_id = u.user_id
        AND f.canceled_at IS NULL
	) PosterFollowers,
    (
        SELECT COUNT(*)
        FROM Blocking AS b
        WHERE b.blocking_id = u.user_id
        AND b.unblocked_at IS NULL
    ) HiddenFrom
FROM Post AS p
INNER JOIN User AS u
ON p.user_id = u.user_id
LEFT JOIN Following AS f
ON f.following_id = p.user_id
WHERE f.follower_id = 76
AND f.canceled_at IS NULL
AND p.deleted_at IS NULL
AND p.banned_at IS NULL
AND u.deleted_at IS NULL
AND u.banned_at IS NULL
ORDER BY p.created_at DESC
LIMIT 30

-- Query for own posts only that has not been banned or deleted
SELECT DISTINCT p.post_id,
    p.user_id,
    p.caption,
    u.username,
    p.created_at,
    p.imgfilename,
    p.deleted_at,
    p.banned_at,
    (
        SELECT count(post_id)
        FROM Upvote l
        WHERE p.post_id = l.post_id
            AND l.unliked_at IS NULL
    ) Upvotes
FROM Post AS p,
    User AS u,
    Following AS f,
    Blocking AS b
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id = p.user_id
    AND u.user_id = 3
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND TIMESTAMPDIFF(SECOND, p.created_at, NOW()) > 0
ORDER BY created_at DESC 

-- Query of users a user is blocking
    -- including blocked friends
    -- including deleted and banned accounts - I would need more time for that
SELECT DISTINCT b.blocker_id,
    b.blocking_id,
    b.blocked_at,
    b.unblocked_at,
    (
        SELECT username
        FROM User bu
        WHERE b.blocking_id = bu.user_id
    ) BlockedUsername
FROM User AS u,
    Following AS f,
    Blocking AS b
WHERE u.user_id = b.blocker_id
    AND u.user_id = 7
    AND b.unblocked_at IS NULL 
    
-- Ban user
UPDATE User
SET banned_at = NOW(),
    banned_by = ?,
    banned_reason = ?
WHERE user_id = ?
    AND deleted_at IS NULL
    AND banned_at IS NULL
    
-- Unban
UPDATE User
SET banned_at = NULL,
    banned_by = NULL,
    banned_reason = NULL
WHERE user_id = ?
    AND banned_at IS NOT NULL 
    
-- Block
INSERT INTO Blocking(blocker_id, blocking_id)
VALUES(?, ?) 

-- Unblock
UPDATE Blocking
SET unblocked_at = NOW()
WHERE blocker_id = ?
    AND blocking_id = ?
    AND unblocked_at IS NULL 
    
-- Get posts by tag
SELECT DISTINCT p.post_id,
    p.user_id,
    p.caption,
    u.username,
    p.created_at,
    p.imgfilename,
    p.deleted_at,
    p.banned_at,
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
    ) PosterFollowers,
    (
        SELECT count(blocked_at)
        FROM Blocking AS b
        WHERE b.blocking_id = u.user_id
    ) HiddenFrom
FROM Post AS p,
    User AS u,
    Following AS f,
    Blocking AS b,
    PostTag AS t
WHERE p.deleted_at IS NULL
    AND p.banned_at IS NULL
    AND u.user_id = p.user_id
    AND u.deleted_at IS NULL
    AND u.banned_at IS NULL
    AND p.post_id = t.post_id
    AND t.tag LIKE 'game'
ORDER BY HiddenFrom ASC, Upvotes DESC;