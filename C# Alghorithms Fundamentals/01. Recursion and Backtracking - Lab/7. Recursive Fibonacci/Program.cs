using System;

namespace _7._Recursive_Fibonacci
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int index = int.Parse(Console.ReadLine());

            Console.WriteLine(Fibonacci(index));
        }

        static ulong Fibonacci(int end, ulong n1 = 1, ulong n2 = 0)
        {
            if (end <= 0)
            {
                return n1;
            }

            return Fibonacci(end - 1, n1 + n2, n1);
        }
    }
}
