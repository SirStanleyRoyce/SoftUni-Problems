using System;
using System.Linq;

namespace _3._Road_Trip
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var values = Console.ReadLine()
                .Split(", ")
                .Select(int.Parse)
                .ToArray();

            var weights = Console.ReadLine()
                .Split(", ")
                .Select(int.Parse)
                .ToArray();

            var freeSpace = int.Parse(Console.ReadLine());

            var dp = new int[values.Length + 1, freeSpace + 1];

            for (int itemIdx = 1; itemIdx < dp.GetLength(0); itemIdx++)
            {
                var currentValue = values[itemIdx - 1];
                var currentWeight = weights[itemIdx - 1];

                for (int space = 1; space < dp.GetLength(1); space++)
                {
                    var excluding = dp[itemIdx - 1, space];

                    if (space < currentWeight)
                    {
                        dp[itemIdx, space] = excluding;
                        continue;
                    }

                    var including = currentValue + dp[itemIdx - 1, space - currentWeight];

                    dp[itemIdx, space] = Math.Max(excluding, including);
                }
            }

            Console.WriteLine("Maximum value: " + dp[
                dp.GetLength(0) - 1,
                dp.GetLength(1) - 1]);
        }
    }
}
