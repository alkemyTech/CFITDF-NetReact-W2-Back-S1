using System.ComponentModel.DataAnnotations;
using DigitalArs.Dtos;

namespace DigitalArs.Models
{
    public class Transaccion
    {
        [Key]
        public int Id_transaccion { get; set; }
        public int ID_CUENTA_ORIGEN { get; set; }
        public int Id_cuenta_destino { get; set; }
        public double monto { get; set; }
        public DateTime fecha { get; set; }
        public string tipo { get; set; }
    }
}
