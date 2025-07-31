const testcases = {
  testcase1: { input: [[3, 2, 3]], expected: 3 },
  testcase2: { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
  testcase3: { input: [[1]], expected: 1 },
  testcase4: { input: [[6, 6, 6, 7, 7]], expected: 6 },
  testcase5: { input: [[9, 9, 9, 9, 3, 3]], expected: 9 },
  testcase6: { input: [[-1, -1, -1, 0, 1]], expected: -1 },
  testcase7: { input: [[1000000, 1000000, 2, 3, 1000000]], expected: 1000000 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = majorityElement(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
