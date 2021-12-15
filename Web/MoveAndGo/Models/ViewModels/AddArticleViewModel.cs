using Microsoft.AspNetCore.Http;

using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models.ViewModels
{
    public class AddArticleViewModel
    {
        [Required(ErrorMessage = "Title not specified")]
        [UIHint("Title")]
        [Display(Name = "Title")]
        public string Title { get; set; }

        [UIHint("Image")]
        [Display(Name = "Image")]
        public IFormFile Image { get; set; }

        [Required(ErrorMessage = "Type not specified")]
        [UIHint("Type")]
        [Display(Name = "Type")]
        public string Type { get; set; }

        [UIHint("Text")]
        [Display(Name = "Text")]
        public string Text { get; set; }
    }
}
