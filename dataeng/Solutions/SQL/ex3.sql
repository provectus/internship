SELECT username, salary
FROM user, salary
WHERE user_id == id AND id IN (
    SELECT user_id
    FROM salary
    WHERE salary IN (
        SELECT MAX( salary )
        FROM salary
        WHERE salary < ( SELECT MAX( salary ) FROM salary)
    )
);
