using System;
using System.Linq;

namespace _2._Battle_Points
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var enemyStrength = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var enemyBP = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            int maxBP = int.Parse(Console.ReadLine());

            var dp = new int[enemyStrength.Length + 1, maxBP + 1];

            for (int row = 1; row < dp.GetLength(0); row++)
            {
                var currentEnemyStr = enemyStrength[row - 1];
                var currentEnemyBP = enemyBP[row - 1];

                for (int currentStr = 1; currentStr < dp.GetLength(1); currentStr++)
                {
                    var excluding = dp[row - 1, currentStr];

                    if (currentEnemyStr > currentStr)
                    {
                        dp[row, currentStr] = excluding;
                        continue;
                    }

                    var including = currentEnemyBP + dp[row - 1, currentStr - currentEnemyStr];

                    dp[row, currentStr] = Math.Max(excluding, including);
                }
            }

            Console.WriteLine(dp[enemyStrength.Length, maxBP]);
        }
    }
}
