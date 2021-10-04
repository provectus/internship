### Prerequisites
* Python 3.7 or greater
* Docker 19.03 or greater
* Git 2.28 or greater
* Postgres 13 or greater

## Level 1

### Files definitions:

- src_data - Path with source data needed to be processed.
- processed_data - Path with output processed data.
- user_id.jpg - User image file, for example, 0001.jpg. Could be several for different users in source data path.
- user_id.csv - User info file, for example, 0001.csv. Could be several for different users in source data path.

User csv file contains next columns:

1. first_name - User first name
2. last_name - User last name
3. birthts - User birthdate timestamp in milliseconds UTC

Test csv and img files could be found in the [02-src-data](./02-src-data) folder

**For example:**

```text
first_name, last_name, birthts
Ivan, Ivanov, 946674000000
```

### Data processing description

1. Read csv file
2. Match images for each user
3. Combine data from CSV and image path
4. Update processed_data/output.csv CSV file and add new data. Important we can update data for previously processed
   user. In output CSV and DB we should not duplicate records. Output CSV file format: user_id, first_name,
   last_name, birthts, img_path

## Task

Implement a script to process files from the `src_data` folder.

## Results delivery format

Results should be implemented as a python script with demo data. Also should be
provided the README.md file with the description of your solution.

## Level 2
The same as **Level 1** with the following extras.

## Results delivery format

Results should be implemented as a service. The service should periodically read source data and process it.
Also, the service should implement web server with next endpoints:
- **GET**  /data - get all records from DB in JSON format. Need to implement filtering by: is_image_exists = True/False, user min_age and max_age in years.
- **POST** /data - manually run data processing in src_data

Should be provided the README.md file with the description of your solution.

## Level 3
The same as **Level 2** but with next differences.

### Files definitions:
Source data and processed data should store in Minio. Minio service already defined in [docker-compose](./01-docker-compose/docker-compose.yml) file.

### Data processing description

1. Read csv file
2. Match images for each user
3. Combine data from CSV and image path
4. Update processed_data/output.csv CSV file and add new data. Important we can update data for previously processed
   user. In output CSV and DB we should not to duplicate records. Output CSV file format: user_id, first_name,
   last_name, birthts, img_path
5. Write this combined data to DB. Record should contain next columns: id, user_id, first_name, last_name, birthdate, img_path. id - autoincrement unique record id.
Postgres DB service already defined in [docker-compose](./01-docker-compose/docker-compose.yml)

## Results delivery format

Results should be implemented as a service. The service should periodically read source data and process it.
Also, the service should implement web server with next endpoints:
- **GET**  /data - get all records from DB in JSON format. Need to implement filtering by: is_image_exists = True/False, user min_age and max_age in years.
- **POST** /data - manually run data processing in src_data

The solution should work in docker-compose. As base template can be taken [docker-compose](./01-docker-compose/docker-compose.yml) file.

**As a solution, you should implement one of the levels. You don't need to implement all of them, just choose the one you can solve.** 
## Coding Tasks for Data Engineers
The following tasks cover different sections to check candidate's basic knowledge in SQL, Algorithms and Linux shell. 

### SQL
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
| id | username    |
+----+--------+----+
| 1  | Alex       |
| 2  | Maria      |
| 3  | Bob        |
| 4  | Sean       |
+---------+-------+
```
### Algorithms and Data Structures
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

### Linux Shell
1. List processes listening on ports 80 and 443
2. List process environment variables by given PID
3. Launch a python program `my_program.py` through CLI in the background. How would you close it after some period of time?
