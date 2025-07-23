let testcases = {
  testcase1: { input: [1, 4], expected: 6 },
  testcase2: { input: [2, 5], expected: 7 },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = TwoSum(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
