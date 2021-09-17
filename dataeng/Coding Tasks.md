# Coding Tasks for Data Engineers

## SQL
1. Rewrite this SQL without subquery:
```sql
SELECT id
FROM users
WHERE id NOT IN (
	SELECT user_id
	FROM departments
	WHERE department_id = 1
);
```
2. Write a SQL query to find all duplicate lastnames in a table named **user**
```text
+----+-----------+-----------
| id | firstname | lastname |
+----+-----------+-----------
| 1  | Ivan      | Sidorov  |
| 2  | Alexandr  | Ivanov   |
| 3  | Petr      | Petrov   |
| 4  | Stepan    | Ivanov   |
+----+-----------+----------+
```
3. Write a SQL query to get a username from the **user** table with the second highest salary from **salary** tables. Show the username and it's salary in the result.
```sql
+---------+--------+
| user_id | salary |
+----+--------+----+
| 1       | 1000   |
| 2       | 1100   |
| 3       | 900    |
| 4       | 1200   |
+---------+--------+
```
```sql
+---------+--------+
| id | usernane    |
+----+--------+----+
| 1  | Alex       |
| 2  | Maria      |
| 3  | Bob        |
| 4  | Sean       |
+---------+-------+
```
## Algorithms and Data Structures
1. Optimise execution time of this Python code snippet:
```
def count_connections(list1: list, list2: list) -> int:
  count = 0
  
  for i in list1:
    for j in list2:
      if i == j:
        count += 1
  
  return count
```

2. Given a string `s`, find the length of the longest substring without repeating characters.
Analyze your solution and please provide Space and Time complexities.
 
**Example 1**
```text
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```
**Example 2**
```text
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```
**Example 3**
```text
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
```
**Example 3**
```text
Input: s = ""
Output: 0
```

3. Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

**Example:**
```text
Input: nums = [1,3,5,6], target = 5
Output: 2
```

## Linux Shell
1. List processes listening on ports 80 and 443
2. List process environment variables by given PID 
3. Launch a python program `my_program.py` through CLI in the background. How would you close it after some period of time?
