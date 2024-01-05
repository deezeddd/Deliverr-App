﻿using System.ComponentModel.DataAnnotations;

namespace Exit_Test_WebApi.Models
{
    public class LoginUserModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
