using System;

namespace _4._Variations_with_Repetition
{
    internal class Program
    {
        static int k;
        static string[] elements;
        static string[] variations;

        static void Main(string[] args)
        {
            elements = Console.ReadLine().Split();
            k = int.Parse(Console.ReadLine());
            variations = new string[k];

            Variations();
        }

        private static void Variations(int index = 0)
        {
            if (index >= variations.Length)
            {
                Console.WriteLine(String.Join(" ", variations));
                return;
            }

            for (int i = 0; i < elements.Length; i++)
            {
                variations[index] = elements[i];
                Variations(index + 1);
            }
        }
    }
}
