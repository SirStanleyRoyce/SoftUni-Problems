using System;
using System.Linq;
using System.Collections.Generic;

namespace _5._Break_Cycles
{
    class Edge
    {
        public char from;
        public char to;
        public Edge(char from, char to)
        {
            this.from = from;
            this.to = to;
        }
    }

    internal class Program
    {
        static Dictionary<char, List<char>> graph = new Dictionary<char, List<char>>();
        static List<Edge> edges = new List<Edge>();

        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            for (int i = 0; i < n; i++)
            {
                string[] nodes = Console.ReadLine().Split(" -> ");
                char parentNode = char.Parse(nodes[0]);
                List<char> childrenNodes = nodes[1].Split().Select(char.Parse).ToList();

                graph[parentNode] = childrenNodes;

                foreach (char child in childrenNodes)
                {
                    edges.Add(new Edge(parentNode, child));
                }
            }

            edges = edges.OrderBy(e => e.from).ThenBy(e => e.to).ToList();

            List<string> output = new List<string>();
            foreach (Edge edge in edges)
            {
                graph[edge.from].Remove(edge.to);
                graph[edge.to].Remove(edge.from);

                if (BFS(edge.from, edge.to))
                {
                    if (!output.Any(s => s == $"{edge.to} - {edge.from}"))
                        output.Add($"{edge.from} - {edge.to}");
                    //output.Add(edge.from.CompareTo(edge.to) < 0 ? $"{edge.from} - {edge.to}" : $"{edge.to} - {edge.from}"); ---> hashset<string> output
                }
                else
                {
                    graph[edge.from].Add(edge.to);
                    graph[edge.to].Add(edge.from);
                }
            }

            Console.WriteLine("Edges to remove: " + output.Count);
            Console.WriteLine(string.Join('\n', output));
        }

        private static bool BFS(char startNode, char destination)
        {
            Queue<char> queue = new Queue<char>();
            HashSet<char> visited = new HashSet<char> { startNode };

            queue.Enqueue(startNode);

            while (queue.Count > 0)
            {
                char node = queue.Dequeue();

                if (node == destination)
                {
                    return true;
                }

                foreach (char child in graph[node])
                {
                    if (visited.Contains(child))
                    {
                        continue;
                    }

                    visited.Add(child);
                    queue.Enqueue(child);
                }

            }
            return false;
        }
    }
}
