using Microsoft.EntityFrameworkCore;

namespace MoveAndGo.Models
{
    [Keyless]
    public class AdminNotification
    {
        public string ItemId { get; set; }
        public string Text { get; set; }
    }
}