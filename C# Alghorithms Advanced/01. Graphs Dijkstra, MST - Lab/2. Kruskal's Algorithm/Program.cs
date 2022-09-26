using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Kruskal_s_Algorithm
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

            List<Edge> edges = new List<Edge>();
            Dictionary<int, int> parent = new Dictionary<int, int>();

            for (int i = 0; i < n; i++)
            {
                var input = Console.ReadLine()
                    .Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse)
                    .ToArray();

                var edge = new Edge(input);

                if (!parent.ContainsKey(edge.From))
                {
                    parent[edge.From] = edge.From;
                }
                if (!parent.ContainsKey(edge.To))
                {
                    parent[edge.To] = edge.To;
                }

                edges.Add(edge);
            }

            edges.Sort((a, b) => a.Weight - b.Weight);


            KruskalMST(edges, parent)
                .ForEach(edge =>
                    Console.WriteLine($"{edge.From} - {edge.To}"));
        }

        static List<Edge> KruskalMST(List<Edge> edges, Dictionary<int, int> parent)
        {
            List<Edge> mst = new List<Edge>();

            foreach (var edge in edges)
            {
                var firstNodeRoot = TrackRoot(parent, edge.From);
                var secondNodeRoot = TrackRoot(parent, edge.To);

                if (firstNodeRoot == secondNodeRoot)
                {
                    continue;
                }

                parent[firstNodeRoot] = secondNodeRoot;
                mst.Add(edge);
            }

            return mst;
        }

        private static int TrackRoot(Dictionary<int, int> parent, int node)
        {
            while (node != parent[node])
            {
                node = parent[node];
            }

            return node;
        }
    }
}
