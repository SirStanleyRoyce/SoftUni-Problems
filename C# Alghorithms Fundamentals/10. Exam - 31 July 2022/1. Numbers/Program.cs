using System;
using System.Linq;
using System.Collections.Generic;

namespace _1._Numbers
{
    internal class Program
    {
        static HashSet<string> sums = new HashSet<string>();

        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());

            FindSums(n);
        }

        private static void FindSums(int target)
        {
            int current = target;
            List<int> numbers = new List<int>();

            GenSums(target, current, numbers);

            Console.WriteLine(String.Join("\n", sums));
        }
        
        private static void GenSums(int target, int current, List<int> numbers)
        {
            if (numbers.Sum() >= target)
            {
                sums.Add(String.Join(" + ", numbers));
                numbers.Clear();
                return;
            }


            for (int i = current; i > 0; i--)
            {
                int sum = numbers.Sum();

                if (sum == 0 && current + i < target)
                {
                    numbers.Add(current);
                    numbers.Add(i);
                    GenSums(target, i, numbers);
                    numbers.Remove(i);
                    continue;
                }
                else if (sum + i < target)
                {
                    numbers.Add(i);
                    GenSums(target, i, numbers);
                    numbers.Remove(i);
                    continue;
                }
                else if (sum + i == target)
                {
                    numbers.Add(i);
                    sums.Add(String.Join(" + ", numbers));
                    numbers.Remove(i);
                }
            }
        }
    }
}
