using System;
using System.Linq;
using System.Collections.Generic;

namespace _4._Salaries
{
    internal class Program
    {
        static List<int>[] graph;
        static Dictionary<int, int> empSalaryPairs = new Dictionary<int, int>();

        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            graph = new List<int>[n];

            for (int i = 0; i < n; i++)
            {
                graph[i] = new List<int>();

                string line = Console.ReadLine();
                for (int j = 0; j < n; j++)
                {
                    if (line[j] == 'Y')
                    {
                        graph[i].Add(j);
                    }
                }
            }

            int salary = 0;
            for (int node = 0; node < n; node++)
            {
                salary += DFS(node);
            }


            Console.WriteLine(salary);
        }

        private static int DFS(int node)
        {
            if (empSalaryPairs.ContainsKey(node))
            {
                return empSalaryPairs[node];
            }

            int salary = 0;

            if (graph[node].Count == 0)
            {
                salary = 1;
            }
            else
            {
                foreach (var child in graph[node])
                {
                    salary += DFS(child);
                }
            }

            empSalaryPairs[node] = salary;
            return salary;
        }
    }
}
