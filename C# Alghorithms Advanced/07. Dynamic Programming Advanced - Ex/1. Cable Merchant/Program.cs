using System;
using System.Linq;

namespace _1._Cable_Merchant
{
    internal class Program
    {
        static int[] bestPrices;

        static void Main(string[] args)
        {
            var prices = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var connectorPrice = int.Parse(Console.ReadLine());

            bestPrices = new int[prices.Length + 1];

            for (int length = 1; length <= prices.Length; length++)
            {
                CutRod(prices, connectorPrice, length);
            }

            Console.WriteLine(String.Join(" ", bestPrices.Skip(1)));

        }

        private static int CutRod(int[] prices, int connectorPrice, int length)
        {
            if (length == 0)
            {
                return 0;
            }
            if (bestPrices[length] != 0)
            {
                return bestPrices[length] - connectorPrice;
            }

            int bestPrice = prices[length - 1];

            for (int i = 1; i < length; i++)
            {
                var price = prices[i - 1]
                    + CutRod(prices, connectorPrice, length - i)
                    - connectorPrice;

                if (price > bestPrice)
                {
                    bestPrice = price;
                }
            }

            bestPrices[length] = bestPrice;
            return bestPrice;
        }
    }
}
