using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _2._Creep
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
            set { this.weight = value; }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            int m = int.Parse(Console.ReadLine());
            var graph = ReadGraph(m);

            PrimHelper(graph);
        }

        private static void PrimHelper(Dictionary<int, List<Edge>> graph)
        {
            var forestNodes = new HashSet<int>();
            var forestEdges = new List<Edge>();

            foreach (var node in graph.Keys)
            {
                if (!forestNodes.Contains(node))
                {
                    Prim(graph, ref forestNodes, ref forestEdges, node);
                }
            }

            int totalWeight = 0;
            foreach (var edge in forestEdges)
            {
                Console.WriteLine($"{edge.From} {edge.To}");
                totalWeight += edge.Weight;
            }
            Console.WriteLine(totalWeight);
        }

        private static void Prim(Dictionary<int, List<Edge>> graph,
            ref HashSet<int> forestNodes,
            ref List<Edge> forestEdges,
            int startingNode)
        {
            forestNodes.Add(startingNode);

            var comparer = Comparer<Edge>.Create((f, s) => f.Weight - s.Weight);
            var bag = new OrderedBag<Edge>(comparer);
            bag.AddMany(graph[startingNode]);

            while (bag.Count > 0)
            {
                var minEdge = bag.RemoveFirst();

                var nonTreeNode = -1;

                if (forestNodes.Contains(minEdge.From) &&
                    !forestNodes.Contains(minEdge.To))
                {
                    nonTreeNode = minEdge.To;
                }

                if (forestNodes.Contains(minEdge.To) &&
                   !forestNodes.Contains(minEdge.From))
                {
                    nonTreeNode = minEdge.From;
                }

                if (nonTreeNode == -1)
                {
                    continue;
                }

                forestNodes.Add(nonTreeNode);
                forestEdges.Add(minEdge);
                bag.AddMany(graph[nonTreeNode]);
            }
        }

        static Dictionary<int, List<Edge>> ReadGraph(int edgesCount)
        {
            var graph = new Dictionary<int, List<Edge>>();

            for (int i = 0; i < edgesCount; i++)
            {
                var input = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                var edge = new Edge(input);

                if (!graph.ContainsKey(edge.From))
                {
                    graph.Add(edge.From, new List<Edge>());
                }
                if (!graph.ContainsKey(edge.To))
                {
                    graph.Add(edge.To, new List<Edge>());
                }

                var repeatedEdgeFirstIdx = graph[edge.From].FindIndex(e => e.From == edge.From
                && e.To == edge.To);
                var repeatedEdgeSecondIdx = graph[edge.To].FindIndex(e => e.From == edge.From
                && e.To == edge.To);

                if (repeatedEdgeFirstIdx != -1)
                {
                    graph[edge.From][repeatedEdgeFirstIdx].Weight = edge.Weight;
                }
                else
                {
                    graph[edge.From].Add(edge);
                }
                if (repeatedEdgeSecondIdx != -1)
                {
                    graph[edge.To][repeatedEdgeSecondIdx].Weight = edge.Weight;
                }
                else
                {
                    graph[edge.To].Add(edge);
                }
            }

            return graph;
        }
    }
}
