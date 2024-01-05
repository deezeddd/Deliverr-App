using System.ComponentModel.DataAnnotations;

namespace Exit_Test_WebApi.Models
{
    public class SignUpUserModel
    {
        [Key]
        public int Id { get; set; }
       
        [Required]
        public string Name { get; set; }
       
        [Required]
        public string Phone { get; set; }
       
        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("ConfirmPassword")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string ConfirmPassword { get; set; }
    }
}
