using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Boxes
{
    class Box
    {
        public int Width { get; set; }
        public int Depth { get; set; }
        public int Height { get; set; }
        public override string ToString()
        {
            return $"{this.Width} {this.Depth} {this.Height}";
        }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            int boxesCount = int.Parse(Console.ReadLine());
            Box[] boxes = new Box[boxesCount];

            for (int i = 0; i < boxesCount; i++)
            {
                var line = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                boxes[i] = new Box
                {
                    Width = line[0],
                    Depth = line[1],
                    Height = line[2],
                };
            }

            var length = new int[boxes.Length];
            var parent = new int[boxes.Length];

            int bestLength = 0;
            int bestIndex = 0;

            for (int current = 0; current < boxes.Length; current++)
            {
                var currentBox = boxes[current];
                var currentLength = 1;
                var currentParent = -1;

                for (int prev = current - 1; prev >= 0; prev--)
                {
                    var prevBox = boxes[prev];
                    int prevLength = length[prev];

                    if (currentBox.Width > prevBox.Width
                        && currentBox.Depth > prevBox.Depth
                        && currentBox.Height > prevBox.Height
                        && prevLength + 1 >= currentLength)
                    {
                        currentParent = prev;
                        currentLength = prevLength + 1;
                    }
                }

                parent[current] = currentParent;
                length[current] = currentLength;

                if (currentLength > bestLength)
                {
                    bestLength = currentLength;
                    bestIndex = current;
                }
            }

            var sequence = new Stack<Box>();
            while (bestIndex != -1)
            {
                sequence.Push(boxes[bestIndex]);
                bestIndex = parent[bestIndex];
            }

            Console.WriteLine(String.Join("\n", sequence));
        }
    }
}
