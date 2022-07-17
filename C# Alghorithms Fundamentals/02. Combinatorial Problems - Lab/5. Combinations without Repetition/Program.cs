using System;

namespace _5._Combinations_without_Repetition
{
    internal class Program
    {
        static int k;
        static string[] elements;
        static string[] combinations;

        static void Main(string[] args)
        {
            elements = Console.ReadLine().Split();
            k = int.Parse(Console.ReadLine());
            combinations = new string[k];

            Combinations();
        }

        private static void Combinations(int index = 0, int startIndex = 0)
        {
            if (index >= combinations.Length)
            {
                Console.WriteLine(String.Join(" ", combinations));
                return;
            }

            for (int i = startIndex; i < elements.Length; i++)
            {
                combinations[index] = elements[i];
                Combinations(index + 1, i + 1);
            }
        }
    }
}
