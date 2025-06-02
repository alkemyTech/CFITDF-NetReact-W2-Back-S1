namespace DigitalArs.Dtos
{
    public class CreateCuentaDto
    {
        public  int ID_USUARIO { get; set; }
        public  Double SALDO { get; set; }
        public   string ALIAS { get; set; } = string.Empty;
        public  string  CBU { get; set; } = string.Empty;
    }
}
