namespace DigitalArs.Dtos
{
    public class CreatePlazoFijoDto
    {
        public decimal Monto { get; set; }
        public int Plazo { get; set; }
        public DateTime Fecha_Inicio { get; set; }
        public int UsuarioId { get; set; }

    }
}