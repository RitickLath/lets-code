const testcases = {
  testcase1: { input: [[3, 2, 2, 3], 3], expected: 2 },
  testcase2: { input: [[0, 1, 2, 2, 3, 0, 4, 2], 2], expected: 5 },
  testcase3: { input: [[1, 2, 3, 4], 5], expected: 4 },
  testcase4: { input: [[5, 5, 5, 5], 5], expected: 0 },
  testcase5: { input: [[1, 2, 2, 1, 3], 1], expected: 3 },
  testcase6: { input: [[], 1], expected: 0 },
  testcase7: { input: [[2], 2], expected: 0 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const copy = [...input[0]]; // clone to preserve original array
  const result = removeElement(copy, input[1]);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
