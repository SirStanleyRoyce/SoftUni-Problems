using System;
using System.Collections.Generic;
using System.Linq;

namespace _1._Rod_Cutting
{
    internal class Program
    {
        static int[] bestPrices;
        static int[] bestCombos;
        static void Main(string[] args)
        {
            var price = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            var length = int.Parse(Console.ReadLine());

            bestCombos = new int[length + 1];
            bestPrices = new int[length + 1];


            Console.WriteLine(CutRod(price, length));
            Console.WriteLine(String.Join(" ", FindCombo(length)));
        }

        private static List<int> FindCombo(int length)
        {
            var combo = new List<int>();

            while (length > 0)
            {
                combo.Add(bestCombos[length]);
                length -= bestCombos[length];
            }

            return combo;
        }

        private static int CutRod(int[] price, int length)
        {
            if (length == 0)
            {
                return 0;
            }
            if (bestPrices[length] != 0)
            {
                return bestPrices[length];
            }

            var bestPrice = price[length];
            var bestCombo = length;

            for (int i = 1; i < length; i++)
            {
                var currentPrice = price[i] + CutRod(price, length - i);

                if (currentPrice > bestPrice)
                {
                    bestPrice = currentPrice;
                    bestCombo = i;
                }
            }

            bestPrices[length] = bestPrice;
            bestCombos[length] = bestCombo;

            return bestPrice;
        }
    }
}