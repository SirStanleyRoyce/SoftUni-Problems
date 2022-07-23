using System;
using System.Numerics;

namespace _1._Two_Minutes_to_Midnight
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int k = int.Parse(Console.ReadLine());

            BigInteger combinations = Variation(n, k) / Factorial(n - k);

            Console.WriteLine(combinations);
        }

        private static BigInteger Factorial(int num)
        {
            BigInteger result = 1;
            for (int i = 2; i <= num; i++)
            {
                result *= i;
            }

            return result;
        }

        private static BigInteger Variation(int n, int k)
        {
            BigInteger result = 1;
            for (int i = n; i > k; i--)
            {
                result *= i;
            }

            return result;
        }
    }
}
