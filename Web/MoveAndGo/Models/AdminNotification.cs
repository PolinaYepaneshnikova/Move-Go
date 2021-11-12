using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Text.Json.Serialization;

namespace MoveAndGo.Models
{
    public class AdminNotification
    {
        [Key]
        public string Id { get; set; }
        public string ItemLink { get; set; }
        public string Text { get; set; }
    }
}