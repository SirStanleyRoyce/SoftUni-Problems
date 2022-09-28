using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _5._Cable_Network
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
        static Dictionary<int, List<Edge>> graph;
        static HashSet<int> forestNodes;
        static List<Edge> forestEdges;

        static void Main(string[] args)
        {
            int budget = int.Parse(Console.ReadLine());
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());

            forestNodes = new HashSet<int>();
            forestEdges = new List<Edge>();

            graph = ReadGraph(edgesCount);

            int usedBudget = Prim(graph, forestNodes, budget);

            Console.WriteLine($"Budget used: {usedBudget}");
        }

        private static int Prim(Dictionary<int, List<Edge>> graph,
            HashSet<int> forestNodes,
            int budget)
        {
            int usedBudget = 0;

            var comparer = Comparer<Edge>.Create((f, s) => f.Weight - s.Weight);
            var bag = new OrderedBag<Edge>(comparer);

            foreach (var node in forestNodes)
            {
                bag.AddMany(graph[node]);
            }

            while (bag.Count > 0)
            {
                var minEdge = bag.RemoveFirst();

                if (usedBudget + minEdge.Weight > budget)
                {
                    break;
                }

                var nonTreeNode = -1;

                if (forestNodes.Contains(minEdge.From)
                    && !forestNodes.Contains(minEdge.To))
                {
                    nonTreeNode = minEdge.To;
                }
                if (forestNodes.Contains(minEdge.To)
                    && !forestNodes.Contains(minEdge.From))
                {
                    nonTreeNode = minEdge.From;
                }

                if (nonTreeNode == -1)
                {
                    continue;
                }

                forestNodes.Add(nonTreeNode);
                bag.AddMany(graph[nonTreeNode]);
                usedBudget += minEdge.Weight;
            }

            return usedBudget;
        }

        static Dictionary<int, List<Edge>> ReadGraph(int edgesCount)
        {
            var graph = new Dictionary<int, List<Edge>>();

            for (int i = 0; i < edgesCount; i++)
            {
                var input = Console.ReadLine()
                    .Split(new[] { " " }, StringSplitOptions.RemoveEmptyEntries);

                var edgesArgs = input
                    .Take(3)
                    .Select(int.Parse)
                    .ToArray();

                bool isConnected = input.TakeLast(1).First() == "connected";

                var edge = new Edge(edgesArgs);

                if (isConnected)
                {
                    forestNodes.Add(edge.From);
                    forestNodes.Add(edge.To);
                }

                if (!graph.ContainsKey(edge.From))
                {
                    graph.Add(edge.From, new List<Edge>());
                }
                if (!graph.ContainsKey(edge.To))
                {
                    graph.Add(edge.To, new List<Edge>());
                }

                graph[edge.From].Add(edge);
                graph[edge.To].Add(edge);
            }

            return graph;
        }
    }
}
