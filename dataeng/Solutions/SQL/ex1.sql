SELECT
  id
FROM
  users,
  departments
WHERE
  id == user_id AND department_id ! = 1;
