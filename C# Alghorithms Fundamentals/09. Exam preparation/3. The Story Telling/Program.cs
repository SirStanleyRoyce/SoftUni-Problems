using System;
using System.Linq;
using System.Collections.Generic;

namespace _3._The_Story_Telling
{
    internal class Program
    {
        static Dictionary<string, List<string>> graph = new Dictionary<string, List<string>>();
        static HashSet<string> visited = new HashSet<string>();
        static Stack<string> sorted = new Stack<string>();

        static void Main(string[] args)
        {
            string line = string.Empty;
            while (true)
            {
                line = Console.ReadLine();
                if (line == "End")
                {
                    break;
                }

                string[] nodeAndChildren = line.Split(" ->", StringSplitOptions.RemoveEmptyEntries);
                string node = nodeAndChildren[0];
                if (nodeAndChildren.Length > 1)
                {
                    List<string> children = nodeAndChildren[1].Split(" ", StringSplitOptions.RemoveEmptyEntries).ToList();
                    graph[node] = children;
                }
                else
                {
                    graph[node] = new List<string>();
                }

            }

            foreach (var node in graph.Keys)
            {
                DFS(node);
            }

            Console.WriteLine(String.Join(" ", sorted));
        }

        private static void DFS(string node)
        {
            if (visited.Contains(node))
            {
                return;
            }

            visited.Add(node);

            foreach (var child in graph[node])
            {
                DFS(child);
            }

            sorted.Push(node);
        }
    }
}
