using DigitalArs.Dtos;

namespace DigitalArs.Models
{
    public class Cuenta
    {
        public  int ID_CUENTA { get; set; }
        public  int ID_USUARIO { get; set; }
        public  float SALDO { get; set; }
        public  string ALIAS { get; set; }
        public  string  CBU { get; set; }
    }
}
