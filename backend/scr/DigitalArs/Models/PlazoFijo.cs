using DigitalArs.Constantes;
using DigitalArs.Dtos;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DigitalArs.Models
{
    public class PlazoFijo
    {
        [Key]
        public int ID_PLAZOFIJO { get; set; }
        public int ID_CUENTA { get; set; }        
        public decimal MONTO { get; set; }
        public int PLAZO { get; set; }
        public decimal TASA_INTERES { get; set; }
        public DateTime FECHA_INICIO { get; set; }
        public DateTime fecha_vencimiento { get; set; }
        public double INTERES_GENERADO { get; set; }
        public required string ESTADO { get; set; }



        public void CalcularFechaVencimiento()
        {
            fecha_vencimiento = FECHA_INICIO.AddDays(PLAZO);
        }
        public void CalcularInteres()
        {
            double tasaDiaria = (double)TASA_INTERES / 100 / 365;
            INTERES_GENERADO = (double)MONTO * tasaDiaria * PLAZO;
        }
        public void ActualizarEstado()
        {
            if (ESTADO == EstadosPlazoFijo.CANCELADO)
                return;

            ESTADO = DateTime.Now >= fecha_vencimiento
                ? EstadosPlazoFijo.VENCIDO
                : EstadosPlazoFijo.VIGENTE;
        }
        public decimal ObtenerMontoTotalAlVencimiento()
        {
            return MONTO + (decimal)INTERES_GENERADO;
        }


        public void DeterminarTasaPorPlazo()
        {
            if (PLAZO <= 30)
                TASA_INTERES = 6;
            else if (PLAZO <= 60)
                TASA_INTERES = 7;
            else
                TASA_INTERES = 8;
        }


    }

}