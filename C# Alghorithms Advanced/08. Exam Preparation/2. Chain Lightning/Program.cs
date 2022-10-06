using System;
using System.Collections.Generic;
using System.Linq;
using Wintellect.PowerCollections;

namespace _2._Chain_Lightning
{
    internal class Edge
    {
        public int First { get; set; }
        public int Second { get; set; }
        public int Weight { get; set; }
    }
    internal class Program
    {
        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());
            int lightningsCount = int.Parse(Console.ReadLine());

            var graph = new List<Edge>[nodesCount];

            for (int i = 0; i < graph.Length; i++)
            {
                graph[i] = new List<Edge>();
            }

            for (int i = 0; i < edgesCount; i++)
            {
                var input = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                var first = input[0];
                var second = input[1];
                var weight = input[2];

                var edge = new Edge
                {
                    First = first,
                    Second = second,
                    Weight = weight
                };

                graph[first].Add(edge);
                graph[second].Add(edge);
            }

            var damageTaken = new int[nodesCount];
            for (int i = 0; i < lightningsCount; i++)
            {
                var line = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                var startNode = line[0];
                var damage = line[1];

                Prim(graph, damageTaken, damage, startNode);
            }

            Console.WriteLine(damageTaken.Max());
        }

        private static void Prim(List<Edge>[] graph,
            int[] damageTaken,
            int damage,
            int node)
        {
            var tree = new HashSet<int> { node };
            var depth = new int[graph.Length];
            damageTaken[node] += damage;

            var comparer = Comparer<Edge>.Create((f, s) => f.Weight.CompareTo(s.Weight));
            var bag = new OrderedBag<Edge>(comparer);
            bag.AddMany(graph[node]);

            while (bag.Count > 0)
            {
                var minEdge = bag.RemoveFirst();

                var nonTreeNode = -1;
                var treeNode = -1;

                if (tree.Contains(minEdge.First)
                    && !tree.Contains(minEdge.Second))
                {
                    nonTreeNode = minEdge.Second;
                    treeNode = minEdge.First;
                }
                else if (tree.Contains(minEdge.Second)
                    && !tree.Contains(minEdge.First))
                {
                    nonTreeNode = minEdge.First;
                    treeNode = minEdge.Second;
                }

                if (nonTreeNode == -1)
                {
                    continue;
                }

                bag.AddMany(graph[nonTreeNode]);
                tree.Add(nonTreeNode);

                depth[nonTreeNode] = depth[treeNode] + 1;

                damageTaken[nonTreeNode] += damage / (int)Math.Pow(2, depth[nonTreeNode]);
            }
        }
    }


    // not fully working solution
    /*internal class Program
    {
        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int edgesCount = int.Parse(Console.ReadLine());
            int lightningsCount = int.Parse(Console.ReadLine());

            List<Edge> edges = new List<Edge>();
            Dictionary<int, int> parent = new Dictionary<int, int>();

            for (int i = 0; i < edgesCount; i++)
            {
                var input = Console.ReadLine()
                    .Split()
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

            var mst = KruskalMST(edges, parent);

            var damageTaken = new int[nodesCount];
            for (int i = 0; i < lightningsCount; i++)
            {
                var line = Console.ReadLine()
                    .Split()
                    .Select(int.Parse)
                    .ToArray();

                var startNode = line[0];
                var damage = line[1];

                var visited = new bool[nodesCount];

                LightningDFS(mst, visited, damageTaken, damage, startNode);
            }

            Console.WriteLine(damageTaken.Max());
        }

        private static void LightningDFS(List<Edge> mst,
            bool[] visited,
            int[] damageTaken,
            int damage,
            int node)
        {
            if (visited[node])
            {
                return;
            }

            visited[node] = true;

            damageTaken[node] += damage;

            var edges = mst.Where(edge => edge.From == node || edge.To == node);
            foreach (var edge in edges)
            {
                var targetNode = node == edge.From
                    ? edge.To
                    : edge.From;

                LightningDFS(mst, visited, damageTaken, damage / 2,
                    targetNode);
            }
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
    }*/
}
