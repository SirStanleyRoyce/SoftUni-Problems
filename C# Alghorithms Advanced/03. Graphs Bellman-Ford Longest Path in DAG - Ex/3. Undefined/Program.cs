using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Undefined
{
    internal class Edge
    {
        private int from;
        private int to;
        private int weight;

        public Edge(int from, int to, int reliabilityPercentage)
        {
            this.From = from;
            this.To = to;
            this.Weight = reliabilityPercentage;
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
        static List<Edge> edges;

        static void Main(string[] args)
        {
            edges = new List<Edge>();

            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());


            ReadEdges(edgesCount);

            int source = int.Parse(Console.ReadLine());
            int destination = int.Parse(Console.ReadLine());

            BellmanFord(nodesCount, source, destination);
        }

        private static void BellmanFord(int nodesCount, int source, int destination)
        {
            double[] distance = new double[nodesCount + 1];
            Array.Fill(distance, double.PositiveInfinity);
            distance[source] = 0;

            int[] prev = new int[nodesCount + 1];
            Array.Fill(prev, -1);

            for (int i = 0; i < nodesCount - 1; i++)
            {
                bool updated = false;
                foreach (var edge in edges)
                {
                    double newDistance = distance[edge.From] + edge.Weight;

                    if (newDistance < distance[edge.To])
                    {
                        distance[edge.To] = newDistance;
                        prev[edge.To] = edge.From;
                        updated = true;
                    }
                }

                if (!updated)
                {
                    break;
                }
            }

            foreach (var edge in edges)
            {
                double newDistance = distance[edge.From] + edge.Weight;
                if (newDistance < distance[edge.To])
                {
                    Console.WriteLine("Undefined");
                    return;
                }
            }

            Console.WriteLine(String.Join(" ", GetNodePath(prev, destination)));
            Console.WriteLine(distance[destination]);
        }

        private static Stack<int> GetNodePath(int[] prev, int destination)
        {
            var path = new Stack<int>();
            var node = destination;

            while (node != -1)
            {
                path.Push(node);
                node = prev[node];
            }

            return path;
        }

        private static void ReadEdges(int edgesCount)
        {
            for (int i = 0; i < edgesCount; i++)
            {
                int[] args = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                edges.Add(new Edge(args));
            }
        }
    }
}
