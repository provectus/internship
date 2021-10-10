# Exercise 2

# The solution goes as follows:
#
# 1) Store two indices: left and right for our current substring
#    Store set of letters in current substring
#
# 2) Move right while it is less than the length of the string
#    and current letter (s[right]) is not met in the set
#
# 3) If we encounter the collision -> move left value and erase letters
#    from set until the current letter is not in the set
#
# 4) Update length of the longest substring if (right - left + 1) (== current_length)
#    is greater than the longest value
#
# Time Complexity:
# Assuming we have a perfect hash function for set:
# T(n) = O(n), where n is len(s)
#
# Space Complexity:
# Space complexity is indeed O(n), because at most we will store whole string 2 times:
# in the set and in the variable itself

def longest_substring(s: str) -> int:
    left = 0
    right = 0

    letters = set()

    longest_value = 0

    while right < len(s):
        while s[right] in letters:
            letters.discard(s[left])
            left += 1

        letters.add(s[right])
        longest_value = max(longest_value, right - left + 1)
        right += 1


    return longest_value
