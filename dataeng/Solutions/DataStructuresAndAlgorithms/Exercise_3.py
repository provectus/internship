# Exercise 3

# The idea behing the implementation is general binary search
#
# Time Complexity: T(n) = O(log(n)), n = len(nums)
#
# (The problem can also be implemented by a simple linear search,
# but O(n) is much slower than O(log(n)) on bigger list sizes)

def index_in_the_list(nums: list, target: int) -> int:
    left = 0
    right = len(nums) - 1

    # Special cases
    if target > nums[-1]:
        return len(nums)
    elif target < nums[0]:
        return 0

    while left < right:
        mid = int((right + left) / 2)
        if nums[mid] == target:
            return mid
        elif nums[mid] > target:
            right = mid - 1
        else:
            left = mid + 1

    return left
