using System;
using System.Collections.Generic;

namespace _4._Cinema
{
    internal class Program
    {
        static List<Tuple<int, int>> preferences = new List<Tuple<int, int>>();
        static HashSet<int> busySeats = new HashSet<int>();
        static HashSet<int> nameWithPreferenceIndexes = new HashSet<int>();
        static HashSet<int> used = new HashSet<int>();
        static string[] names;
        static string[] order;

        static void Main(string[] args)
        {
            // read names
            names = Console.ReadLine().Split(", ");
            order = new string[names.Length];

            // read preferences
            while (true)
            {
                string[] input = Console.ReadLine().Split(" - ");
                string name = input[0];

                if (name == "generate")
                {
                    break;
                }

                int index = int.Parse(input[1]) - 1;

                int nameIndex = Array.IndexOf(names, name);

                preferences.Add(new Tuple<int, int>(nameIndex, index));
                busySeats.Add(index);
                nameWithPreferenceIndexes.Add(nameIndex);
            }

            Permute();
        }

        private static void Permute(int index = 0)
        {
            if (index >= order.Length)
            {
                Console.WriteLine(String.Join(" ", order));
                return;
            }

            // check for busy seat
            if (busySeats.Contains(index))
            {
                int nameIndex = preferences.Find(tuple => tuple.Item2 == index).Item1;
                order[index] = names[nameIndex];
                Permute(index + 1);
                return;
            }

            for (int i = 0; i < names.Length; i++)
            {
                if (!nameWithPreferenceIndexes.Contains(i) && !used.Contains(i)) // filter names with preferences and names that've been used
                {
                    used.Add(i);

                    order[index] = names[i];
                    Permute(index + 1);

                    used.Remove(i);
                }
            }
        }
    }
}
