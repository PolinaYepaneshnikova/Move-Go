using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models
{
    public class FavoriteWorkout
    {
        [Key]
        public string Id { get; set; }
        public string FollowerName { get; set; }
        public string FollowingId { get; set; }
    }
}
