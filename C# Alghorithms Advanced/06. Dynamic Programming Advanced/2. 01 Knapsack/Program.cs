using System;
using System.Collections.Generic;

namespace _2._01_Knapsack
{
    class Item
    {
        public string Name { get; set; }
        public int Weight { get; set; }
        public int Value { get; set; }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            int maxCapacity = int.Parse(Console.ReadLine());
            var items = new List<Item>();

            while (true)
            {
                string line = Console.ReadLine();

                if (line == "end")
                {
                    break;
                }

                var itemArgs = line.Split();

                items.Add(new Item
                {
                    Name = itemArgs[0],
                    Weight = int.Parse(itemArgs[1]),
                    Value = int.Parse(itemArgs[2])
                });
            }

            var dp = new int[items.Count + 1, maxCapacity + 1];
            var used = new bool[items.Count + 1, maxCapacity + 1];

            for (int row = 1; row < dp.GetLength(0); row++)
            {
                int index = row - 1;
                var item = items[index];

                for (int capacity = 1; capacity < dp.GetLength(1); capacity++)
                {
                    var excluding = dp[row - 1, capacity];

                    if (item.Weight > capacity)
                    {
                        dp[row, capacity] = excluding;
                        continue;
                    }

                    var including = item.Value + dp[row - 1, capacity - item.Weight];

                    if (including > excluding)
                    {
                        dp[row, capacity] = including;
                        used[row, capacity] = true;
                    }
                    else
                    {
                        dp[row, capacity] = excluding;
                    }
                }
            }

            var currentCapacity = maxCapacity;
            var itemsToGet = new SortedSet<string>();

            for (int row = dp.GetLength(0) - 1; row > 0; row--)
            {
                if (used[row, currentCapacity])
                {
                    var item = items[row - 1];

                    if (currentCapacity - item.Weight < 0)
                    {
                        break;
                    }

                    currentCapacity -= item.Weight;
                    itemsToGet.Add(item.Name);
                }
            }

            Console.WriteLine($"Total Weight: {maxCapacity - currentCapacity}");
            Console.WriteLine($"Total Value: {dp[items.Count, maxCapacity]}");
            Console.WriteLine(String.Join("\n", itemsToGet));
        }
    }
}
