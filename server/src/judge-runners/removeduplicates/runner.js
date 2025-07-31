const testcases = {
  testcase1: { input: [[1, 1, 2]], expected: 2 },
  testcase2: { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 },
  testcase3: { input: [[1, 2, 3]], expected: 3 },
  testcase4: { input: [[1, 1, 1, 1]], expected: 1 },
  testcase5: { input: [[-1, 0, 0, 0, 0, 3, 3]], expected: 3 },
  testcase6: { input: [[1]], expected: 1 },
  testcase7: { input: [[-100, -100, -99, -99, 0, 0, 100]], expected: 4 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const copy = [...input[0]]; // preserve original for in-place operations
  const result = removeDuplicates(copy);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
