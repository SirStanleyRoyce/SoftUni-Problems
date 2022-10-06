using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Max_Flow__Edmonds_Karp_
{
    internal class Program
    {
        private static int[,] graph;
        private static int[] prev;

        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());

            graph = new int[nodesCount, nodesCount];

            for (int node = 0; node < nodesCount; node++)
            {
                var row = Console.ReadLine()
                    .Split(", ")
                    .Select(int.Parse)
                    .ToArray();

                for (int child = 0; child < row.Length; child++)
                {
                    graph[node, child] = row[child];
                }
            }

            int source = int.Parse(Console.ReadLine());
            int target = int.Parse(Console.ReadLine());

            prev = new int[graph.GetLength(0)];
            Array.Fill(prev, -1);

            int maxFlow = 0;

            while (BFS(source, target))
            {
                int minFlow = GetMinFlow(target);

                ApplyFlow(target, minFlow);

                maxFlow += minFlow;
            }

            Console.WriteLine("Max flow = " + maxFlow);
        }

        private static void ApplyFlow(int node, int minFlow)
        {
            while (prev[node] != -1)
            {
                graph[prev[node], node] -= minFlow;
                node = prev[node];
            }
        }

        private static int GetMinFlow(int target)
        {
            int node = target;
            int minFlow = int.MaxValue;

            while (prev[node] != -1)
            {
                int flow = graph[prev[node], node];

                if (flow < minFlow)
                {
                    minFlow = flow;
                }

                node = prev[node];
            }

            return minFlow;
        }

        private static bool BFS(int source, int target)
        {
            var visited = new bool[graph.GetLength(0)];
            visited[source] = true;

            var queue = new Queue<int>();
            queue.Enqueue(source);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();

                for (int child = 0; child < graph.GetLength(1); child++)
                {
                    if (!visited[child]
                        && graph[node, child] > 0)
                    {
                        visited[child] = true;
                        queue.Enqueue(child);
                        prev[child] = node;
                    }
                }
            }

            return visited[target];
        }
    }
}
