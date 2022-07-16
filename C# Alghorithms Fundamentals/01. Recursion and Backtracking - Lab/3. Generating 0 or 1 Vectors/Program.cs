using System;

namespace _3._Generating_0_or_1_Vectors
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int[] vectors = new int[n];

            GenerateVectors(vectors);
        }

        static void GenerateVectors(int[] arr, int index = 0)
        {
            if (index >= arr.Length)
            {
                Console.WriteLine(string.Join("", arr));
                return;
            }

            for (int i = 0; i <= 1; i++)
            {
                arr[index] = i;

                GenerateVectors(arr, index + 1);
            }
        }
    }
}
