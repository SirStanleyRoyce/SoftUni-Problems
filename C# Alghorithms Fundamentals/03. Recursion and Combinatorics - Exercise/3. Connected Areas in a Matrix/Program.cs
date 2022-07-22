using System;
using System.Linq;
using System.Collections.Generic;

namespace _3._Connected_Areas_in_a_Matrix
{

    class Area
    {
        public int row, col, size;

        public Area(int row, int col, int size)
        {
            this.row = row;
            this.col = col;
            this.size = size;
        }

        public void Print(int id)
        {
            Console.WriteLine($"Area #{id} at ({this.row}, {this.col}), size: {this.size}");
        }
    }

    internal class Program
    {
        static char WALL = '*';
        static char VISITED = 'v';
        static int rows, cols;
        static char[,] matrix;
        static int size = 0;
        static List<Area> areas = new List<Area>();

        static void Main(string[] args)
        {
            rows = int.Parse(Console.ReadLine());
            cols = int.Parse(Console.ReadLine());
            matrix = new char[rows, cols];

            // read matrix input
            for (int r = 0; r < rows; r++)
            {
                string line = Console.ReadLine();
                for (int c = 0; c < cols; c++)
                {
                    matrix[r, c] = line[c];
                }
            }

            // explore matrix
            for (int r = 0; r < rows; r++)
            {
                for (int c = 0; c < cols; c++)
                {
                    size = 0;

                    GetAreaInMatrix(r, c);

                    if (size != 0)
                    {
                        areas.Add(new Area(r, c, size));
                    }
                }
            }

            List<Area> sorted = areas.OrderByDescending(a => a.size)
                .ThenBy(a => a.row)
                .ThenBy(a => a.col)
                .ToList();

            Console.WriteLine($"Total areas found: {sorted.Count()}");
            for (int i = 0; i < sorted.Count(); i++)
            {
                sorted[i].Print(i + 1);
            }
        }

        static void GetAreaInMatrix(int row = 0, int col = 0)
        {
            // check matrix bounds; walls; visited cells;
            if (row < 0 || col < 0 || row >= rows || col >= cols
                || matrix[row, col] == WALL
                || matrix[row, col] == VISITED)
            {
                return;
            }

            size++;
            matrix[row, col] = VISITED;
            GetAreaInMatrix(row + 1, col); // down
            GetAreaInMatrix(row - 1, col); // up
            GetAreaInMatrix(row, col + 1); // right
            GetAreaInMatrix(row, col - 1); // left
        }
    }
}
