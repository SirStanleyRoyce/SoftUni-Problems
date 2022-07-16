using System;
using System.Collections.Generic;

namespace _5._Find_All_Paths_in_a_Labyrinth
{
    internal class Program
    {
        static readonly char END = 'e';
        static readonly char WALL = '*';
        static readonly char RIGHT = 'R';
        static readonly char DOWN = 'D';
        static readonly char LEFT = 'L';
        static readonly char UP = 'U';
        static readonly char VISITED = 'v';
        static List<char> path = new List<char>();
        static char[,] labyrinth;

        static void Main(string[] args)
        {
            int y = int.Parse(Console.ReadLine());
            int x = int.Parse(Console.ReadLine());

            labyrinth = new char[y, x];

            // read labyrinth
            for (int i = 0; i < y; i++)
            {
                string row = Console.ReadLine();
                for (int j = 0; j < x; j++)
                {
                    labyrinth[i, j] = row[j];
                }
            }

            FindPaths();
        }

        static void FindPaths(int y = 0, int x = 0, char dir = '\0')
        {
            // check for bounds; walls; visited cells;
            if (y < 0 || y >= labyrinth.GetLength(0)
                || x < 0 || x >= labyrinth.GetLength(1)
                || labyrinth[y, x] == WALL
                || labyrinth[y, x] == VISITED)
            {
                return;
            }

            // add path since cell is free 
            path.Add(dir);

            // handle end 
            if (labyrinth[y, x] == END)
            {
                Console.WriteLine(String.Join(String.Empty, path));
                path.RemoveAt(path.Count - 1);
                return;
            }

            // mark cell as visited
            char cell = labyrinth[y, x];
            labyrinth[y, x] = VISITED;

            // try going in every direction
            FindPaths(y, x + 1, RIGHT);
            FindPaths(y + 1, x, DOWN);
            FindPaths(y, x - 1, LEFT);
            FindPaths(y - 1, x, UP);

            // unmark cell as visited
            labyrinth[y, x] = cell;

            path.RemoveAt(path.Count - 1);
        }
    }
}
