const testcases = {
  testcase1: {
    input: [
      [1, 2, 3],
      [2, 5, 6],
    ],
    expected: [1, 2, 2, 3, 5, 6],
  },
  testcase2: { input: [[], [1, 2, 3]], expected: [1, 2, 3] },
  testcase3: { input: [[1, 4], []], expected: [1, 4] },
  testcase4: {
    input: [
      [2, 2, 2],
      [2, 2],
    ],
    expected: [2, 2, 2, 2, 2],
  },
  testcase5: { input: [[], []], expected: [] },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];

  const result = mergeSortedArrays(...input);
  const passed = JSON.stringify(result) === JSON.stringify(expected);

  console.log(`${t}: ${passed ? "Passed" : "Failed"}`);
}
