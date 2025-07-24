# Divide Two Integers

Given two integers `dividend` and `divisor`, divide them **without** using multiplication, division, or modulo operators.

The result of integer division should **truncate toward zero**, meaning any fractional part should be discarded.  
For example:

- `8.345` becomes `8`
- `-2.7335` becomes `-2`

Return the **quotient** after dividing `dividend` by `divisor`.

Note: The result must be within the **32-bit signed integer** range:

- If result > 2³¹ - 1, return 2³¹ - 1
- If result < -2³¹, return -2³¹

### Example 1

```text
Input: dividend = 10, divisor = 3
Output: 3

Explanation: 10 / 3 = 3.333..., truncated to 3.
```

### Example 2

```text
Input: dividend = 7, divisor = -3
Output: -2

Explanation: 7 / -3 = -2.333..., truncated to -2.
```

### Constraints

- `-2³¹ <= dividend, divisor <= 2³¹ - 1`
- `divisor != 0`
