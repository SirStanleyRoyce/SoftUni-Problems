using System;
using System.Linq;
using System.Collections.Generic;

namespace _5._School_Teams
{
    internal class Program
    {
        static HashSet<int> used = new HashSet<int>();

        static void Main(string[] args)
        {
            string[] girls = Console.ReadLine().Split(", ");
            string[] boys = Console.ReadLine().Split(", ");

            List<List<string>> girlsCombinations = new List<List<string>>();
            List<List<string>> boysCombinations = new List<List<string>>();

            Combinations(girls, girlsCombinations, new string[3]);
            used.Clear();

            Combinations(boys, boysCombinations, new string[2]);
            used.Clear();

            foreach (List<string> girlTeam in girlsCombinations)
            {
                foreach (List<string> boyTeam in boysCombinations)
                {
                    Console.WriteLine(String.Join(", ", girlTeam) + ", " + String.Join(", ", boyTeam));
                }
            }
        }

        private static void Combinations<T>(T[] source, List<List<T>> output, T[] arr, int index = 0, int startIndex = 0)
        {
            if (index >= arr.Length)
            {
                output.Add(arr.ToList());
                return;
            }

            for (int i = startIndex; i < source.Length; i++)
            {
                arr[index] = source[i];
                Combinations(source, output, arr, index + 1, i + 1);
            }
        }
    }
}
