using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Guards
{
    internal class Program
    {
        static Dictionary<int, List<int>> graph = new Dictionary<int, List<int>>();
        static HashSet<int> visited = new HashSet<int>();
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int m = int.Parse(Console.ReadLine());

            for (int i = 1; i <= n; i++)
            {
                graph[i] = new List<int>();
            }

            for (int i = 0; i < m; i++)
            {
                int[] nodes = Console.ReadLine().Split().Select(int.Parse).ToArray();
                int from = nodes[0];
                int to = nodes[1];

                graph[from].Add(to);
            }

            int startNode = int.Parse(Console.ReadLine());

            DFS(startNode);

            Console.WriteLine(String.Join(" ", graph.Keys.Where(node => !visited.Contains(node)).OrderBy(a => a)));
        }

        private static void DFS(int node)
        {
            if (visited.Contains(node))
            {
                return;
            }

            visited.Add(node);

            foreach (int child in graph[node])
            {
                DFS(child);
            }
        }
    }
}
