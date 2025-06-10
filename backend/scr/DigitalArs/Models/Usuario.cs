using DigitalArs.Dtos;
using System.ComponentModel.DataAnnotations;


namespace DigitalArs.Models {
    public class Usuario {
        [Key]
        public int ID_USUARIO { get; set; }
        public required string NOMBRE { get; set; }
        public required string EMAIL { get; set;}
        public DateTime CREATION_DATE { get; set; }
        public required string PASS { get; set;}
        public required int ID_ROL { get; set; }
        public DateTime? FECHA_BAJA { get; set; }
    }
}