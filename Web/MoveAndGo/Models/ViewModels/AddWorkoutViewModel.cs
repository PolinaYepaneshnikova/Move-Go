using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models.ViewModels
{
    public class AddWorkoutViewModel
    {
        [Required(ErrorMessage = "Title not specified")]
        [UIHint("Title")]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [UIHint("Video")]
        [Display(Name = "Video")]
        public IFormFile Video { get; set; }

        [Required(ErrorMessage = "Type not specified")]
        [UIHint("Type")]
        [Display(Name = "Type")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Level not specified")]
        [UIHint("Level")]
        [Display(Name = "Level")]
        public string Level { get; set; }

        [UIHint("Description")]
        [Display(Name = "Description")]
        public string Description { get; set; }
    }
}
