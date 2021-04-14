using System;
using System.Collections.Generic;
using TaskAPI.Models;

namespace TaskAPI.Controllers
{
    public class Generators
    {
        private static readonly Random Random = new Random();
        private static readonly Random RandomBool = new Random();

        private static readonly List<string> Actions = new List<string>
        {
            "call", "read", "dress", "buy", "ring", "hop", "skip", "jump", "look", "rob", "find", "fly", "go", "ask",
            "raise", "search"
        };

        private static readonly List<string> Bridges = new List<string>
        {
            "the", "a", "an", "my", "as", "by", "to", "in", "on", "with"
        };

        private static readonly List<string> Targets = new List<string>
        {
            "dog", "doctor", "store", "dance", "jig", "friend", "enemy", "business", "bull", "Monday", "Tuesday",
            "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Mom", "Dad"
        };

        public static string RandomWord(List<string> list)
        {
            return list[Random.Next(list.Count)];
        }

        public List<Task> GenerateRandomTasks(int count)
        {
            var list = new List<Task>();

            for (var i = 0; i < count; i++)
            {
                list.Add(new Task() {
                    Id = i+1,
                    Title = $"{RandomWord(Actions)} {RandomWord(Bridges)} {RandomWord(Targets)}",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin scelerisque lectus at purus faucibus molestie.Nam non sem ut metus pellentesque faucibus. Sed imperdiet egestas sem, eget varius eros rhoncus ac.",
                    Completed = RandomBool.Next(0,2) > 0
                });
            }

            return list;
        }
    }
}