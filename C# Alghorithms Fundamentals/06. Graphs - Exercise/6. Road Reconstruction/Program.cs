using System;
using System.Linq;
using System.Collections.Generic;

namespace _6._Road_Reconstruction
{
    class Edge
    {
        public int from;
        public int to;
        public Edge(int from, int to)
        {
            this.from = from;
            this.to = to;
        }

        public override string ToString()
        {
            return from < to ? $"{from} {to}" : $"{to} {from}";
        }
    }
    internal class Program
    {
        static List<int>[] graph;
        static List<Edge> edges = new List<Edge>();
        static bool[] visited;

        static void Main(string[] args)
        {
            int buildingsCount = int.Parse(Console.ReadLine());
            int streetsCount = int.Parse(Console.ReadLine());

            graph = new List<int>[buildingsCount];

            for (int i = 0; i < graph.Length; i++)
            {
                graph[i] = new List<int>();
            }

            for (int i = 0; i < streetsCount; i++)
            {
                int[] fromTo = Console.ReadLine().Split(" - ").Select(int.Parse).ToArray();
                int from = fromTo[0];
                int to = fromTo[1];

                graph[from].Add(to);
                graph[to].Add(from);

                edges.Add(new Edge(from, to));
            }

            Console.WriteLine("Important streets:");
            foreach (Edge edge in edges)
            {
                visited = new bool[buildingsCount];

                graph[edge.from].Remove(edge.to);
                graph[edge.to].Remove(edge.from);

                DFS(0);

                if (visited.Contains(false))
                {
                    Console.WriteLine(edge);
                }

                graph[edge.from].Add(edge.to);
                graph[edge.to].Add(edge.from);
            }
        }

        private static void DFS(int node)
        {
            if (visited[node])
            {
                return;
            }

            visited[node] = true;

            foreach (int child in graph[node])
            {
                DFS(child);
            }
        }
    }
}
