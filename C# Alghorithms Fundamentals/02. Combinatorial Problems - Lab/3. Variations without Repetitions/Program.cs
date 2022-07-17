using System;

namespace _3._Variations_without_Repetitions
{
    internal class Program
    {
        static int k;
        static string[] elements;
        static string[] variations;
        static bool[] used;

        static void Main(string[] args)
        {
            elements = Console.ReadLine().Split();
            k = int.Parse(Console.ReadLine());
            variations = new string[k];
            used = new bool[elements.Length];

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
                if (!used[i])
                {
                    used[i] = true;

                    variations[index] = elements[i];
                    Variations(index + 1);

                    used[i] = false;
                }
            }
        }
    }
}
