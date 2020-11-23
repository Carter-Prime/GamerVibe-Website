INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ( ?, ?,?,?,?, ?);

UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?;
UPDATE Post SET user_id = ?, caption,created_at = ?, deleted_at = ?, imgfilename = ? WHERE post_id = ?;


DELETE FROM wop_cat WHERE cat_id = ?
We should never use DELETE, instead, set the deleted time.
UPDATE Post SET deleted_at = ? WHERE post_id = ?;
Time format as '2020-11-22 12:00:00'
e.g. UPDATE Post SET deleted_at = '2020-11-22 12:00:00' WHERE post_id = 13;




SELECT * FROM wop_user
SELECT * FROM User 
But to see only active users
SELECT * FROM User WHERE deleted_at IS NULL;
To see active unblocked users
…


See all active posts
SELECT * FROM Post WHERE deleted_at IS NULL;


INSERT INTO wop_user(name, email, password) VALUES(?, ?, ?)
INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?,?,?, ?, ?);

UPDATE wop_user SET name = ?, email = ?, passwd = ? WHERE user_id = ?;
UPDATE User SET username = ?, fname ?, lname = ?, email ?, passwd = ?, imagename ?, theme ?, discord = ?, youtube = ?, twitch ?, created_at = ?, deleted_at = ?, private_acc = ?, banned_at = ?, unbanned_at = ?, banned_by = ?, banned_reason = ? WHERE user_id = ?;

DELETE FROM wop_user WHERE user_id = ?
We should never use DELETE, instead, set the deleted time.
UPDATE User SET deleted_at = ? WHERE user_id = ?;



SELECT * FROM wop_user WHERE email = ?;
SELECT * FROM User WHERE email = ?;

