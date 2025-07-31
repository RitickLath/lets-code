# Remove Duplicates from Sorted Array

Given an integer array `nums` sorted in non-decreasing order, remove the duplicates **in-place** such that each unique element appears only once. The **relative order** of the elements should be kept the same. Then return the number of unique elements in `nums`.

- Consider the number of unique elements of `nums` to be `k`.
- You must modify the input array `nums` such that the first `k` elements contain the unique elements.
- The remaining elements are not important.

### Example 1

```text
Input: nums = [1,1,2]
Output: 2, nums = [1,2,_]
```

### Example 2

```text
Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4,_,_,_,_,_]
```

### Constraints

- `1 <= nums.length <= 3 * 10⁴`
- `-100 <= nums[i] <= 100`
- `nums` is sorted in **non-decreasing** order.
