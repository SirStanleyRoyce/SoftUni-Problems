using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _3._Prim_s_Algorithm
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
            int n = int.Parse(Console.ReadLine());
            var graph = ReadGraph(n);

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

            foreach (var edge in forestEdges)
            {
                Console.WriteLine($"{edge.From} - {edge.To}");
            }
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
                    .Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)
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

                graph[edge.From].Add(edge);
                graph[edge.To].Add(edge);
            }

            return graph;
        }
    }
}
