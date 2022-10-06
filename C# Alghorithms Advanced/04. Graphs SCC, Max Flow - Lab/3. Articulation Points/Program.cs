using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Articulation_Points
{
    internal class Program
    {
        private static List<int>[] graph;
        private static int[] parent;
        private static bool[] visited;
        private static int[] depth;
        private static int[] lowpoint;
        private static List<int> articulationPoints;

        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int lines = int.Parse(Console.ReadLine());

            graph = new List<int>[nodesCount];
            visited = new bool[nodesCount];

            parent = new int[nodesCount];
            Array.Fill(parent, -1);

            depth = new int[nodesCount];
            lowpoint = new int[nodesCount];
            articulationPoints = new List<int>();

            for (int i = 0; i < lines; i++)
            {
                var input = Console.ReadLine()
                    .Split(", ")
                    .Select(int.Parse);

                var node = input.First();

                if (graph[node] is null)
                {
                    graph[i] = new List<int>();
                }

                graph[node].AddRange(input.Skip(1));
            }

            for (int node = 0; node < nodesCount; node++)
            {
                if (visited[node])
                {
                    continue;
                }

                FindArticularPoints(node, 1);
            }

            Console.WriteLine("Articulation points: " + String.Join(", ", articulationPoints));
        }

        private static void FindArticularPoints(int node, int d)
        {
            visited[node] = true;
            depth[node] = d;
            lowpoint[node] = d;

            int childCount = 0;
            bool isArticulationPoint = false;

            foreach (var child in graph[node])
            {
                if (!visited[child])
                {
                    parent[child] = node;

                    FindArticularPoints(child, d + 1);
                    childCount++;

                    if (lowpoint[child] >= depth[node])
                    {
                        isArticulationPoint = true;
                    }

                    lowpoint[node] = Math.Min(lowpoint[node], lowpoint[child]);
                }
                else if (parent[child] != child)
                {
                    lowpoint[node] = Math.Min(lowpoint[node], depth[child]);
                }
            }

            if ((parent[node] == -1 && childCount > 1)
                || (parent[node] != -1 && isArticulationPoint))
            {
                articulationPoints.Add(node);
            }
        }
    }
}
