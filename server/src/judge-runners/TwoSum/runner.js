const testcases = {
  testcase1: { input: [1, 0], expected: 6 },
  testcase2: { input: [2, 5], expected: 7 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = twoSum(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
