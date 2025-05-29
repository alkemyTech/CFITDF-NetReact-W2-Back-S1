using System.ComponentModel.DataAnnotations;
using DigitalArs.Dtos;

namespace DigitalArs.Models
{
    public class Transaccion
    {
        [Key]
        public int ID_TRANSACCION { get; set; }
        public int ID_CUENTA_ORIGEN { get; set; }
        public int ID_CUENTA_DESTINO { get; set; }
        public double MONTO { get; set; }
        public DateTime FECHA { get; set; }
        public required string TIPO { get; set; }
    }
}
