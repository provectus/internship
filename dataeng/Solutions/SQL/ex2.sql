SELECT
  lastname
FROM
  user
GROUP BY
  lastname
HAVING
  (COUNT(lastname) > 1);
