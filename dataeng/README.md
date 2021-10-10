# Read me

### This is the solution of Dataeng Internship task
#### There are 2 working modes
##### First Working mode:
Reading all the CSV files of the users and checking the previously processed output file, then filtering the duplicate user_ids and then updating the processed output file with the new users.
##### Second Working mode:
Only if we have an already processed output file, the client has the ability to edit one of the users in the database, He can change the first_name and the last_name of the selected user.
##### Code structure
The code is divided into a main part and 4 functions
1- A simple function for reading a single CSV file: list
2- A function that concatenates all the data in the CSV files
3- A function that writes data into a CSV file
4- A function that checks wether there's a processed output file before or not
The main function takes the selection of the working mode and then guides the program into the needed functionality.

## SQL Answers
### 1.  Rewrite the SQL without subquery:
```SQL SELECT id
  FROM USERS AS usertable
    JOIN departments AS deptable
      ON deptable.user_id = usertable.id
WHERE department_id !=1;
```
### 2.  Write a SQL query to find all duplicate lastnames in a table named  **user**
```SQL SELECT lastname, COUNT(lastname)
FROM USERS
GROUP BY lastname
HAVING COUNT(lastname) > 1;
```
### 3. Write a SQL query to get a username from the  **user**  table with the second highest salary from  **salary**  tables. Show the username and it's salary in the result.
```SQL SELECT USERTABLE.username, SALARYTABLE.salary
  FROM salary AS SALARYTABLE
       INNER JOIN user AS USERTABLE
          ON SALARYTABLE.user_id = USERTABLE.id
 ORDER
    BY SALARYTABLE.salary DESC
LIMIT 1 OFFSET 1;
```
## Algorithms & Datastructre
### 1.  Optimization of the Python code snippet:
```python
from collections import Counter
def count_connections(list1: list, list2: list) -> int:
    counter1 = Counter(list1)
    counter2 = Counter(list2)
    l1 = set(list1)
    intersections = l1.intersection(list2)
    sum = 0
  for i in intersections:
        sum += int(counter1[i]) * int(counter2[i])
    return sum
```
### 2.  Given a string  `s`, find the length of the longest substring without repeating characters. Analyze your solution and please provide Space and Time complexities.
```python
def findLongestSubstring(string):
    if len(string) == 0:
        return 0
  n = len(string)
    # starting point of current substring.
  st = 0
  # maximum length substring without
 # repeating characters.  maxlen = 0
  # starting index of maximum
 # length substring.  start = 0
  # Hash Map to store last occurrence
 # of each already visited character.  pos = {}
    # Last occurrence of first
 # character is index 0  pos[string[0]] = 0
  for i in range(1, n):
        # If this character is not present in hash,
 # then this is first occurrence of this # character, store this in hash.  if string[i] not in pos:
            pos[string[i]] = i
        else:
            # If this character is present in hash then
 # this character has previous occurrence, # check if that occurrence is before or after # starting point of current substring.  if pos[string[i]] >= st:

                # find length of current substring and
 # update maxlen and start accordingly.  currlen = i - st
                if maxlen < currlen:
                    maxlen = currlen
                    start = st
                # Next substring will start after the last
 # occurrence of current character to avoid # its repetition.  st = pos[string[i]] + 1
  # Update last occurrence of
 # current character.  pos[string[i]] = i
    # Compare length of last substring with maxlen
 # and update maxlen and start accordingly.  if maxlen < i - st:
        maxlen = i - st
        start = st
    # The required longest substring without
 # repeating characters is from string[start] # to string[start+maxlen-1].  return string[start: start + maxlen]
```
**Time Complexity:** O(n)
**Auxiliary Space:** O(n)
### 3.  Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
```python
def binary_search(arr: list, low, high, target):
    if target < arr[0]:
        return 0
  elif target > arr[-1]:
        return len(arr)
    # Check base case
  if high >= low:
        mid = (high + low) // 2
  # If element is present at the middle itself
  if arr[mid] == target:
            return mid
        # If element is smaller than mid, then it can only
 # be present in left subarray  elif arr[mid] > target:
            return binary_search(arr, low, mid - 1, target)
        # Else the element can only be present in right subarray
  else:
            return binary_search(arr, mid + 1, high, target)
    else:
        # Element is not present in the array, return the index where it should've been
  return high + 1
```
```python
def linear_search(list1: list, target):
    if target < list1[0]:
        return 0
  for i in range(len(list1)):
        if target == list1[i]:
            return i
        elif target < list1[i]:
            return i
    else:
        return len(list1)
```
## Linux Adminstration
### 1.  List processes listening on ports 80 and 443
```bash
sudo netstat -tnlp | grep :443
sudo netstat -tnlp | grep :80
```
### 2.  List process environment variables by given PID
```bash
cat /proc/[process ID]/environ | tr '\0' '\n'
```
### 3.  Launch a python program  `my_program.py`  through CLI in the background. How would you close it after some period of time?
```bash
nohup ./my_program.py &
ps -ef | grep my_program.py
kill -9 [PID]
```



