const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Array",
    difficulty: "Easy",
    solved: true,

    description: `
Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.
You may assume that each input would have exactly one solution.
`,

    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]"
      }
    ],

    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹"
    ],

    starterCode: `class Solution {
  public int[] twoSum(int[] nums, int target) {

  }
}`
  },

  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    topic: "String",
    difficulty: "Medium",
    solved: false,

    description: `
Given a string s, find the length of the longest
substring without repeating characters.
`,

    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3"
      },
      {
        input: 's = "bbbbb"',
        output: "1"
      }
    ],

    constraints: [
      "0 ≤ s.length ≤ 5 * 10⁴",
      "s consists of English letters, digits, symbols"
    ],

    starterCode: `class Solution {
  public int lengthOfLongestSubstring(String s) {

  }
}`
  },

  {
    id: 3,
    title: "Merge Intervals",
    topic: "Greedy",
    difficulty: "Medium",
    solved: false,

    description: `
Given an array of intervals where intervals[i] = [start, end],
merge all overlapping intervals.
`,

    examples: [
      {
        input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        output: "[[1,6],[8,10],[15,18]]"
      }
    ],

    constraints: [
      "1 ≤ intervals.length ≤ 10⁴",
      "intervals[i].length == 2"
    ],

    starterCode: `class Solution {
  public int[][] merge(int[][] intervals) {

  }
}`
  }
];

export default problemsData;
