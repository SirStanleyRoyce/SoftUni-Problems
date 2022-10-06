using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Longest_Increasing_Subsequence
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var numbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var length = new int[numbers.Length];
            var parent = new int[numbers.Length];

            int bestLength = 1;
            int bestIdx = 0;

            for (int current = 0; current < numbers.Length; current++)
            {
                var currentNumber = numbers[current];
                var currentLength = 1;
                var currentParent = -1;

                for (int prev = current - 1; prev >= 0; prev--)
                {
                    var prevNumber = numbers[prev];
                    var prevLength = length[prev];

                    if (currentNumber > prevNumber
                       && prevLength + 1 >= currentLength)
                    {
                        currentLength = prevLength + 1;
                        currentParent = prev;
                    }
                }

                length[current] = currentLength;
                parent[current] = currentParent;

                if (currentLength > bestLength)
                {
                    bestLength = currentLength;
                    bestIdx = current;
                }
            }

            var lis = new Stack<int>();

            while (bestIdx != -1)
            {
                lis.Push(numbers[bestIdx]);
                bestIdx = parent[bestIdx];
            }

            Console.WriteLine(String.Join(" ", lis));
        }
    }
}
