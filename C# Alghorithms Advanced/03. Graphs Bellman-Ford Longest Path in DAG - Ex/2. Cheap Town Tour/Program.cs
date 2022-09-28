using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Cheap_Town_Tour
{
    internal class Edge
    {
        private int from;
        private int to;
        private int cost;

        public Edge(int from, int to, int reliabilityPercentage)
        {
            this.From = from;
            this.To = to;
            this.Cost = reliabilityPercentage;
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
        public int Cost
        {
            get { return this.cost; }
            private set { this.cost = value; }
        }
    }

    internal class Program
    {
        static Edge[] edges;
        static int[] parent;

        private static void Main()
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());

            edges = new Edge[edgesCount];
            ReadEdges(edgesCount);


            parent = new int[nodesCount];
            for (int i = 0; i < parent.Length; i++)
            {
                parent[i] = i;
            }

            Console.WriteLine("Total cost: " + KruskalMstWeight());
        }

        private static int KruskalMstWeight()
        {
            int cost = 0;

            foreach (var edge in edges)
            {
                int firstNodeRoot = GetNodeRoot(edge.From);
                int secondNodeRoot = GetNodeRoot(edge.To);

                if (firstNodeRoot == secondNodeRoot)
                {
                    continue;
                }

                parent[firstNodeRoot] = secondNodeRoot;
                cost += edge.Cost;
            }

            return cost;
        }

        private static void ReadEdges(int edgesCount)
        {
            for (int i = 0; i < edgesCount; i++)
            {
                var args = Console.ReadLine()
                   .Split(" - ")
                   .Select(int.Parse)
                   .ToArray();

                edges[i] = new Edge(args);
            }

            Array.Sort(edges, (a, b) => a.Cost - b.Cost);
        }

        private static int GetNodeRoot(int node)
        {
            while (node != parent[node])
            {
                node = parent[node];
            }

            return node;
        }
    }
}
