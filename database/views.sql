

CREATE VIEW V AS (

  SELECT u.username, p.post_id FROM
    user u
  LEFT JOIN 
    post p 
  ON
    u.user_id=p.user_id

);