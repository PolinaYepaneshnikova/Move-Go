using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Text.Json.Serialization;

namespace MoveAndGo.Models
{
    public class Article
    {
        [Key]
        public string Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public string Image { get; set; }
        public string Text { get; set; }

        [ForeignKey("PostType")]
        public virtual string TypeId { get; set; }

        public DateTime Datetime { get; set; }

        [JsonIgnore]
        public virtual PostType Type { get; set; }
    }
}
