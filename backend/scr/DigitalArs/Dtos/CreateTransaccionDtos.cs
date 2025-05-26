namespace DigitalArs.Dtos
{
    public class CreateTransaccionDtos
    {
        public required int Id_transaccion { get; set; }
        public required int ID_CUENTA_ORIGEN { get; set; }
        public required int Id_cuenta_destino { get; set; }
        public required float monto { get; set; }
        public required DateTime fecha { get; set; }
        public required string tipo { get; set; }
    }
}
