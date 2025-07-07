export const codeSnippets = {
  java: `// Java - Binary Search (Recursive)
public class BinarySearch {
    static int binarySearch(int[] arr, int low, int high, int target) {
        if (high >= low) {
            int mid = (low + high) / 2;
            if (arr[mid] == target)
                return mid;
            if (arr[mid] > target)
                return binarySearch(arr, low, mid - 1, target);
            return binarySearch(arr, mid + 1, high, target);
        }
        return -1;
    }
}`,
  javascript: `// JavaScript - Binary Search (Recursive)
function binarySearch(arr, low, high, target) {
    if (high >= low) {
        const mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] > target)
            return binarySearch(arr, low, mid - 1, target);
        return binarySearch(arr, mid + 1, high, target);
    }
    return -1;
}`,
  python: `# Python - Binary Search (Recursive)
def binary_search(arr, low, high, target):
    if high >= low:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] > target:
            return binary_search(arr, low, mid - 1, target)
        else:
            return binary_search(arr, mid + 1, high, target)
    return -1`,
};
