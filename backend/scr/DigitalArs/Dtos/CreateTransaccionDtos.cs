namespace DigitalArs.Dtos
{
    public class CreateTransaccionDtos
    {
        public required int ID_CUENTA_ORIGEN { get; set; }
        public required int ID_CUENTA_DESTINO { get; set; }
        public required float MONTO { get; set; }
        public required DateTime FECHA { get; set; }
    }
}
