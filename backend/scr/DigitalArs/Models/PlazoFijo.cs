using DigitalArs.Dtos;
using System.ComponentModel.DataAnnotations;

namespace DigitalArs.Entities {
    public class PlazoFijo {
        [Key]
        public int ID_PLAZOFIJO { get; set; } 
        public int ID_CUENTA { get; set; } 
        public decimal MONTO { get; set; } 
        public int PLAZO { get; set; }
        public decimal TASA_INTERES { get; set; } 
        public DateTime FECHA_INICIO { get; set; } 
        public DateTime fecha_vencimiento { get; set; } 
        public double INTERES_GENERADO { get; set; } 
        public required string ESTADO { get; set; } 

    }
}
