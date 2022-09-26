using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Gateways
{
    internal class Program
    {
        static Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();
        static int[] parent;

        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int m = int.Parse(Console.ReadLine());

            parent = new int[n + 1];
            Array.Fill(parent, -1);

            for (int i = 1; i <= n; i++)
            {
                graph[i] = new List<int>();
            }

            for (int i = 0; i < m; i++)
            {
                int[] input = Console.ReadLine().Split().Select(int.Parse).ToArray();
                graph[input[0]].Add(input[1]);
            }

            int start = int.Parse(Console.ReadLine());
            int target = int.Parse(Console.ReadLine());

            BFS(start, target);
        }

        private static void BFS(int startNode, int destination)
        {
            HashSet<int> visited = new HashSet<int> { startNode };
            Queue<int> queue = new Queue<int>();
            queue.Enqueue(startNode);

            while (queue.Count > 0)
            {
                int node = queue.Dequeue();

                if (node.Equals(destination))
                {
                    var path = ConstructPath(destination);
                    Console.WriteLine(String.Join(" ", path));
                    return;
                }

                foreach (int child in graph[node])
                {
                    if (visited.Contains(child))
                    {
                        continue;
                    }
                    parent[child] = node;
                    visited.Add(child);
                    queue.Enqueue(child);
                }
            }
        }

        private static Stack<int> ConstructPath(int destination)
        {
            int node = destination;
            Stack<int> path = new Stack<int>();

            while (node != -1)
            {
                path.Push(node);
                node = parent[node];
            }

            return path;
        }
    }
}
