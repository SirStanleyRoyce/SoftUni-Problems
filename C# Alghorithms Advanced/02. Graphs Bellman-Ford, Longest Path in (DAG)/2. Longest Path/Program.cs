using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Longest_Path
{
    internal class Edge
    {
        private int from;
        private int to;
        private int weight;

        public Edge(int from, int to, int weight)
        {
            this.From = from;
            this.To = to;
            this.Weight = weight;
        }

        public Edge(int[] edgeArgs) : this(edgeArgs[0], edgeArgs[1], edgeArgs[2]) { }

        public int From
        {
            get { return this.from; }
            private set { this.from = value; }
        }
        public int To
        {
            get { return this.to; }
            private set { this.to = value; }
        }
        public int Weight
        {
            get { return this.weight; }
            private set { this.weight = value; }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            var nodesCount = int.Parse(Console.ReadLine());
            var edgesCount = int.Parse(Console.ReadLine());

            var graph = ReadGraph(edgesCount);

            var source = int.Parse(Console.ReadLine());
            var destination = int.Parse(Console.ReadLine());

            var distance = new double[nodesCount + 1];
            Array.Fill(distance, double.NegativeInfinity);
            distance[source] = 0;

            var sortedNodes = TopologicalSort(graph);

            var weight = LongestPath(graph,
                distance,
                sortedNodes,
                destination);

            Console.WriteLine(weight);
        }

        private static double LongestPath(Dictionary<int, List<Edge>> graph,
            double[] distance,
            Stack<int> sortedNodes,
            int destination)
        {
            var prev = new int[graph.Count + 1];
            Array.Fill(prev, -1);

            while (sortedNodes.Count > 0)
            {
                var node = sortedNodes.Pop();

                foreach (var edge in graph[node])
                {
                    var newDistance = distance[edge.From] + edge.Weight;

                    if (newDistance > distance[edge.To])
                    {
                        distance[edge.To] = newDistance;
                        prev[edge.To] = edge.From;
                    }
                }
            }

            // ONLY WEIGHT VALUE (NOT PATH) IS REQUIRED IN EXERCISE
            // Console.WriteLine(String.Join(" ", GetNodePath(prev, destination)));

            return distance[destination];
        }

        private static Stack<int> GetNodePath(int[] prev, int destination, int bottom = -1)
        {
            var path = new Stack<int>();
            var node = destination;

            while (node != bottom)
            {
                path.Push(node);
                node = prev[node];
            }

            return path;
        }

        private static Stack<int> TopologicalSort(Dictionary<int, List<Edge>> graph)
        {
            var result = new Stack<int>();
            var visited = new HashSet<int>();

            foreach (var node in graph.Keys)
            {
                DFS(graph, node, visited, result);
            }

            return result;
        }

        private static void DFS(Dictionary<int, List<Edge>> graph,
            int node,
            HashSet<int> visited,
            Stack<int> result)
        {
            if (visited.Contains(node))
            {
                return;
            }

            visited.Add(node);

            foreach (var edge in graph[node])
            {
                DFS(graph, edge.To, visited, result);
            }

            result.Push(node);
        }

        private static Dictionary<int, List<Edge>> ReadGraph(int edgesCount)
        {
            var graph = new Dictionary<int, List<Edge>>();

            for (int i = 0; i < edgesCount; i++)
            {
                var edgeArgs = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                var edge = new Edge(edgeArgs);

                if (!graph.ContainsKey(edge.From))
                {
                    graph.Add(edge.From, new List<Edge>());
                }
                if (!graph.ContainsKey(edge.To))
                {
                    graph.Add(edge.To, new List<Edge>());
                }

                graph[edge.From].Add(edge);
            }

            return graph;
        }
    }
}
