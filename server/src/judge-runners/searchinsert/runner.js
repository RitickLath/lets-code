const testcases = {
  testcase1: { input: [[1, 3, 5, 6], 5], expected: 2 },
  testcase2: { input: [[1, 3, 5, 6], 2], expected: 1 },
  testcase3: { input: [[1, 3, 5, 6], 7], expected: 4 },
  testcase4: { input: [[1, 3, 5, 6], 0], expected: 0 },
  testcase5: { input: [[1], 0], expected: 0 },
  testcase6: { input: [[1], 2], expected: 1 },
  testcase7: { input: [[1, 3, 5, 6], 6], expected: 3 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = searchInsert(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
