using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Nickname not specified")]
        [UIHint("Nickname")]
        [Display(Name = "Nickname")]
        public string Nickname { get; set; }

        [Required(ErrorMessage = "Password not specified")]
        [UIHint("Password")]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}