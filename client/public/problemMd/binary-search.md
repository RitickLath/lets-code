# Binary Search

Given an array of integers `nums` which is **sorted in ascending order**, and an integer `target`, return the **index** if the target is found.  
If not, return `-1`.

You must write an algorithm with **O(log n)** runtime complexity.

### Example 1

```text
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

### Example 2

```text
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

### Constraints

- `1 <= nums.length <= 10⁴`
- `-10⁴ < nums[i], target < 10⁴`
- All the integers in `nums` are **unique**
- `nums` is sorted in **ascending order**
