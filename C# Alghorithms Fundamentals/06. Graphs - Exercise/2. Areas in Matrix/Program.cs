using System;
using System.Collections.Generic;
using System.Text;

namespace _2._Areas_in_Matrix
{
    internal class Program
    {
        static char[,] matrix;
        static bool[,] visited;
        static SortedDictionary<char, int> areas = new SortedDictionary<char, int>();

        static void Main(string[] args)
        {
            int rows = int.Parse(Console.ReadLine());
            int cols = int.Parse(Console.ReadLine());
            matrix = new char[rows, cols];
            visited = new bool[rows, cols];

            //read
            for (int i = 0; i < rows; i++)
            {
                string input = Console.ReadLine();
                for (int j = 0; j < cols; j++)
                {
                    char nodeValue = input[j];
                    matrix[i, j] = nodeValue;

                    if (!areas.ContainsKey(nodeValue))
                    {
                        areas[nodeValue] = 0;
                    }
                }
            }

            for (int i = 0; i < rows; i++)
            {
                for (int j = 0; j < cols; j++)
                {
                    if (visited[i, j])
                    {
                        continue;
                    }

                    DFS(i, j, matrix[i, j]);
                    areas[matrix[i, j]]++;
                }
            }

            int areasCount = 0;
            StringBuilder sb = new StringBuilder();
            foreach (var kvp in areas)
            {
                int value = kvp.Value;

                areasCount += value;
                sb.AppendLine($"Letter '{kvp.Key}' -> {value}");
            }
            sb.Insert(0, $"Areas: {areasCount}\n");
            Console.WriteLine(sb);
        }

        private static void DFS(int row, int col, char node)
        {
            if (row < 0 || col < 0 || row >= matrix.GetLength(0) || col >= matrix.GetLength(1)) // bounds check
            {
                return;
            }

            if (visited[row, col]) // already visited check
            {
                return;
            }

            if (matrix[row, col] != node) // different character check
            {
                return;
            }

            visited[row, col] = true;

            DFS(row + 1, col, node);
            DFS(row - 1, col, node);
            DFS(row, col + 1, node);
            DFS(row, col - 1, node);
        }
    }
}
