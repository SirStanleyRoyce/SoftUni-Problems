using System;
using System.Linq;

namespace _1._Recursive_Array_Sum
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] arr = Console.ReadLine().Split().Select(int.Parse).ToArray();
            Console.WriteLine(Sum(arr));
        }

        static int Sum(int[] arr, int index = 0)
        {
            if (index == arr.Length - 1)
            {
                return arr[index];
            }

            return arr[index] + Sum(arr, index + 1);
        }
    }
}
