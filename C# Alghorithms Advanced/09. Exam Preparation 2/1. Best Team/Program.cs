using System;
using System.Collections.Generic;
using System.Linq;

namespace _1._Best_Team
{
    class Program
    {
        static void Main(string[] args)
        {
            var numbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var lis = LIS(numbers);
            var lds = LIS(numbers.Reverse().ToArray()).Reverse();

            Console.WriteLine(String.Join(" ", lis.Count > lds.Count()
                ? lis
                : lds));
        }

        private static Stack<int> LIS(IList<int> numbers)
        {
            var length = new int[numbers.Count];
            var parent = new int[numbers.Count];
            int bestLength = 1;
            int bestIdx = 0;

            for (int current = 0; current < numbers.Count; current++)
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

            return lis;
        }
    }
}

/* 80/100 points solution
 static void Main(string[] args)
        {
            var numbers = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var length = new int[2, numbers.Length];
            length[0, 0] = length[1, 0] = 1;

            var parent = new int[2, numbers.Length];
            parent[0, 0] = parent[1, 0] = -1;

            int ascLength = 1;
            int descLength = 1;

            int ascIdx = 0;
            int descIdx = 0;

            for (int current = 1; current < numbers.Length; current++)
            {
                var currentNumber = numbers[current];

                var currentAscLength = 1;
                var currentDescLength = 1;

                var currentAscParent = -1;
                var currentDescParent = -1;

                for (int prev = current - 1; prev >= 0; prev--)
                {
                    var prevNumber = numbers[prev];

                    var prevAscLength = length[0, prev];
                    var prevDescLength = length[1, prev];

                    if (currentNumber > prevNumber
                       && prevAscLength + 1 >= currentAscLength)
                    {
                        currentAscLength = prevAscLength + 1;
                        currentAscParent = prev;
                    }

                    if (currentNumber < prevNumber
                       && prevDescLength + 1 >= currentDescLength)
                    {
                        currentDescLength = prevDescLength + 1;
                        currentDescParent = prev;
                    }
                }

                length[0, current] = currentAscLength;
                length[1, current] = currentDescLength;

                parent[0, current] = currentAscParent;
                parent[1, current] = currentDescParent;

                if (currentAscLength > ascLength)
                {
                    ascLength = currentAscLength;
                    ascIdx = current;
                }

                if (currentDescLength > descLength)
                {
                    descLength = currentDescLength;
                    descIdx = current;
                }
            }

            var lis = new Stack<int>();
            if (ascLength > descLength)
            {
                while (ascIdx != -1)
                {
                    lis.Push(numbers[ascIdx]);
                    ascIdx = parent[0, ascIdx];
                }
            }
            else
            {
                while (descIdx != -1)
                {
                    lis.Push(numbers[descIdx]);
                    descIdx = parent[1, descIdx];
                }
            }

            Console.WriteLine(String.Join(" ", lis));
        }
*/