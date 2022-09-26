using System;
using System.Collections.Generic;
using System.Linq;

namespace _1._Trains
{
    internal class Program
    {
        static void Main(string[] args)
        {
            double[] arrivals = Console.ReadLine().Split().Select(double.Parse).ToArray();
            double[] departures = Console.ReadLine().Split().Select(double.Parse).ToArray();

            int count = 0;
            Queue<double> queue = new Queue<double>();
            int departureIndex = 0, arrivalIndex = 1;
            while (arrivalIndex < arrivals.Length && departureIndex < departures.Length)
            {
                double arrival = arrivals[arrivalIndex];
                double departure = departures[departureIndex];

                if (arrival < departure)
                {
                    queue.Enqueue(arrival);
                }
                else
                {
                    queue.Clear();

                    int newDepartureIndex = departureIndex;
                    for (; newDepartureIndex < arrivalIndex; newDepartureIndex++)
                    {
                        if (departures[newDepartureIndex] > arrival)
                        {
                            queue.Enqueue(arrival);
                            break;
                        }
                    }

                    departureIndex = newDepartureIndex;
                }

                arrivalIndex++;

                if (queue.Count > count) count = queue.Count;
            }

            Console.WriteLine(count);
        }
    }
}
