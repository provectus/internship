# Exercise 1

# Assuming len(list1) = n, len(list2) = m:
# Initial time complexity O(n * m)
# Obtained time complexity O(n + m) on average

def count_connections(list1: list, list2: list) -> int:
    count = 0

    list2_dict = {}
    for element in list2:
        if element in list2_dict:
            list2_dict[element] += 1
        else:
            list2_dict[element] = 1

    for element in list1:
        count += list2_dict.get(element) if element in list2_dict else 0

    return count
