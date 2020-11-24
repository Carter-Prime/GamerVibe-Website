
INSERT INTO User (username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ('Dummy1','Dummy','User1','blah@blah.fi','1234','','light','discord-link','youtube-link','twitch-link','2010-05-05 12:00:00',NULL,FALSE,NULL,NULL,NULL,'');
INSERT INTO User (username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ('Dummy2','Silly','User2','blah@blah.fj','1234','','','','','','2010-05-05 12:00:01',NULL,FALSE,NULL,NULL,NULL,'');
INSERT INTO User (username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ('Dummy3','Fool','User3','blah@blah.fk','1234','','','','','','2010-05-05 12:00:02',NULL,TRUE,NULL,NULL,NULL,'');
INSERT INTO User (username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ('Dummy4','Dummy','User4','blah@blah.fl','1234','','','','','','2010-05-05 12:00:03',NULL,TRUE,NULL,NULL,NULL,'');
INSERT INTO User (username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ('Dummy5','Silly','User5','blah@blah.fm','1234','','','','','','2010-05-05 12:00:04',NULL,FALSE,NULL,NULL,NULL,'');
INSERT INTO User (username,fname,lname,email,passwd,imagename,theme,discord,youtube,twitch,created_at,deleted_at,private_acc,banned_at,unbanned_at,banned_by,banned_reason) VALUES ('Dummy6','Fool','User6','blah@blah.fn','1234','','','','','','2010-05-05 12:00:05',NULL,FALSE,NULL,NULL,NULL,'');


INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00001','Random text here','2020-11-19 12:00:00',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00002','Random text here','2020-11-19 12:00:01',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00003','Random text here','2020-11-19 12:00:02',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00004','Random text here','2020-11-19 12:00:03',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00005','Random text here','2020-11-19 12:00:04',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00006','Random text here','2020-11-19 12:00:05',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00001','Random text here','2020-11-19 12:00:06',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00002','Random text here','2020-11-19 12:00:07',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00003','Random text here','2020-11-19 12:00:08',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00004','Random text here','2020-11-19 12:00:09',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00005','Random text here','2020-11-19 12:00:10',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00006','Random text here','2020-11-19 12:00:11',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00001','Random text here','2020-11-19 12:00:12',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00002','Random text here','2020-11-19 12:00:13',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00003','Random text here','2020-11-19 12:00:14',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00004','Random text here','2020-11-19 12:00:15',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00005','Random text here','2020-11-19 12:00:16',NULL,'');
INSERT INTO Post (user_id,caption,created_at,deleted_at,imgfilename) VALUES ('00006','Random text here','2020-11-19 12:00:17',NULL,'');


INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00001','00001','Random comment','2020-11-19 12:00:41', NULL, NULL,'00001');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00002','00002','Random comment','2020-11-19 12:00:42', NULL, NULL,'00002');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00003','00003','Random comment','2020-11-19 12:00:43', NULL, NULL,'00003');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00004','00004','Random comment','2020-11-19 12:00:44', NULL, NULL,'00004');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00005','00005','Random comment','2020-11-19 12:00:45', NULL, NULL,'00005');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00006','00006','Random comment','2020-11-19 12:00:46', NULL, NULL,'00006');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00001','00007','Random comment','2020-11-19 12:00:47', NULL, NULL,'00007');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00002','00008','Random comment','2020-11-19 12:00:48', NULL, NULL,'00008');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00003','00009','Random comment','2020-11-19 12:00:49', NULL, NULL,'00009');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00004','00010','Random comment','2020-11-19 12:00:50', NULL, NULL,'00010');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00005','00011','Random comment','2020-11-19 12:00:51', NULL, NULL,'00011');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00006','00012','Random comment','2020-11-19 12:00:52', NULL, NULL,'00012');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00001','00013','Random comment','2020-11-19 12:00:53', NULL, NULL,'00013');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00002','00014','Random comment','2020-11-19 12:00:54', NULL, NULL,'00014');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00003','00015','Random comment','2020-11-19 12:00:55', NULL, NULL,'00015');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00004','00016','Random comment','2020-11-19 12:00:56', NULL, NULL,'00016');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00005','00017','Random comment','2020-11-19 12:00:57', NULL, NULL,'00017');
INSERT INTO Comments (user_id,post_id,content,commented_at,edited_at,deleted_at,comment_id) VALUES ('00006','00018','Random comment','2020-11-19 12:00:58', NULL, NULL,'00018');



INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00002','game','2020-11-19 12:00:18', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00003','game','2020-11-19 12:00:19', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00004','game','2020-11-19 12:00:20', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00005','game','2020-11-19 12:00:21', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00006','game','2020-11-19 12:00:22', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00010','game','2020-11-19 12:00:23', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00011','game','2020-11-19 12:00:24', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00012','game','2020-11-19 12:00:25', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00013','game','2020-11-19 12:00:26', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00014','game','2020-11-19 12:00:27', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00015','game','2020-11-19 12:00:28', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00016','game','2020-11-19 12:00:29', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00017','game','2020-11-19 12:00:30', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00018','game','2020-11-19 12:00:31', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00009','character ','2020-11-19 12:00:32', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00010','character ','2020-11-19 12:00:33', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00011','character ','2020-11-19 12:00:34', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00012','character ','2020-11-19 12:00:35', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00013','character ','2020-11-19 12:00:36', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00014','character ','2020-11-19 12:00:37', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00015','character ','2020-11-19 12:00:38', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00016','character ','2020-11-19 12:00:39', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00017','character ','2020-11-19 12:00:40', NULL);
INSERT INTO PostTag (post_id,tag,tagged_at,untagged_at) VALUES ('00018','character ','2020-11-19 12:00:41', NULL);



INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00001','00001',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00002','00002',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00003','00003',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00004','00004',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00005','00005',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00006','00006',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00007','00001',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00008','00002',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00009','00003',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00010','00004',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00011','00005',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00012','00006',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00013','00001',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00014','00002',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00015','00003',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00016','00004',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00017','00005',timestamp('2020-11-19 12:00:41'),NULL);
INSERT INTO UserTag (comment_id,user_id,tagged_at,untagged_at) VALUES ('00018','00006',timestamp('2020-11-19 12:00:41'),NULL);


INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00001','2020-11-19 12:00:58', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00002','2020-11-19 12:00:59', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00003','2020-11-19 12:01:01', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00004','2020-11-19 12:01:00', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00005','2020-11-19 12:01:01', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00006','2020-11-19 12:01:02', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00007','2020-11-19 12:01:03', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00008','2020-11-19 12:01:04', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00009','2020-11-19 12:01:05', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00010','2020-11-19 12:01:06', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00012','2020-11-19 12:01:07', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00013','2020-11-19 12:01:08', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00014','2020-11-19 12:01:09', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00015','2020-11-19 12:01:10', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00016','2020-11-19 12:01:11', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00001','00016','2020-11-19 12:01:12', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00016','2020-11-19 12:01:13', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00016','2020-11-19 12:01:14', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00002','00001','2020-11-19 12:01:15', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00003','00001','2020-11-19 12:01:16', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00004','00001','2020-11-19 12:01:17', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00005','00001','2020-11-19 12:01:18', NULL);
INSERT INTO Upvote (user_id,post_id,liked_at,unliked_at) VALUES ('00006','00001','2020-11-19 12:01:19', NULL);


INSERT INTO Moderator (moderator_since,moderator_until) VALUES ('2010-05-05 13:00:02',NULL);
INSERT INTO Moderator (moderator_since,moderator_until) VALUES ('2010-05-05 13:00:03','2011-05-05 13:00:03');
INSERT INTO Moderator (moderator_since,moderator_until) VALUES ('2010-05-05 13:00:04',NULL);

--TODO
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00001','00004','2010-05-06 13:00:04',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00002','00001','2010-05-06 13:00:05',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00003','00002','2010-05-06 13:00:06',NULL,NULL,'1');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00004','00003','2010-05-06 13:00:07',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00005','00004','2010-05-06 13:00:08',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00006','00005','2010-05-06 13:00:09',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00001','00006','2010-05-06 13:00:10',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00002','00005','2010-05-06 13:00:11',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00003','00001','2010-05-06 13:00:12',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00004','00002','2010-05-06 13:00:13',NULL,NULL,'1');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00005','00003','2010-05-06 13:00:14',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00006','00004','2010-05-06 13:00:15',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00001','00005','2010-05-06 13:00:16',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00002','00006','2010-05-06 13:00:17',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00003','00006','2010-05-06 13:00:18',NULL,NULL,'1');
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00004','00001','2010-05-06 13:00:19',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00005','00002','2010-05-06 13:00:20',NULL,NULL,NULL);
INSERT INTO Following (follower_id,following_id,requested_at,approved_at,canceled_at,approved) VALUES ('00006','00003','2010-05-06 13:00:21',NULL,NULL,NULL);
