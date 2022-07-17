using System;
using System.Collections.Generic;

namespace _2._Nested_Loops_To_Recursion
{
    internal class Program
    {
        static int[] arr;
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            arr = new int[n];

            PermuteTo(n);
        }

        private static void PermuteTo(int n, int index = 0)
        {
            if (index >= arr.Length)
            {
                Console.WriteLine(String.Join(" ", arr));
                return;
            }

            for (int i = 1; i <= n; i++)
            {
                arr[index] = i;
                PermuteTo(n, index + 1);
            }
        }
    }
}
