CREATE VIEW V4 AS (
  SELECT u.user_id,
    COUNT(p.post_id) AS PostsAll,
    (
      SELECT COUNT(p.post_id)
      FROM Post p
      WHERE u.user_id = p.user_id
        AND p.deleted_at IS NULL
    ) PostsActive
  FROM User u,
    Post p
  WHERE u.user_id = p.user_id
  GROUP BY u.user_id
);


CREATE VIEW V4 AS (
  SELECT u.user_id,
    FROM User u,
    Post p
    LEFT JOIN COUNT(p.post_id) AS PostsAll ON u.user_id = p.user_id
  GROUP BY u.user_id
);


SELECT Post.post_id, User.user_id, count(Post.post_id) AS post_count
FROM Post, User
LEFT JOIN Post ON Post.user_id = User.user_id
LEFT JOIN User ON User.user_id = Post.user_id
GROUP BY Post.post_id


SELECT post.id, post.title, user.id AS uid, username, count(post_comments.comment_id) as comment_count
FROM `post`
LEFT JOIN post_user ON post.id = post_user.post_id
LEFT JOIN user ON user.id = post_user.user_id
LEFT JOIN post_comments ON post_comments.post_id = post.id
GROUP BY User.user_id
