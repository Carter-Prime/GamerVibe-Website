-- Create tables
CREATE TABLE User (
    user_id int,
    username varchar(30) UNIQUE,
    fname varchar(50),
    lname varchar(50),
    email varchar(255) UNIQUE,
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
    comment_id int,
    user_id int,
    post_id int,
    content varchar(255),
    commented_at datetime,
    edited_at datetime,
    deleted_at datetime,
    PRIMARY KEY (user_id, post_id, commented_at, comment_id)
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
    tagged_at TIMESTAMP,
    untagged_at TIMESTAMP,
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

--- http://tools.perceptus.ca/text-wiz.php?ops=7

INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,blacklisted_at,unblacklisted_at,blacklisted_by,blacklisted_reason) VALUES ('00001','Dummy1','Dummy','User1','blah@blah.fi','1234','','light','discord-link','youtube-link','twitch-link','2010-05-05 12:00:00','NULL','0','NULL','NULL','','');
INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,blacklisted_at,unblacklisted_at,blacklisted_by,blacklisted_reason) VALUES ('00002','Dummy2','Silly','User2','blah@blah.fj','1234','','','','','','2010-05-05 12:00:01','NULL','0','NULL','NULL','','');
INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,blacklisted_at,unblacklisted_at,blacklisted_by,blacklisted_reason) VALUES ('00003','Dummy3','Fool','User3','blah@blah.fk','1234','','','','','','2010-05-05 12:00:02','NULL','1','NULL','NULL','','');
INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,blacklisted_at,unblacklisted_at,blacklisted_by,blacklisted_reason) VALUES ('00004','Dummy4','Dummy','User4','blah@blah.fl','1234','','','','','','2010-05-05 12:00:03','NULL','1','NULL','NULL','','');
INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,blacklisted_at,unblacklisted_at,blacklisted_by,blacklisted_reason) VALUES ('00005','Dummy5','Silly','User5','blah@blah.fm','1234','','','','','','2010-05-05 12:00:04','NULL','0','NULL','NULL','','');
INSERT INTO User (user_id,username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,blacklisted_at,unblacklisted_at,blacklisted_by,blacklisted_reason) VALUES ('00006','Dummy6','Fool','User6','blah@blah.fn','1234','','','','','','2010-05-05 12:00:05','NULL','0','NULL','NULL','','');



INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00001','00001','Random text here','2020-11-19 12:00:00','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00002','00002','Random text here','2020-11-19 12:00:01','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00003','00003','Random text here','2020-11-19 12:00:02','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00004','00004','Random text here','2020-11-19 12:00:03','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00005','00005','Random text here','2020-11-19 12:00:04','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00006','00006','Random text here','2020-11-19 12:00:05','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00007','00001','Random text here','2020-11-19 12:00:06','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00008','00002','Random text here','2020-11-19 12:00:07','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00009','00003','Random text here','2020-11-19 12:00:08','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00010','00004','Random text here','2020-11-19 12:00:09','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00011','00005','Random text here','2020-11-19 12:00:10','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00012','00006','Random text here','2020-11-19 12:00:11','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00013','00001','Random text here','2020-11-19 12:00:12','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00014','00002','Random text here','2020-11-19 12:00:13','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00015','00003','Random text here','2020-11-19 12:00:14','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00016','00004','Random text here','2020-11-19 12:00:15','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00017','00005','Random text here','2020-11-19 12:00:16','','');
INSERT INTO Post (post_id,user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00018','00006','Random text here','2020-11-19 12:00:17','','');


INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00002','game','2020-11-19 12:00:18','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00003','game','2020-11-19 12:00:19','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00004','game','2020-11-19 12:00:20','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00005','game','2020-11-19 12:00:21','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00006','game','2020-11-19 12:00:22','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00010','game','2020-11-19 12:00:23','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00011','game','2020-11-19 12:00:24','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00012','game','2020-11-19 12:00:25','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00013','game','2020-11-19 12:00:26','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00014','game','2020-11-19 12:00:27','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00015','game','2020-11-19 12:00:28','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00016','game','2020-11-19 12:00:29','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00017','game','2020-11-19 12:00:30','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00018','game','2020-11-19 12:00:31','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00009','character ','2020-11-19 12:00:32','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00010','character ','2020-11-19 12:00:33','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00011','character ','2020-11-19 12:00:34','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00012','character ','2020-11-19 12:00:35','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00013','character ','2020-11-19 12:00:36','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00014','character ','2020-11-19 12:00:37','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00015','character ','2020-11-19 12:00:38','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00016','character ','2020-11-19 12:00:39','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00017','character ','2020-11-19 12:00:40','');
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00018','character ','2020-11-19 12:00:41','');


INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00001','00001','Random comment','2020-11-19 12:00:41','','','00001');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00002','00002','Random comment','2020-11-19 12:00:42','','','00002');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00003','00003','Random comment','2020-11-19 12:00:43','','','00003');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00004','00004','Random comment','2020-11-19 12:00:44','','','00004');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00005','00005','Random comment','2020-11-19 12:00:45','','','00005');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00006','00006','Random comment','2020-11-19 12:00:46','','','00006');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00001','00007','Random comment','2020-11-19 12:00:47','','','00007');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00002','00008','Random comment','2020-11-19 12:00:48','','','00008');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00003','00009','Random comment','2020-11-19 12:00:49','','','00009');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00004','00010','Random comment','2020-11-19 12:00:50','','','00010');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00005','00011','Random comment','2020-11-19 12:00:51','','','00011');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00006','00012','Random comment','2020-11-19 12:00:52','','','00012');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00001','00013','Random comment','2020-11-19 12:00:53','','','00013');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00002','00014','Random comment','2020-11-19 12:00:54','','','00014');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00003','00015','Random comment','2020-11-19 12:00:55','','','00015');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00004','00016','Random comment','2020-11-19 12:00:56','','','00016');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00005','00017','Random comment','2020-11-19 12:00:57','','','00017');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00006','00018','Random comment','2020-11-19 12:00:58','','','00018');


INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00001','2020-11-19 12:00:58','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00002','2020-11-19 12:00:59','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00003','2020-11-19 12:00:60','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00004','2020-11-19 12:00:61','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00005','2020-11-19 12:00:62','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00006','2020-11-19 12:00:63','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00007','2020-11-19 12:00:64','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00008','2020-11-19 12:00:65','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00009','2020-11-19 12:00:66','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00010','2020-11-19 12:00:67','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00012','2020-11-19 12:00:68','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00013','2020-11-19 12:00:69','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00014','2020-11-19 12:00:70','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00015','2020-11-19 12:00:71','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00016','2020-11-19 12:00:72','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00016','2020-11-19 12:00:73','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00016','2020-11-19 12:00:74','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00016','2020-11-19 12:00:75','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00001','2020-11-19 12:00:77','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00001','2020-11-19 12:00:78','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00001','2020-11-19 12:00:79','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00001','2020-11-19 12:00:80','');
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00006','00001','2010-05-05 12:15:00','');


INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00001','00001','2020-11-19 12:00:41','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00002','00002','2020-11-19 12:00:42','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00003','00003','2020-11-19 12:00:43','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00004','00004','2020-11-19 12:00:44','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00005','00005','2020-11-19 12:00:45','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00006','00006','2020-11-19 12:00:46','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00007','00001','2020-11-19 12:00:47','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00008','00002','2020-11-19 12:00:48','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00009','00003','2020-11-19 12:00:49','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00010','00004','2020-11-19 12:00:50','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00011','00005','2020-11-19 12:00:51','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00012','00006','2020-11-19 12:00:52','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00013','00001','2020-11-19 12:00:53','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00014','00002','2020-11-19 12:00:54','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00015','00003','2020-11-19 12:00:55','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00016','00004','2020-11-19 12:00:56','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00017','00005','2020-11-19 12:00:57','');
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00018','00006','2020-11-19 12:00:58','');


INSERT INTO Moderator (moderator_id,moderator_since,moderator_until) VALUES ('00004','2010-05-05 13:00:02','');
INSERT INTO Moderator (moderator_id,moderator_since,moderator_until) VALUES ('00005','2010-05-05 13:00:03','2011-05-05 13:00:03');
INSERT INTO Moderator (moderator_id,moderator_since,moderator_until) VALUES ('00006','2010-05-05 13:00:04','');


INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00001','00004','2010-05-06 13:00:04','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00002','00001','2010-05-06 13:00:05','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00003','00002','2010-05-06 13:00:06','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00004','00003','2010-05-06 13:00:07','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00005','00004','2010-05-06 13:00:08','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00006','00005','2010-05-06 13:00:09','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00001','00006','2010-05-06 13:00:10','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00002','00005','2010-05-06 13:00:11','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00003','00001','2010-05-06 13:00:12','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00004','00002','2010-05-06 13:00:13','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00005','00003','2010-05-06 13:00:14','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00006','00004','2010-05-06 13:00:15','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00001','00005','2010-05-06 13:00:16','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00002','00006','2010-05-06 13:00:17','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00003','00006','2010-05-06 13:00:18','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00004','00001','2010-05-06 13:00:19','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00005','00002','2010-05-06 13:00:20','','','');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00006','00003','2010-05-06 13:00:21','','','');
