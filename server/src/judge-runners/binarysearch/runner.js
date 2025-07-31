const testcases = {
  testcase1: { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
  testcase2: { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
  testcase3: { input: [[1], 1], expected: 0 },
  testcase4: { input: [[1, 2, 3, 4, 5], 4], expected: 3 },
  testcase5: { input: [[10, 20, 30, 40, 50], 10], expected: 0 },
  testcase6: { input: [[10, 20, 30, 40, 50], 50], expected: 4 },
  testcase7: { input: [[1, 3, 5, 7, 9], 8], expected: -1 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = binarySearch(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
