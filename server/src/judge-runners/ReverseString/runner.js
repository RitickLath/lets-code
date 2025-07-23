const testcases = {
  testcase1: {
    input: [["h", "e", "l", "l", "o"]],
    expected: ["o", "l", "l", "e", "h"],
  },
  testcase2: { input: [["A", "b", "C"]], expected: ["C", "b", "A"] },
  testcase3: { input: [["x"]], expected: ["x"] },
  testcase4: { input: [["a", "b", "c", "d"]], expected: ["d", "c", "b", "a"] },
};

for (const t in testcases) {
  const { input, expected } = testcases[t];

  const copy = [...input[0]];
  reverseString(copy);

  const passed = JSON.stringify(copy) === JSON.stringify(expected);
  console.log(`${t}: ${passed ? "Passed" : "Failed"}`);
}
