# Two Sum

Given an array of integers `nums` and an integer `target`, return **indices of the two numbers** such that they add up to the target.

- You **may not use the same element twice**.
- You can return the answer in **any order**.
- You may assume that **exactly one valid solution** exists.

### Example 1

```text
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]

Explanation: nums[0] + nums[1] == 9 → 2 + 7 = 9
```

### Example 2

```text
Input: nums = [3, 2, 4], target = 6
Output: [1, 2]
```

### Example 3

```text
Input: nums = [3, 3], target = 6
Output: [0, 1]
```

### Constraints

- `2 <= nums.length <= 10⁴`
- `-10⁹ <= nums[i] <= 10⁹`
- `-10⁹ <= target <= 10⁹`
- **Only one valid answer exists.**

### Follow-up

Can you solve this in **less than O(n²)** time complexity?

> Hint: Use a hash map to store visited elements and their indices for quick lookups.
