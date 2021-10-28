using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Text.Json.Serialization;

namespace MoveAndGo.Models
{
    public class PostType
    {
        [Key]
        public string Type { get; set; }

        [JsonIgnore]
        [InverseProperty("Type")]
        public virtual ICollection<Workout> Workouts { get; set; }/* = new List<Workout>();*/
    }
}
