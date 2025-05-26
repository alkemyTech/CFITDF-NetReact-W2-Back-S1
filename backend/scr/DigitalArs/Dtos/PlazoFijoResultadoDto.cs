namespace DigitalArs.Dtos
{
    public class PlazoFijoResultadoDto
    {
        public decimal Monto { get; set; }
        public int PlazoDias { get; set; }
        public decimal TasaInteres { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public double InteresGenerado { get; set; }
        public decimal MontoFinal { get; set; }
        public string Estado { get; set; }
    }
}