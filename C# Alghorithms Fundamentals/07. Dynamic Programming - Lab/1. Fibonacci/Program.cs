using System;
using System.Collections.Generic;
using System.Numerics;

namespace _1._Fibonacci
{
    internal class Program
    {
        static Dictionary<int, ulong> cache = new Dictionary<int, ulong>();
        static void Main(string[] args)
        {
            Console.WriteLine(Fibonacci(int.Parse(Console.ReadLine())));
        }

        private static ulong Fibonacci(int n)
        {
            if (cache.ContainsKey(n))
            {
                return cache[n];
            }

            if (n <= 2)
            {
                return 1;
            }

            ulong result = Fibonacci(n - 1) + Fibonacci(n - 2);
            cache[n] = result;

            return result;
        }

        /*private static BigInteger Fibonacci(int n)
        {
            BigInteger x = 1;
        BigInteger y = 1;

        BigInteger temp;
            for (int i = 3; i<n; i++)
            {
                temp = x;
                x += y;
                y = temp;
            }

            return x + y;
        }*/
    }
}
