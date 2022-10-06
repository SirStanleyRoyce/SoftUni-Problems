using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _1._Tour_de_Sofia
{
    class Edge
    {
        public int From { get; set; }
        public int To { get; set; }
        public int Weight { get; set; }
        public Edge(int from, int to, int weight)
        {
            From = from;
            To = to;
            Weight = weight;
        }
    }
    internal class Program
    {
        static Dictionary<int, List<Edge>> graph;
        static OrderedBag<int> bag;
        static double[] distance;
        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());
            int startEnd = int.Parse(Console.ReadLine());

            graph = ReadGraph(edgesCount);
            bag = new OrderedBag<int>();
            distance = new double[nodesCount];

            for (int i = 0; i < nodesCount; i++)
            {
                distance[i] = double.PositiveInfinity;
            }

            var nodesReached = Dijkstra(startEnd);

            Console.WriteLine(double.IsPositiveInfinity(distance[startEnd])
                ? nodesReached
                : distance[startEnd]);
        }

        private static int Dijkstra(int startEnd)
        {
            var comparer = Comparer<int>.Create((f, t) => (int)(distance[f] - distance[t]));
            bag = new OrderedBag<int>(comparer);

            foreach (var edge in graph[startEnd])
            {
                distance[edge.To] = edge.Weight;
                bag.Add(edge.To);
            }

            int pathLength = -1;
            int nodesReached = 1;

            while (bag.Count > 0)
            {
                var minNode = bag.RemoveFirst();

                if (minNode == startEnd
                    && nodesReached != 1)
                {
                    break;
                }

                nodesReached++;

                foreach (var edge in graph[minNode])
                {
                    if (double.IsPositiveInfinity(distance[edge.To]))
                    {
                        bag.Add(edge.To);
                    }

                    double newDistance = distance[minNode] + edge.Weight;

                    if (distance[edge.To] > newDistance)
                    {
                        distance[edge.To] = newDistance;
                        bag = new OrderedBag<int>(bag, comparer);
                    }
                }
            }

            return nodesReached;
        }

        static Dictionary<int, List<Edge>> ReadGraph(int length)
        {
            var graph = new Dictionary<int, List<Edge>>();

            for (int i = 0; i < length; i++)
            {
                var edgeArgs = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();
                int from = edgeArgs[0];
                int to = edgeArgs[1];
                int weight = edgeArgs[2];

                if (!graph.ContainsKey(from))
                {
                    graph[from] = new List<Edge>();
                }
                if (!graph.ContainsKey(to))
                {
                    graph[to] = new List<Edge>();
                }

                graph[from].Add(new Edge(from, to, weight));
            }

            return graph;
        }
    }
}
