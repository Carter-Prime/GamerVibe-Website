--
-- Database
--
-- --------------------------------------------------------
--
-- Table structure for table `Blocking`
--
CREATE TABLE `Blocking` (
    `blocker_id` int(11) NOT NULL,
    `blocking_id` int(11) NOT NULL,
    `blocked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `unblocked_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `Comments`
--
CREATE TABLE `Comments` (
    `comment_id` int(11) NOT NULL,
    `user_id` int(11) DEFAULT NULL,
    `post_id` int(11) DEFAULT NULL,
    `content` varchar(255) DEFAULT NULL,
    `commented_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `edited_at` timestamp NULL DEFAULT NULL,
    `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `Following`
--
CREATE TABLE `Following` (
    `follower_id` int(11) NOT NULL,
    `following_id` int(11) NOT NULL,
    `requested_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `approved_at` timestamp NULL DEFAULT NULL,
    `canceled_at` timestamp NULL DEFAULT NULL,
    `approved` tinyint(1) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `Moderator`
--
CREATE TABLE `Moderator` (
    `moderator_id` int(11) NOT NULL,
    `moderator_since` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `moderator_until` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `Post`
--
CREATE TABLE `Post` (
    `post_id` int(11) NOT NULL,
    `user_id` int(11) DEFAULT NULL,
    `caption` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    `imgfilename` varchar(255) DEFAULT NULL,
    `views` int(11) NOT NULL DEFAULT '0',
    `banned_at` timestamp NULL DEFAULT NULL,
    `banned_by` int(11) DEFAULT NULL,
    `banned_reason` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `PostTag`
--
CREATE TABLE `PostTag` (
    `post_id` int(11) DEFAULT NULL,
    `tag` varchar(100) DEFAULT NULL,
    `tagged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `untagged_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `Upvote`
--
CREATE TABLE `Upvote` (
    `user_id` int(11) DEFAULT NULL,
    `post_id` int(11) DEFAULT NULL,
    `liked_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `unliked_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `User`
--
CREATE TABLE `User` (
    `user_id` int(11) NOT NULL,
    `username` varchar(30) DEFAULT NULL,
    `fname` varchar(50) DEFAULT NULL,
    `lname` varchar(50) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `passwd` varchar(255) DEFAULT NULL,
    `imagename` varchar(255) DEFAULT NULL,
    `theme` varchar(50) DEFAULT NULL,
    `discord` varchar(255) DEFAULT NULL,
    `youtube` varchar(255) DEFAULT NULL,
    `twitch` varchar(255) DEFAULT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` timestamp NULL DEFAULT NULL,
    `private_acc` tinyint(1) DEFAULT '0',
    `banned_at` timestamp NULL DEFAULT NULL,
    `banned_by` int(11) DEFAULT NULL,
    `banned_reason` varchar(255) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Table structure for table `UserTag`
--
CREATE TABLE `UserTag` (
    `comment_id` int(11) DEFAULT NULL,
    `user_id` int(11) DEFAULT NULL,
    `tagged_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `untagged_at` timestamp NULL DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
--
-- Indexes for table `Blocking`
--
ALTER TABLE `Blocking`
ADD PRIMARY KEY (`blocker_id`, `blocking_id`, `blocked_at`),
    ADD KEY `blocking_id` (`blocking_id`);
--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
ADD PRIMARY KEY (`comment_id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `post_id` (`post_id`);
--
-- Indexes for table `Following`
--
ALTER TABLE `Following`
ADD PRIMARY KEY (`follower_id`, `following_id`, `requested_at`),
    ADD KEY `following_id` (`following_id`);
--
-- Indexes for table `Moderator`
--
ALTER TABLE `Moderator`
ADD PRIMARY KEY (`moderator_id`, `moderator_since`);
--
-- Indexes for table `Post`
--
ALTER TABLE `Post`
ADD PRIMARY KEY (`post_id`),
    ADD KEY `FK_PostUser` (`user_id`),
    ADD KEY `banned_by` (`banned_by`);
--
-- Indexes for table `PostTag`
--
ALTER TABLE `PostTag`
ADD UNIQUE KEY `unique_index` (`post_id`, `tag`);
--
-- Indexes for table `Upvote`
--
ALTER TABLE `Upvote`
ADD KEY `post_id` (`post_id`),
    ADD KEY `user_id` (`user_id`);
--
-- Indexes for table `User`
--
ALTER TABLE `User`
ADD PRIMARY KEY (`user_id`),
    ADD UNIQUE KEY `username` (`username`),
    ADD UNIQUE KEY `email` (`email`),
    ADD KEY `banned_by` (`banned_by`);
--
-- Indexes for table `UserTag`
--
ALTER TABLE `UserTag`
ADD KEY `user_id` (`user_id`),
    ADD KEY `comment_id` (`comment_id`);
--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 126;
--
-- AUTO_INCREMENT for table `Post`
--
ALTER TABLE `Post`
MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 187;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,
    AUTO_INCREMENT = 102;
--
-- Constraints for table `Blocking`
--
ALTER TABLE `Blocking`
ADD CONSTRAINT `Blocking_ibfk_1` FOREIGN KEY (`blocker_id`) REFERENCES `User` (`user_id`),
    ADD CONSTRAINT `Blocking_ibfk_2` FOREIGN KEY (`blocking_id`) REFERENCES `User` (`user_id`);
--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
    ADD CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`);
--
-- Constraints for table `Following`
--
ALTER TABLE `Following`
ADD CONSTRAINT `Following_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `User` (`user_id`),
    ADD CONSTRAINT `Following_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `User` (`user_id`);
--
-- Constraints for table `Moderator`
--
ALTER TABLE `Moderator`
ADD CONSTRAINT `Moderator_ibfk_1` FOREIGN KEY (`moderator_id`) REFERENCES `User` (`user_id`);
--
-- Constraints for table `Post`
--
ALTER TABLE `Post`
ADD CONSTRAINT `FK_PostUser` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
    ADD CONSTRAINT `Post_ibfk_1` FOREIGN KEY (`banned_by`) REFERENCES `Moderator` (`moderator_id`);
--
-- Constraints for table `PostTag`
--
ALTER TABLE `PostTag`
ADD CONSTRAINT `PostTag_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`);
--
-- Constraints for table `Upvote`
--
ALTER TABLE `Upvote`
ADD CONSTRAINT `Upvote_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Post` (`post_id`),
    ADD CONSTRAINT `Upvote_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
--
-- Constraints for table `User`
--
ALTER TABLE `User`
ADD CONSTRAINT `User_ibfk_1` FOREIGN KEY (`banned_by`) REFERENCES `Moderator` (`moderator_id`);
--
-- Constraints for table `UserTag`
--
ALTER TABLE `UserTag`
ADD CONSTRAINT `UserTag_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`),
    ADD CONSTRAINT `UserTag_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `Comments` (`comment_id`);
COMMIT;