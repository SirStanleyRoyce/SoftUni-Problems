using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Code
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int[] firstSequence = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();
            int[] secondSequence = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            int rows = firstSequence.Length + 1;
            int cols = secondSequence.Length + 1;

            int[][] lcs = InitMatrix<int>(rows, cols);

            for (int row = 1; row < rows; row++)
            {
                for (int col = 1; col < cols; col++)
                {
                    if (firstSequence[row - 1] == secondSequence[col - 1])
                    {
                        lcs[row][col] = 1 + lcs[row - 1][col - 1];
                    }
                    else
                    {
                        lcs[row][col] = Math.Max(lcs[row][col - 1], lcs[row - 1][col]);
                    }
                }
            }

            int r = firstSequence.Length;
            int c = secondSequence.Length;
            var elements = new Stack<int>();

            while (r > 0 && c > 0)
            {
                if (firstSequence[r - 1] == secondSequence[c - 1])
                {
                    elements.Push(firstSequence[r - 1]);
                    r--;
                    c--;
                }
                else if (lcs[r - 1][c] > lcs[r][c - 1])
                {
                    r--;
                }
                else
                {
                    c--;
                }
            }

            Console.WriteLine(String.Join(" ", elements));
            Console.WriteLine(lcs[rows - 1][cols - 1]);
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
