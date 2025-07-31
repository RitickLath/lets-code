const testcases = {
  testcase1: { input: [["flower", "flow", "flight"]], expected: "fl" },
  testcase2: { input: [["dog", "racecar", "car"]], expected: "" },
  testcase3: {
    input: [["interspace", "internet", "internal"]],
    expected: "inte",
  },
  testcase4: { input: [["a"]], expected: "a" },
  testcase5: { input: [["ab", "a"]], expected: "a" },
  testcase6: { input: [["", "b"]], expected: "" },
  testcase7: { input: [["reflower", "flow", "flight"]], expected: "" },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];
  const result = longestCommonPrefix(...input);
  console.log(`${t}: ${result === expected ? "Passed" : "Failed"}`);
}
