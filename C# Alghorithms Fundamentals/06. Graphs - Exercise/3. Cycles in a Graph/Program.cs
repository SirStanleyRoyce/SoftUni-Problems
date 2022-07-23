using System;
using System.Collections.Generic;

namespace _3._Cycles_in_a_Graph
{
    internal class Program
    {
        static Dictionary<char, List<char>> graph = new Dictionary<char, List<char>>();
        static HashSet<char> visited = new HashSet<char>();
        static HashSet<char> cycle = new HashSet<char>();

        static void Main(string[] args)
        {
            string input = "";
            while (!isEnd(input))
            {
                input = Console.ReadLine();

                if (isEnd(input))
                {
                    break;
                }

                char parent = input[0];
                char child = input[2];

                if (graph.ContainsKey(parent))
                {
                    graph[parent].Add(child);
                }
                else
                {
                    graph[parent] = new List<char> { child };
                }

                if (!graph.ContainsKey(child))
                {
                    graph[child] = new List<char>();
                }
            }

            bool isAcyclic = true;

            foreach (var kvp in graph)
            {
                if (!IsAcyclicDFS(kvp.Key))
                {
                    isAcyclic = false;
                    break;
                }

                cycle.Clear();
            }

            Console.WriteLine("Acyclic: " + (isAcyclic ? "Yes" : "No"));
        }

        private static bool IsAcyclicDFS(char node)
        {
            if (cycle.Contains(node))
            {
                return false;
            }

            if (visited.Contains(node))
            {
                return true;
            }

            cycle.Add(node);
            visited.Add(node);

            foreach (var child in graph[node])
            {
                if (IsAcyclicDFS(child) == false)
                {
                    return false;
                }
            }

            cycle.Remove(node);

            return true;
        }

        static bool isEnd(string input)
        {
            return input.Trim().ToLower() == "end";
        }
    }
}
