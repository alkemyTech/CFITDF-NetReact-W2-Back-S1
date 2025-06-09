namespace DigitalArs.Dtos {
    public class CreateUsuarioDto {
        public required string NOMBRE { get; set; }
        public required string EMAIL { get; set; }
        public required string PASS { get; set; }
        public required int ID_ROL { get; set; }
    }
}