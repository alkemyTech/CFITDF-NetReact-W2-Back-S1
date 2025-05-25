namespace DigitalArs.Dtos
{
    public class CreateCuentaDtos
    {
        public required int ID_CUENTA { get; set; }
        public required int ID_USUARIO { get; set; }
        public required Double SALDO { get; set; }
        public required  string ALIAS { get; set; }
        public required string  CBU { get; set; }
    }
}
