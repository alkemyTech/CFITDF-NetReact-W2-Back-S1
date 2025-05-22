using DigitalArs.Dtos;

namespace DigitalArs.Models
{
    public class Transaccion
    {
        public int Id_transaccion { get; set; }
        public int Id_cuentaorigen { get; set; }
        public int Id_cuenta_destino { get; set; }
        public float monto { get; set; }
        public DateTime fecha { get; set; }
        public string tipo { get; set; }
    }
}
