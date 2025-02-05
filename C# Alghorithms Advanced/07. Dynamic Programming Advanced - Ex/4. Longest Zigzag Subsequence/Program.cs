﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace _4._Longest_Zigzag_Subsequence
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var numbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var dp = new int[2, numbers.Length];
            dp[0, 0] = dp[1, 0] = 1;

            var parent = new int[2, numbers.Length];
            parent[0, 0] = parent[1, 0] = -1;

            var bestLen = 0;
            var lastRow = 0;
            var lastCol = 0;

            for (int current = 1; current < numbers.Length; current++)
            {
                var currentNum = numbers[current];
                for (int prev = current - 1; prev >= 0; prev--)
                {
                    var prevNum = numbers[prev];

                    if (currentNum > prevNum
                        && dp[1, prev] + 1 >= dp[0, current])
                    {
                        dp[0, current] = dp[1, prev] + 1;
                        parent[0, current] = prev;
                    }

                    if (prevNum > currentNum
                        && dp[0, prev] + 1 >= dp[1, current])
                    {
                        dp[1, current] = dp[0, prev] + 1;
                        parent[1, current] = prev;
                    }
                }

                if (dp[0, current] > bestLen)
                {
                    bestLen = dp[0, current];
                    lastRow = 0;
                    lastCol = current;
                }
                if (dp[1, current] > bestLen)
                {
                    bestLen = dp[1, current];
                    lastRow = 1;
                    lastCol = current;
                }
            }

            var longestZigzagSequence = new Stack<int>();
            while (lastCol != -1)
            {
                longestZigzagSequence.Push(numbers[lastCol]);
                lastCol = parent[lastRow, lastCol];
                lastRow = lastRow == 0 ? 1 : 0;
            }

            Console.WriteLine(String.Join(" ", longestZigzagSequence));
        }
    }
}
