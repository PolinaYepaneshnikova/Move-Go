using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models
{
    public class PostType
    {
        [Key]
        public string Type { get; set; }
    }
}
