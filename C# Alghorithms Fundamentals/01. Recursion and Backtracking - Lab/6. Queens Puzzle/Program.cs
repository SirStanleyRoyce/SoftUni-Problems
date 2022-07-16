using System;
using System.Collections.Generic;

namespace _6._Queens_Puzzle
{
    internal class Program
    {
        static int boardRows = 8, boardCols = 8;
        static bool[,] board = new bool[boardRows, boardCols];
        static HashSet<int> occupiedRows = new HashSet<int>();
        static HashSet<int> occupiedCols = new HashSet<int>();
        static HashSet<int> occupiedLeftDiagonal = new HashSet<int>();
        static HashSet<int> occupiedRightDiagonal = new HashSet<int>();


        static void Main(string[] args)
        {
            SolveQueensPuzzle();
        }

        static void SolveQueensPuzzle(int row = 0)
        {
            if (row >= boardRows)
            {
                PrintBoard(board);
                return;
            }

            for (int col = 0; col < boardCols; col++)
            {
                if (CanPlaceQueen(row, col))
                {
                    board[row, col] = true;

                    occupiedRows.Add(row);
                    occupiedCols.Add(col);
                    occupiedLeftDiagonal.Add(row - col);
                    occupiedRightDiagonal.Add(row + col);

                    SolveQueensPuzzle(row + 1);

                    board[row, col] = false;
                    occupiedRows.Remove(row);
                    occupiedCols.Remove(col);
                    occupiedLeftDiagonal.Remove(row - col);
                    occupiedRightDiagonal.Remove(row + col);
                }
            }
        }

        static bool CanPlaceQueen(int row, int col)
        {
            return !occupiedRows.Contains(row)
                && !occupiedCols.Contains(col)
                && !occupiedLeftDiagonal.Contains(row - col)
                && !occupiedRightDiagonal.Contains(row + col);
        }
        static void PrintBoard(bool[,] board)
        {
            for (int row = 0; row < board.GetLength(0); row++)
            {
                string line = "";
                for (int col = 0; col < board.GetLength(1); col++)
                {
                    line += board[row, col] ? "* " : "- ";
                }
                Console.WriteLine(line);
            }
            Console.WriteLine();
        }
    }
}
