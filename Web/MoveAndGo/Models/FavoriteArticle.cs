﻿using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models
{
    public class FavoriteArticle
    {
        [Key]
        public string Id { get; set; }
        public string FollowerName { get; set; }
        public string FollowingName { get; set; }
    }
}
