using System;
using System.Collections.Generic;
using System.Linq;

namespace _2._Conditional_Expression_Resolver
{
    internal class Program
    {
        public static void Main()
        {
            string line = "f ? t ? 4 : 3 : t ? f ? 3 : t ? 7 : 1 : 8";
            line = string.Join("", line.Split());
            Resolve(line);
        }

        private static void Resolve(string line)
        {
            int innerOperatorStart = line.LastIndexOfAny(new char[] { 't', 'f' });
            if (innerOperatorStart == 0)
            {
                if (line[innerOperatorStart] == 't')
                {
                    Console.WriteLine(line[2]);
                    return;
                }
                Console.WriteLine(line[4]);
                return;
            }
            string result;
            if (line[innerOperatorStart] == 't')
            {
                result = line[innerOperatorStart + 2].ToString();

            }
            else { result = line[innerOperatorStart + 4].ToString(); }
            line = line.Remove(innerOperatorStart, 5);
            line = line.Insert(innerOperatorStart, result);
            Resolve(line);
        }

        /*
        static void Main(string[] args)
        {
            string exp5 = "f ? t ? 4 : 3 : t ? f ? 3 : t ? 7 : 1 : 8";
            ConditionalSolver(exp5);
        }

        static void ConditionalSolver(string exp)
        {
            if (IsExpression(exp))
            {
                Console.WriteLine(exp);
                string noTernaryOperator = exp.Substring(4);
                int elseIndex = GetOrOperatorIndex(noTernaryOperator);

                ConditionalSolver(exp.StartsWith('t')
                    ? noTernaryOperator.Substring(0, elseIndex - 3)
                    : noTernaryOperator.Substring(elseIndex));
            }
            else
            {
                Console.WriteLine(exp);
            }

        }

        private static bool IsExpression(string exp)
        {
            return exp.StartsWith("t ? ") || exp.StartsWith("f ? ");
        }

        private static int GetOrOperatorIndex(string exp)
        {
            string current = exp;
            int index = -1;

            while (!IsExpression(current) || index == -1)
            {
                int i = current.IndexOf(" : ");
                try
                {
                    current = current.Substring(i + 3);
                }
                catch { break; }
                index = exp.IndexOf(current);
            }

            Console.WriteLine(index);

            return index;
        }
        */
    }
}
