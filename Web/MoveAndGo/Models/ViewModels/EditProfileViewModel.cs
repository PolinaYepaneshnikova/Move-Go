using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace MoveAndGo.Models.ViewModels
{
    public class EditProfileViewModel
    {
        [UIHint("Avatar")]
        [Display(Name = "Avatar")]
        public IFormFile Avatar { get; set; }

        [UIHint("Full name")]
        [Display(Name = "Full name")]
        public string FullName { get; set; }

        [UIHint("Bio")]
        [Display(Name = "Bio")]
        public string Bio { get; set; }

        [UIHint("Email")]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [UIHint("PhoneNumber")]
        [Display(Name = "PhoneNumber")]
        public string PhoneNumber { get; set; }

        [UIHint("NewPassword")]
        [Display(Name = "NewPassword")]
        public string NewPassword { get; set; }

        [Display(Name = "Confirm the entered password")]
        [UIHint("NewPassword")]
        [Compare("NewPassword", ErrorMessage = "Password mismatch")]
        public string ConfirmNewPassword { get; set; }

        [UIHint("OldPassword")]
        [Display(Name = "OldPassword")]
        public string OldPassword { get; set; }
    }
}
