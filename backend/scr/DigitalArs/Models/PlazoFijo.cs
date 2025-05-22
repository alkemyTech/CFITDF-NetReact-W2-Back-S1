using DigitalArs.Dtos;

namespace DigitalArs.Entities {
    public class PlazoFijo {
        public int id_plazofijo { get; set; } // Identificador único
        public int id_usuario { get; set; } // Usuario que crea el plazo fijo
        public decimal monto { get; set; } // Monto depositado inicialmente
        public decimal tasa_interes { get; set; } // Tasa en porcentaje (ej. 10%)
        public DateTime fecha_inicio { get; set; } // Fecha de creación
        public DateTime fecha_vencimiento { get; set; } // Fecha en que finaliza el plazo fijo
        public float intereses_generados { get; set; } // Calculado según monto y tasa
        public string estado { get; set; } // "Activo", "Finalizado", "Cancelado"

    }
}
