using System;
using System.Collections.Generic;
using System.Linq;

namespace _3._Find_Bi_Connected_Components
{
    internal class Program
    {
        private static List<int>[] graph;
        private static int[] parent;
        private static bool[] visited;
        private static int[] depth;
        private static int[] lowpoint;
        private static Stack<int> stack;
        private static int componentsCount;

        static void Main(string[] args)
        {
            int nodesCount = int.Parse(Console.ReadLine());
            int lines = int.Parse(Console.ReadLine());

            graph = new List<int>[nodesCount];
            parent = new int[nodesCount];
            depth = new int[nodesCount];
            lowpoint = new int[nodesCount];
            visited = new bool[nodesCount];
            stack = new Stack<int>();

            for (int i = 0; i < nodesCount; i++)
            {
                graph[i] = new List<int>();
                parent[i] = -1;
                depth[i] = int.MaxValue;
                lowpoint[i] = int.MaxValue;
            }

            for (int i = 0; i < lines; i++)
            {
                var edgeArgs = Console.ReadLine()
                    .Split()
                    .Select(int.Parse);

                var node = edgeArgs.First();
                var child = edgeArgs.Last();

                graph[node].Add(child);
                graph[child].Add(node);
            }

            for (int node = 0; node < nodesCount; node++)
            {
                if (visited[node])
                {
                    continue;
                }

                FindArticularPoints(node, 1);
            }

            if (stack.Count > 0)
            {
                componentsCount++;
            }

            Console.WriteLine("Number of bi-connected components: " + componentsCount);
        }

        private static void FindArticularPoints(int node, int d)
        {
            visited[node] = true;
            depth[node] = d;
            lowpoint[node] = d;

            int childrenCount = 0;

            foreach (var child in graph[node])
            {
                if (!visited[child])
                {
                    stack.Push(node);
                    stack.Push(child);

                    parent[child] = node;

                    FindArticularPoints(child, d + 1);

                    childrenCount++;

                    if (parent[node] != -1 && lowpoint[child] >= depth[node]
                        || parent[node] == -1 && childrenCount > 1)
                    {
                        while (true)
                        {
                            var stackChild = stack.Pop();
                            var stackNode = stack.Pop();


                            if (stackChild == child
                                && stackNode == node)
                            {
                                componentsCount++;
                                break;
                            }
                        }
                    }

                    lowpoint[node] = Math.Min(lowpoint[node], lowpoint[child]);
                }
                else if (parent[node] != child
                    && depth[child] < lowpoint[node])
                {
                    lowpoint[node] = depth[child];

                    stack.Push(node);
                    stack.Push(child);
                }
            }
        }
    }
}
