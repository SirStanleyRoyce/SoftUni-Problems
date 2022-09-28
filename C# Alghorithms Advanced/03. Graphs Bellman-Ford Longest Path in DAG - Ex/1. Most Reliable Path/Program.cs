using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _1._Most_Reliable_Path
{
    internal class Edge
    {
        private int from;
        private int to;
        private double reliabilityPercentage;

        public Edge(int from, int to, int reliabilityPercentage)
        {
            this.From = from;
            this.To = to;
            this.ReliabilityPercentage = reliabilityPercentage;
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
        public double ReliabilityPercentage
        {
            get { return this.reliabilityPercentage; }
            private set { this.reliabilityPercentage = value; }
        }
    }

    internal class Program
    {
        static Dictionary<int, List<Edge>> graph;
        static Dictionary<int, double> reliability;
        static Dictionary<int, int> parent;

        static void Main(string[] args)
        {
            graph = new Dictionary<int, List<Edge>>();
            reliability = new Dictionary<int, double>();
            parent = new Dictionary<int, int>();

            ReadGraph();

            int start = int.Parse(Console.ReadLine());
            int destination = int.Parse(Console.ReadLine());

            reliability[start] = 100;

            LongestPathDijkstra(start, destination);
        }

        private static void LongestPathDijkstra(int start, int destination)
        {
            var comparer = Comparer<int>.Create((f, s) => (int)(reliability[s] - reliability[f]));
            var bag = new OrderedBag<int>(comparer) { start };


            while (bag.Count > 0)
            {
                var node = bag.RemoveFirst();

                if (node == destination)
                {
                    break;
                }

                foreach (var edge in graph[node])
                {
                    var otherNode = node == edge.From
                        ? edge.To
                        : edge.From;

                    if (double.IsNegativeInfinity(reliability[otherNode]))
                    {
                        bag.Add(otherNode);
                    }

                    double newReliability = reliability[node] * (edge.ReliabilityPercentage / 100);

                    if (newReliability > reliability[otherNode])
                    {
                        reliability[otherNode] = newReliability;
                        parent[otherNode] = node;

                        bag = new OrderedBag<int>(bag, comparer);
                    }
                }
            }

            Console.WriteLine($"Most reliable path reliability: {reliability[destination].ToString("F2")}%");
            Console.WriteLine(String.Join(" -> ", GetNodePath(start, destination)));
        }

        private static Stack<int> GetNodePath(int start, int destination)
        {
            var path = new Stack<int>();
            var node = destination;

            while(node != -1)
            {
                path.Push(node);
                node = parent[node];
            }

            return path;
        }

        private static void ReadGraph()
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());

            for (int i = 0; i < edgesCount; i++)
            {
                int[] args = Console.ReadLine()
                    .Split(new[] {" "}, StringSplitOptions.RemoveEmptyEntries)
                    .Select(int.Parse)
                    .ToArray();

                var edge = new Edge(args);

                // graph
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

                // distance
                if (!reliability.ContainsKey(edge.From))
                {
                    reliability.Add(edge.From, double.NegativeInfinity);
                }
                if (!reliability.ContainsKey(edge.To))
                {
                    reliability.Add(edge.To, double.NegativeInfinity);
                }

                // parent
                if (!parent.ContainsKey(edge.From))
                {
                    parent.Add(edge.From, -1);
                }
                if (!parent.ContainsKey(edge.To))
                {
                    parent.Add(edge.To, -1);
                }
            }
        }
    }
}
