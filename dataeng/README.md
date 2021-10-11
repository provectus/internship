### Prerequisites
* Python 3.7 or greater
* Docker 19.03 or greater
* Git 2.28 or greater
* Postgres 13 or greater

## Level 2 solution
## How to install and run:
Clone this repo to your machine and got to dataeng folder where requiements.txt is located
* install requiements:
```
pip install -r requirements.txt
```
* Run server file
```
python server.py
```
Now the server is running on local host on port 5000
The server will update the data every 5 minutes

## POST and GET requests:
* POST will manulally update the data, to make POST request run on your terminal:
```
curl -X POST localhost:5000/data
```
* To get data write on your browser:

http://localhost:5000
* Applying filter example:
You can apply 1,2 or all filters together, 
Example of 3 filters applied 

http://127.0.0.1:5000/data?is_image_exists=True&min_age=20&max_age=22

This will return all users who have image and thier age is between 20 and 22

### Coding tasks

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
```sql
SELECT users.id as id
FROM users
LEFT JOIN departments
ON users.id = departments.user_id
WHERE departments.user_id is NULL OR departments.department_id != 1
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
```sql
SELECT last_name FROM user
GROUP BY last_name HAVING COUNT(last_name) > 1
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
```sql
SELECT user.username AS username, MAX(salary.salary) AS salary FROM user, salary
WHERE user.id = salary.user_id AND salary.salary NOT IN 
( SELECT MAX(salary) FROM salary )
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
```
def count_connections(list1: list, list2: list) -> int:
    count = 0
    # occurance will hold the number of occurance for each number in the first list
    # then for each occurance number match with element from the second list we will increase count by the occurance number
    occurance = {}

    for i in list1:
        if occurance.get(i) is None:
            occurance[i] = 1
        else:
            occurance[i] = occurance[i] + 1
	    
    for i in list2:
        if occurance.get(i) is not None:
        count += occurance[i]

    return count
```

2. Given a string `s`, find the length of the longest substring without repeating characters.
   Analyze your solution and please provide Space and Time complexities.
   
```
def LongestNonrepeatingSubstring(s):
    # store index of appeared chars
    last_index = {}
    # starting point of our substring
    start_point = 0
    # longest substring so far
    longest_str = 0

    for i in range(0, len(s)):
        # if it is not the first time to see this char in this string
        # we choose either this apperation of this char or the last one
        if s[i] in last_index:
            start_idx = max(start_idx, last_index[s[i]] + 1)

        # update our substring if we have a longer one
        longest_str = max(longest_str, i-start_point + 1)
        # mark that here is the last apperation of this char
        last_index[s[i]] = i
    # return the answer
    return longest_str

    # This solution is linear
    # Time complexity: O(N) ====> we only go through the string once
    # Space Complexity: O(N) ====> at worst case we save the last index of all elements (they all are similiar)
```

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
 ```
 def search_f_or_index(dis_int, target):
    # we use binary search to search for the element and we set an upper boundary to return if the target doesn't exist
    l = 0
    r = len(dis_int) -1
    mid = ( l + r ) // 2
    boundary = r + 1
    while l <= r:
        if target == dis_int[mid]:
            return dis_int[mid]
        else:
            if target < dis_int[mid]:
                boundary = mid
                r = mid - 1
                mid = ( l + r) // 2
            else:
                l = mid + 1
                mid = ( l + r ) // 2
    return boundary
 ```

**Example:**
```text
Input: nums = [1,3,5,6], target = 5
Output: 2
```

### Linux Shell
1. List processes listening on ports 80 and 443

```text
netstat -ltnp | grep -w ':80|443'
```

3. List process environment variables by given PID
```text
sudo cat /proc/`pgrep process_name `/environ
```
5. Launch a python program `my_program.py` through CLI in the background. How would you close it after some period of time?
Run

```
nohup python3 my_program.py &
```

Output will be put in ```nohup.out```.

To close it we first find it's PID ``` ps ax | grep my_program.py```

And now we kill this process to stop the program using: ```kill 'PID of process' ```
