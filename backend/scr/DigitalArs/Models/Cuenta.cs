using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using DigitalArs.Dtos;

namespace DigitalArs.Models
{
    [Table("CUENTA")]
    public class Cuenta
    {
        [Key]  // Define 'Id' como clave primaria
        public int ID_CUENTA { get; set; }
        public int ID_USUARIO { get; set; }
        public Double SALDO { get; set; }
        public required string ALIAS { get; set; }
        public required string CBU { get; set; }
    }
}
