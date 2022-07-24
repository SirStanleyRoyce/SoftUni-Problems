using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Move_Down_or_Right
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int rows = int.Parse(Console.ReadLine());
            int cols = int.Parse(Console.ReadLine());

            int[][] matrix = InitMatrix(rows, cols);
            int[][] table = InitMatrix(rows, cols);
            PopulateAndSumMatrixes(matrix, table);

            PrintBestPath(table);
        }

        private static void PrintBestPath(int[][] table)
        {
            Stack<string> steps = new Stack<string>();
            int row = table.Length - 1, col = table[0].Length - 1;

            while (row > 0 && col > 0)
            {
                steps.Push(FormatOutputStep(row, col));

                if (table[row - 1][col] > table[row][col - 1]) // upper > left
                {
                    row--;
                }
                else
                {
                    col--;
                }

            }
            while (row > 0)
            {
                steps.Push(FormatOutputStep(row, col));
                row--;
            }
            while (col > 0)
            {
                steps.Push(FormatOutputStep(row, col));
                col--;
            }

            steps.Push(FormatOutputStep(0, 0));

            Console.WriteLine(String.Join(" ", steps));
        }

        private static int[][] InitMatrix(int rows, int cols)
        {
            int[][] matrix = new int[rows][];

            for (int i = 0; i < rows; i++)
            {
                matrix[i] = new int[cols];
            }

            return matrix;
        }
        private static void PopulateAndSumMatrixes(int[][] matrix, int[][] table)
        {
            for (int row = 0; row < matrix.Length; row++)
            {
                int[] input = Console.ReadLine().Split().Select(int.Parse).ToArray();
                for (int col = 0; col < matrix[row].Length; col++)
                {
                    matrix[row][col] = input[col];

                    table[row][col] = matrix[row][col];

                    if (row == 0 && col > 0)
                    {
                        table[row][col] += table[row][col - 1];
                    }
                    else if (col == 0 && row > 0)
                    {
                        table[row][col] += table[row - 1][col];
                    }
                    else if (row != 0 && col != 0)
                    {
                        table[row][col] += Math.Max(table[row - 1][col], table[row][col - 1]);
                    }
                }
            }
        }
        private static string FormatOutputStep(int a, int b)
        {
            return $"[{a}, {b}]";
        }
    }
}