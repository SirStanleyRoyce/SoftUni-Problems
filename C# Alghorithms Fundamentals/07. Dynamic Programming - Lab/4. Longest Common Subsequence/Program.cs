using System;

namespace _4._Longest_Common_Subsequence
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string str1 = Console.ReadLine();
            string str2 = Console.ReadLine();

            int rows = str1.Length + 1;
            int cols = str2.Length + 1;

            int[][] lcs = InitMatrix<int>(rows, cols);

            for (int row = 1; row < rows; row++)
            {
                for (int col = 1; col < cols; col++)
                {
                    if (str1[row - 1] == str2[col - 1])
                    {
                        lcs[row][col] = 1 + lcs[row - 1][col - 1];
                    }
                    else
                    {
                        lcs[row][col] = Math.Max(lcs[row][col - 1], lcs[row - 1][col]);
                    }
                }
            }

            Console.WriteLine(lcs[^1][^1]);
        }
        private static T[][] InitMatrix<T>(int rows, int cols)
        {
            T[][] matrix = new T[rows][];

            for (int i = 0; i < rows; i++)
            {
                matrix[i] = new T[cols];
            }

            return matrix;
        }
    }
}
