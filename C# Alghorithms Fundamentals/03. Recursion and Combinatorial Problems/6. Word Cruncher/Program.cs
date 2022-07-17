using System;
using System.Collections.Generic;

namespace _6._Word_Cruncher
{
    internal class Program
    {
        static string[] words;
        static string target;
        static Dictionary<int, List<string>> wordsByIndex = new Dictionary<int, List<string>>();
        static Dictionary<string, int> eachWordCount = new Dictionary<string, int>();
        static LinkedList<string> usedWords = new LinkedList<string>();

        static void Main(string[] args)
        {
            words = Console.ReadLine().Split(", ");
            target = Console.ReadLine();

            foreach (string word in words)
            {
                int index = target.IndexOf(word);

                if (index == -1)
                {
                    continue;
                }

                if (eachWordCount.ContainsKey(word))
                {
                    eachWordCount[word]++;
                    continue;
                }

                eachWordCount[word] = 1;

                while (index != -1)
                {
                    if (!wordsByIndex.ContainsKey(index))
                    {
                        wordsByIndex[index] = new List<string>();
                    }

                    wordsByIndex[index].Add(word);

                    index = target.IndexOf(word, index + 1);
                }
            }

            Solve();
        }

        private static void Solve(int index = 0)
        {
            if (index >= target.Length)
            {
                Console.WriteLine(String.Join(" ", usedWords));
                return;
            }

            if (!wordsByIndex.ContainsKey(index))
            {
                return;
            }

            foreach (string word in wordsByIndex[index])
            {
                if (eachWordCount[word] <= 0)
                {
                    continue;
                }

                eachWordCount[word]--;
                usedWords.AddLast(word);

                Solve(index + word.Length);

                usedWords.RemoveLast();
                eachWordCount[word]++;
            }
        }
    }
}
