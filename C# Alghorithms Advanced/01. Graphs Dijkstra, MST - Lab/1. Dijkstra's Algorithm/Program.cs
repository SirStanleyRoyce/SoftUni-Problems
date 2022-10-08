using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _1._Dijkstra_s_Algorithm
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
        static Dictionary<int, List<Edge>> edgesByNode;
        static double[] distance;
        static int[] parent;
        static OrderedBag<int> bag;
        static void Main(string[] args)
        {
            edgesByNode = new Dictionary<int, List<Edge>>();

            int n = int.Parse(Console.ReadLine());

            ReadGraph(ref edgesByNode, n);

            int length = edgesByNode.Count;

            int startNode = int.Parse(Console.ReadLine());
            int endNode = int.Parse(Console.ReadLine());

            distance = new double[length];
            /*Array.Fill(distance, double.PositiveInfinity);*/ //not supported by SoftUni Judge

            parent = new int[length];
            /*Array.Fill(parent, -1);*/

            for (int i = 0; i < length; i++)
            {
                distance[i] = double.PositiveInfinity;
                parent[i] = -1;
            }
            distance[startNode] = 0;

            Djikstra(startNode, endNode);

            if (double.IsPositiveInfinity(distance[endNode]))
            {
                Console.WriteLine("There is no such path.");
            }
            else
            {
                Console.WriteLine(distance[endNode]);
                Console.WriteLine(String.Join(" ", GetNodePath(endNode, parent)));
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

                foreach (var edge in edgesByNode[minNode])
                {
                    int targetNode = edge.From == minNode
                        ? edge.To
                        : edge.From;

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

        static void ReadGraph(ref Dictionary<int, List<Edge>> graph, int length)
        {
            for (int i = 0; i < length; i++)
            {
                var edgeArgs = Console.ReadLine().Split(new[] { ", " }, StringSplitOptions.RemoveEmptyEntries).Select(int.Parse).ToArray();
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
                graph[to].Add(new Edge(to, from, weight));
            }
        }
    }
}
