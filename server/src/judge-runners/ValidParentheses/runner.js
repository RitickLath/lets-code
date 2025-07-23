const testcases = {
  testcase1: { input: ["()[]{}"], expected: true },
  testcase2: { input: ["(]"], expected: false },
  testcase3: { input: ["({[]})"], expected: true },
  testcase4: { input: ["(())[]{[{}]}"], expected: true },
  testcase5: { input: ["["], expected: false },
  testcase6: { input: ["(()"], expected: false },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];

  const result = isValid(...input);
  const passed = result === expected;

  console.log(`${t}: ${passed ? "Passed" : "Failed"}`);
}
