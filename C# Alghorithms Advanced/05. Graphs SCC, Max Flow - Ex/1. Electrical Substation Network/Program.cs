using System;
using System.Collections.Generic;
using System.Linq;

namespace _1._Electrical_Substation_Network
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int lines = int.Parse(Console.ReadLine());

            var graph = new List<int>[nodesCount];
            var reversedGraph = new List<int>[nodesCount];

            for (int i = 0; i < nodesCount; i++)
            {
                graph[i] = new List<int>();
                reversedGraph[i] = new List<int>();
            }

            for (int i = 0; i < lines; i++)
            {
                var input = Console.ReadLine()
                    .Split(", ")
                    .Select(int.Parse);

                var node = input.First();
                var children = input.Skip(1);

                foreach (var child in children)
                {
                    graph[node].Add(child);
                    reversedGraph[child].Add(node);
                }
            }


            var visited = new bool[nodesCount];
            var sorted = new Stack<int>();
            for (int node = 0; node < nodesCount; node++)
            {
                DFS(node, graph, visited, sorted);
            }

            visited = new bool[nodesCount];
            while (sorted.Count > 0)
            {
                var node = sorted.Pop();

                if (visited[node])
                {
                    continue;
                }


                var component = new Stack<int>();

                DFS(node, reversedGraph, visited, component);

                Console.WriteLine(String.Join(", ", component));
            }
        }

        private static void DFS(int node, List<int>[] graph, bool[] visited, Stack<int> result)
        {
            if (visited[node])
            {
                return;
            }

            visited[node] = true;

            foreach (var child in graph[node])
            {
                DFS(child, graph, visited, result);
            }

            result.Push(node);
        }
    }
}
