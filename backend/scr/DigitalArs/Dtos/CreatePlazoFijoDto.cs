namespace DigitalArs.Dtos
{
    public class CreatePlazoFijoDto
    {
        public decimal Monto { get; set; }
        public int PlazoDias { get; set; }
        public double TasaInteres { get; set; }
        public DateTime FechaInicio { get; set; }
        public int UsuarioId { get; set; }
    }
    }