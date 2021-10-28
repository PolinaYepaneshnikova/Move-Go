using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models
{
    public class Workout
    {
        [Key]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Video { get; set; }
        public string Text { get; set; }
        public virtual PostType Type { get; set; }
        public string Intensity { get; set; }
    }

    public enum IntensityEnum { easy = 0, medium = 1, hard = 2 }
}
