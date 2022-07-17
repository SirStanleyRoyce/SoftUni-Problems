using System;
using System.Collections.Generic;

namespace _1._Reverse_Array
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] arr = Console.ReadLine().Split();

            ReverseArray(arr);
        }

        private static void ReverseArray(string[] arr, int i = 0)
        {
            if (i >= arr.Length / 2)
            {
                Console.WriteLine(String.Join(" ", arr));
                return;
            }

            Swap(arr, i, arr.Length - 1 - i);
            ReverseArray(arr, i + 1);
        }

        private static void Swap<T>(IList<T> arr, int f, int s)
        {
            T temp = arr[f];
            arr[f] = arr[s];
            arr[s] = temp;
        }
    }
}
