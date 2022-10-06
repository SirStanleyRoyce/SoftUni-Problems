using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Longest_String_Chain
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var words = Console.ReadLine().Split();

            var length = new int[words.Length];
            var parent = new int[words.Length];

            int bestLength = 1;
            int lastIdx = 0;

            for (int current = 0; current < words.Length; current++)
            {
                var currentWord = words[current];
                var currentLength = 1;
                var currentParent = -1;

                for (int prev = current - 1; prev >= 0; prev--)
                {
                    var prevWord = words[prev];
                    var prevLength = length[prev];

                    if (currentWord.Length > prevWord.Length
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
                    lastIdx = current;
                }
            }

            var lis = new Stack<string>();

            while (lastIdx != -1)
            {
                lis.Push(words[lastIdx]);
                lastIdx = parent[lastIdx];
            }

            Console.WriteLine(String.Join(" ", lis));
        }
    }
}
