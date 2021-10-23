using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models.ViewModels
{
    public class RegistrationViewModel
    {
        [Required(ErrorMessage = "Email not specified")]
        [UIHint("Email")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [UIHint("Full name")]
        [Display(Name = "Full name")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Nickname not specified")]
        [UIHint("Nickname")]
        [Display(Name = "Nickname")]
        public string Nickname { get; set; }

        [Required(ErrorMessage = "Password not specified")]
        [UIHint("Password")]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Display(Name = "Confirm the entered password")]
        [UIHint("Password")]
        [Compare("Password", ErrorMessage = "Password mismatch")]
        public string ConfirmPassword { get; set; }
    }
}
