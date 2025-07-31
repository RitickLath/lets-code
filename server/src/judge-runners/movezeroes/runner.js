const testcases = {
  testcase1: { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
  testcase2: { input: [[0]], expected: [0] },
  testcase3: { input: [[1, 0, 1]], expected: [1, 1, 0] },
  testcase4: {
    input: [[4, 2, 4, 0, 0, 3, 0, 5, 1, 0]],
    expected: [4, 2, 4, 3, 5, 1, 0, 0, 0, 0],
  },
  testcase5: { input: [[0, 0, 1]], expected: [1, 0, 0] },
  testcase6: { input: [[1, 2, 3, 4]], expected: [1, 2, 3, 4] },
  testcase7: { input: [[0, 0, 0]], expected: [0, 0, 0] },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const arr = [...input[0]]; // make a copy to preserve original
  moveZeroes(arr);
  const isEqual =
    arr.length === expected.length &&
    arr.every((val, idx) => val === expected[idx]);
  console.log(`${t}: ${isEqual ? "Passed" : "Failed"}`);
}
