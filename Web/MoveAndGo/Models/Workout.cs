using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Text.Json.Serialization;

namespace MoveAndGo.Models
{
    public class Workout
    {
        [Key]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Video { get; set; }
        public string Text { get; set; }

        [ForeignKey("PostType")]
        public virtual string TypeId { get; set; }
        public string Intensity { get; set; }

        [JsonIgnore]
        public virtual PostType Type { get; set; }
    }

    public enum IntensityEnum { easy = 0, medium = 1, hard = 2 }
}
