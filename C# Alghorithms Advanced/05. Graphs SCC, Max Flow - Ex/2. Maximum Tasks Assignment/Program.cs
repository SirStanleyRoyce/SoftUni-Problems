using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Maximum_Tasks_Assignment
{
    internal class Program
    {
        static bool[,] graph;
        static int?[] parent;
        static void Main(string[] args)
        {
            int people = int.Parse(Console.ReadLine());
            int tasks = int.Parse(Console.ReadLine());

            int nodes = people + tasks + 2;

            graph = new bool[nodes, nodes];
            parent = new int?[nodes];

            for (int person = 1; person <= people; person++)
            {
                graph[0, person] = true;

                var personTasks = Console.ReadLine();

                for (int task = 0; task < tasks; task++)
                {
                    graph[person, people + task + 1] = personTasks[task] == 'Y'
                        ? true
                        : false;
                }
            }

            for (int task = people + 1; task <= people + tasks; task++)
            {
                graph[task, nodes - 1] = true;
            }

            var source = 0;
            var target = nodes - 1;

            while (BFS(source, target))
            {
                var node = target;
                while (parent[node] != null)
                {
                    int prev = (int)parent[node];
                    graph[prev, node] = false;
                    graph[node, prev] = true;
                    node = prev;
                }
            }

            for (int task = people + 1; task <= people + tasks; task++)
            {
                for (int person = 1; person <= people; person++)
                {
                    if (graph[task, person])
                    {
                        Console.WriteLine($"{(char)(64 + person)}-{task - people}");
                    }
                }
            }
        }

        private static bool BFS(int source, int target)
        {
            var visited = new bool[graph.GetLength(0)];
            visited[source] = true;

            var queue = new Queue<int>();
            queue.Enqueue(source);

            while (queue.Count > 0)
            {
                var node = queue.Dequeue();

                for (int child = 0; child < graph.GetLength(0); child++)
                {
                    if (!visited[child]
                        && graph[node, child])
                    {
                        parent[child] = node;
                        visited[child] = true;
                        queue.Enqueue(child);
                    }
                }
            }

            return visited[target];
        }
    }
}
