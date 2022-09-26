using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._The_Tyrant
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] numbers = Console.ReadLine().Split().Select(int.Parse).ToArray();

            Console.WriteLine(FindMinSumOfSequence(numbers));
        }

        private static int FindMinSumOfSequence(int[] numbers)
        {
            int n = numbers.Length;
            int[] arr = new int[n];

            if (n <= 4)
            {
                return numbers.Min();
            }

            for (int i = 0; i < 4; i++)
            {
                arr[i] = numbers[i];
            }

            for (int i = 4; i < n; i++)
            {
                arr[i] = numbers[i] + arr[(i - 4)..i].Min();
            }


            return arr[(n - 4)..n].Min();
        }
    }
}
