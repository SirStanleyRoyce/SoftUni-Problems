using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Water_Supply_System_Disaster
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
            int targetComponentsCount = int.Parse(Console.ReadLine());

            graph = new List<int>[nodesCount + 1];
            visited = new bool[nodesCount + 1];

            parent = new int[nodesCount + 1];
            Array.Fill(parent, -1);

            depth = new int[nodesCount + 1];
            lowpoint = new int[nodesCount + 1];
            articulationPoints = new List<int>();

            for (int i = 1; i <= nodesCount; i++)
            {
                var edgeArgs = Console.ReadLine()
                    .Split()
                    .Select(int.Parse);

                graph[i] = new List<int>(edgeArgs);
            }

            for (int node = 1; node < nodesCount; node++)
            {
                if (visited[node])
                {
                    continue;
                }

                FindArticularPoints(node, 1);
            }

            int resultPoint = 0;
            foreach (var point in articulationPoints)
            {
                visited = new bool[graph.Length];
                int childComponents = 0;

                for (int node = 1; node < graph.Length; node++)
                {
                    if (node == point || visited[node])
                    {
                        continue;
                    }

                    DFS(node, point);
                    childComponents++;
                }

                if (childComponents == targetComponentsCount)
                {
                    resultPoint = point;
                    break;
                }
            }

            Console.WriteLine(resultPoint);
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

        private static void DFS(int node, int point)
        {
            if (visited[node] || node == point)
            {
                return;
            }

            visited[node] = true;

            foreach (var child in graph[node])
            {
                DFS(child, point);
            }
        }
    }
}

