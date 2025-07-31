# Plus One

You are given a large integer represented as an array `digits`, where each `digits[i]` is the i-th digit of the integer (most significant to least significant).

- The large integer does **not contain any leading 0's**.
- Increment the large integer by one and return the resulting array of digits.

### Example 1

```text
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: 123 + 1 = 124
```

### Example 2

```text
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: 4321 + 1 = 4322
```

### Example 3

```text
Input: digits = [9]
Output: [1,0]
Explanation: 9 + 1 = 10
```

### Constraints

- `1 <= digits.length <= 100`
- `0 <= digits[i] <= 9`
- `digits` does not contain any **leading 0's**
