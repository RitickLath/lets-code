const testcases = {
  testcase1: { input: [[1, 2, 3]], expected: [1, 2, 4] },
  testcase2: { input: [[4, 3, 2, 1]], expected: [4, 3, 2, 2] },
  testcase3: { input: [[9]], expected: [1, 0] },
  testcase4: { input: [[9, 9, 9]], expected: [1, 0, 0, 0] },
  testcase5: { input: [[0]], expected: [1] },
  testcase6: { input: [[2, 9, 9]], expected: [3, 0, 0] },
  testcase7: { input: [[1, 0, 0]], expected: [1, 0, 1] },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = plusOne(...input);
  const isEqual =
    result.length === expected.length &&
    result.every((val, idx) => val === expected[idx]);
  console.log(`${t}: ${isEqual ? "Passed" : "Failed"}`);
}
