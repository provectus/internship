from collections import Counter
import numpy as np


list1 = list(np.round(np.random.rand(100)*3))
list2 = list(np.round(np.random.rand(100)*3))


def count_connections(list1: list, list2: list) -> int:
    counter1 = Counter(list1)
    counter2 = Counter(list2)
    l1 = set(list1)
    intersections = l1.intersection(list2)
    sum = 0
    for i in intersections:
        sum += int(counter1[i]) * int(counter2[i])
    return sum


def findLongestSubstring(string):
    if len(string) == 0:
        return 0
    n = len(string)
    # starting point of current substring.
    st = 0
    # maximum length substring without
    # repeating characters.
    maxlen = 0
    # starting index of maximum
    # length substring.
    start = 0
    # Hash Map to store last occurrence
    # of each already visited character.
    pos = {}
    # Last occurrence of first
    # character is index 0
    pos[string[0]] = 0
    for i in range(1, n):
        # If this character is not present in hash,
        # then this is first occurrence of this
        # character, store this in hash.
        if string[i] not in pos:
            pos[string[i]] = i
        else:
            # If this character is present in hash then
            # this character has previous occurrence,
            # check if that occurrence is before or after
            # starting point of current substring.
            if pos[string[i]] >= st:

                # find length of current substring and
                # update maxlen and start accordingly.
                currlen = i - st
                if maxlen < currlen:
                    maxlen = currlen
                    start = st
                # Next substring will start after the last
                # occurrence of current character to avoid
                # its repetition.
                st = pos[string[i]] + 1
            # Update last occurrence of
            # current character.
            pos[string[i]] = i
    # Compare length of last substring with maxlen
    # and update maxlen and start accordingly.
    if maxlen < i - st:
        maxlen = i - st
        start = st
    # The required longest substring without
    # repeating characters is from string[start]
    # to string[start+maxlen-1].
    return string[start: start + maxlen]


string = "abcabcbb"
print(findLongestSubstring(string))
string = "bbbbb"
print(findLongestSubstring(string))
string = "pwwkew"
print(findLongestSubstring(string))
string = ""
print(findLongestSubstring(string))


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


# Returns index of x in arr if present, else -1
def binary_search(arr, low, high, target):
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
        # be present in left subarray
        elif arr[mid] > target:
            return binary_search(arr, low, mid - 1, target)
        # Else the element can only be present in right subarray
        else:
            return binary_search(arr, mid + 1, high, target)
    else:
        # Element is not present in the array, return the index where it should've been
        return high + 1


# Test array
arr = [1, 2, 3, 4, 5, 6, 7, 10, 15]



result = binary_search(arr, 0, len(arr) - 1, 4.5)
idx = linear_search(arr, 2)
print(idx, result)

