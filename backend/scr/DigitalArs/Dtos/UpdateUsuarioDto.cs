using System.ComponentModel.DataAnnotations;
using DigitalArs.Models;

namespace DigitalArs.Dtos
{
    public class UpdateUsuarioDto
    {
        public required string NOMBRE { get; set; }
        [EmailAddress]
        public required string EMAIL { get; set; }
        public required string PASS { get; set; }
    }
}