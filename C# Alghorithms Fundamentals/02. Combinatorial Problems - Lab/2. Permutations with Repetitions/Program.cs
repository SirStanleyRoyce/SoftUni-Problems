using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Permutations_with_Repetitions
{
    internal class Program
    {
        private static string[] elements;

        static void Main(string[] args)
        {
            elements = Console.ReadLine().Split().ToArray();
            Permute();
        }

        static void Permute(int index = 0)
        {
            if (index >= elements.Length)
            {
                Console.WriteLine(String.Join(" ", elements));
                return;
            }

            Permute(index + 1);

            HashSet<string> used = new HashSet<string> { elements[index] };

            for (int i = index + 1; i < elements.Length; i++)
            {
                if (!used.Contains(elements[i]))
                {
                    Swap(index, i);
                    Permute(index + 1);
                    Swap(index, i);

                    used.Add(elements[i]);
                }
            }
        }

        static void Swap(int first, int second)
        {
            var temp = elements[first];
            elements[first] = elements[second];
            elements[second] = temp;

            // (elements[first], elements[second]) = (elements[second], elements[first]);
        }
    }
}
