using System;
using System.Collections.Generic;
using System.Linq;

namespace _1._Bellman_Ford
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

            try
            {
                BellmanFord(graph, nodesCount, source, destination);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        private static void BellmanFord(List<Edge> graph,
            int nodesCount,
            int source,
            int destination)
        {
            var distance = new double[nodesCount + 1];
            Array.Fill(distance, double.PositiveInfinity);
            distance[source] = 0;

            var prev = new int[nodesCount + 1];
            Array.Fill(prev, -1);

            for (int i = 0; i < nodesCount - 1; i++)
            {
                bool updated = false;

                foreach (var edge in graph)
                {
                    if (double.IsPositiveInfinity(distance[edge.From]))
                    {
                        continue;
                    }

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

            foreach (var edge in graph)
            {
                double newDistance = distance[edge.From] + edge.Weight;
                if (newDistance < distance[edge.To])
                {
                    throw new InvalidOperationException("Negative Cycle Detected");
                }
            }

            Console.WriteLine(String.Join(" ", GetNodePath(prev, destination)));
            Console.WriteLine(distance[destination]);
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

        private static List<Edge> ReadGraph(int edgesCount)
        {
            var graph = new List<Edge>();

            for (int i = 0; i < edgesCount; i++)
            {
                var edgeArgs = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                graph.Add(new Edge(edgeArgs));
            }

            return graph;
        }
    }
}
