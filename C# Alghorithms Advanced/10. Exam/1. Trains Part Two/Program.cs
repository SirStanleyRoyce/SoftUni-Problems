using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _1._Trains_Part_Two
{
    internal class Edge
    {
        private int first;
        private int second;
        private int weight;

        public Edge(int first, int second, int weight)
        {
            this.First = first;
            this.Second = second;
            this.Weight = weight;
        }

        public int First
        {
            get { return this.first; }
            private set { this.first = value; }
        }
        public int Second
        {
            get { return this.second; }
            private set { this.second = value; }
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
        static double[] distance;
        static int[] parent;
        static OrderedBag<int> bag;
        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());

            var startEndNodes = Console.ReadLine()
                .Split()
                .Select(int.Parse)
                .ToArray();

            int startNode = startEndNodes[0];
            int endNode = startEndNodes[1];

            graph = ReadGraph(edgesCount);

            distance = new double[nodesCount];
            parent = new int[nodesCount];

            for (int i = 0; i < nodesCount; i++)
            {
                distance[i] = double.PositiveInfinity;
                parent[i] = -1;
            }
            distance[startNode] = 0;

            Djikstra(startNode, endNode);

            if (!double.IsPositiveInfinity(distance[endNode]))
            {
                Console.WriteLine(String.Join(" ", GetNodePath(endNode, parent)));
                Console.WriteLine(distance[endNode]);
            }
        }

        static void Djikstra(int startNode, int endNode)
        {
            var comparer = Comparer<int>.Create((f, t) => (int)(distance[f] - distance[t]));
            bag = new OrderedBag<int>(comparer) { startNode };

            while (bag.Count > 0)
            {
                var minNode = bag.RemoveFirst();

                if (minNode == endNode)
                {
                    break;
                }

                foreach (var edge in graph[minNode])
                {
                    int targetNode = edge.First == minNode
                        ? edge.Second
                        : edge.First;

                    if (double.IsPositiveInfinity(distance[targetNode]))
                    {
                        bag.Add(targetNode);
                    }

                    double newDistance = distance[minNode] + edge.Weight;

                    if (distance[targetNode] > newDistance)
                    {
                        distance[targetNode] = newDistance;
                        parent[targetNode] = minNode;
                        bag = new OrderedBag<int>(bag, comparer);
                    }
                }
            }
        }

        static Stack<int> GetNodePath(int node, int[] parent)
        {
            var path = new Stack<int>();
            var currentNode = node;

            while (currentNode != -1)
            {
                path.Push(currentNode);
                currentNode = parent[currentNode];
            }

            return path;
        }

        static Dictionary<int, List<Edge>> ReadGraph(int length)
        {
            var graph = new Dictionary<int, List<Edge>>();

            for (int i = 0; i < length; i++)
            {
                var edgeArgs = Console.ReadLine().Split().Select(int.Parse).ToArray();
                int first = edgeArgs[0];
                int second = edgeArgs[1];
                int weight = edgeArgs[2];

                if (!graph.ContainsKey(first))
                {
                    graph[first] = new List<Edge>();
                }
                if (!graph.ContainsKey(second))
                {
                    graph[second] = new List<Edge>();
                }

                graph[first].Add(new Edge(first, second, weight));
                graph[second].Add(new Edge(second, first, weight));
            }

            return graph;
        }
    }
}
