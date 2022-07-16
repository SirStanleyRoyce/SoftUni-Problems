using System;

namespace _4._Recursive_Factorial
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int num = int.Parse(Console.ReadLine());
            Console.WriteLine(Factoriel(num));
        }

        static int Factoriel(int num)
        {
            if (num == 0)
            {
                return 1;
            }

            return num * Factoriel(num - 1);
        }
    }
}
