using System;
using System.Collections.Generic;

namespace _2._Subset_Sum // NOT IN DOC OR JUDGE
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // without repetition
            int[] nums = { 3, 5, 1, 4, 2 };
            int target = 13;

            var possibleSums = GetPossibleSumsWithoutRepetition(nums);
            if (possibleSums.ContainsKey(target))
            {
                var subset = FindSubsetWithoutRepetition(possibleSums, target);
                Console.WriteLine(String.Join(", ", subset));
            }
            else
            {
                Console.WriteLine("Sum is not possible.");
            }

            // with repetition
            int[] repetitionNums = new int[] { 2, 3 };
            int repetitionTarget = 21;

            Console.WriteLine(IsSumPossibleWithRepetition(repetitionNums, repetitionTarget));
            Console.WriteLine(String.Join(", ", FindSubsetWithRepetition(repetitionNums, repetitionTarget)));
        }

        // without repetition
        private static List<int> FindSubsetWithoutRepetition(Dictionary<int, int> sums, int target)
        {
            var subset = new List<int>();

            while (target > 0)
            {
                subset.Add(sums[target]);
                target -= sums[target];
            }

            return subset;
        }

        private static Dictionary<int, int> GetPossibleSumsWithoutRepetition(int[] nums) // or with hashset if only .Contains matters
        {
            var sums = new Dictionary<int, int> { { 0, 0 } };

            foreach (int num in nums)
            {
                int[] currentSums = new int[sums.Keys.Count];
                sums.Keys.CopyTo(currentSums, 0);

                foreach (var sum in currentSums)
                {
                    var newSum = sum + num;

                    if (sums.ContainsKey(newSum))
                    {
                        continue;
                    }

                    sums.Add(newSum, num);
                }
            }

            return sums;
        }

        // with repetition
        private static bool IsSumPossibleWithRepetition(int[] nums, int target)
        {
            bool[] possibleSums = new bool[target + 1];
            possibleSums[0] = true;

            for (int sum = 0; sum < possibleSums.Length; sum++)
            {
                if (!possibleSums[sum])
                {
                    continue;
                }

                foreach (var num in nums)
                {
                    var newSum = num + sum;

                    if (newSum > target)
                    {
                        continue;
                    }

                    possibleSums[newSum] = true;
                }
            }

            return possibleSums[target];
        }

        private static List<int> FindSubsetWithRepetition(int[] nums, int target)
        {
            List<int> subset = new List<int>();

            bool[] possibleSums = new bool[target + 1];
            possibleSums[0] = true;

            for (int sum = 0; sum < possibleSums.Length; sum++)
            {
                if (!possibleSums[sum])
                {
                    continue;
                }

                foreach (var num in nums)
                {
                    var newSum = num + sum;

                    if (newSum > target)
                    {
                        continue;
                    }

                    possibleSums[newSum] = true;
                }
            }

            while (target > 0)
            {
                foreach (int num in nums)
                {
                    int prevSum = target - num;
                    if (prevSum >= 0 && possibleSums[prevSum])
                    {
                        subset.Add(num);
                        target = prevSum;
                    }
                }
            }

            return subset;
        }
    }
}
