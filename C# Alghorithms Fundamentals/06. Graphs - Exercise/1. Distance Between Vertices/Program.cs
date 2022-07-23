using System;
using System.Linq;
using System.Collections.Generic;

namespace _1._Distance_Between_Vertices
{
    internal class Program
    {
        static Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();

        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int pairsCount = int.Parse(Console.ReadLine());

            // read edges
            for (int i = 0; i < nodesCount; i++)
            {
                string[] input = Console.ReadLine().Split(':', StringSplitOptions.RemoveEmptyEntries);
                int node = int.Parse(input[0]);

                if (input.Length > 1)
                {
                    graph[node] = input[1].Split().Select(int.Parse).ToList();
                }
                else
                {
                    graph[node] = new List<int>();
                }
            }

            string[] output = new string[pairsCount];
            for (int i = 0; i < pairsCount; i++)
            {
                int[] pair = Console.ReadLine().Split('-').Select(int.Parse).ToArray();
                int start = pair[0];
                int target = pair[1];
                int count = BFS(start, target);

                output[i] = $"{{{start}, {target}}} -> {count}";
            }

            Console.WriteLine(string.Join('\n', output));
        }

        private static int BFS(int startNode, int target)
        {
            HashSet<int> visited = new HashSet<int> { startNode };
            Queue<int> queue = new Queue<int>();
            Dictionary<int, int> childParentPairs = new Dictionary<int, int> { { startNode, -1 } };
            queue.Enqueue(startNode);

            while (queue.Count > 0)
            {
                int node = queue.Dequeue();

                if (node == target)
                {
                    return GetPath(childParentPairs, target);
                }

                foreach (int child in graph[node])
                {
                    if (visited.Contains(child))
                    {
                        continue;
                    }

                    visited.Add(child);
                    queue.Enqueue(child);
                    childParentPairs[child] = node;
                }
            }

            return -1;
        }

        private static int GetPath(Dictionary<int, int> childParentPairs, int target)
        {
            int steps = 0;
            int x = target;

            while (childParentPairs[x] != -1)
            {
                steps++;
                x = childParentPairs[x];
            }

            return steps;
        }
    }
}
