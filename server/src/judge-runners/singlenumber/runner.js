const testcases = {
  testcase1: { input: [[2, 2, 1]], expected: 1 },
  testcase2: { input: [[4, 1, 2, 1, 2]], expected: 4 },
  testcase3: { input: [[1]], expected: 1 },
  testcase4: { input: [[0, 1, 0]], expected: 1 },
  testcase5: { input: [[-1, -1, -2]], expected: -2 },
  testcase6: { input: [[100, 101, 100]], expected: 101 },
  testcase7: { input: [[3, 3, 7, 7, 5]], expected: 5 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = singleNumber(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
