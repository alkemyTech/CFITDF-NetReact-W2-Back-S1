using DigitalArs.Constantes;
using DigitalArs.Data;
using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using Microsoft.EntityFrameworkCore;

namespace DigitalArs.Repositories
{
    public class PlazoFijoRepository : IPlazoFijoRepository
    {
        private readonly AppDbContext _context;

        public PlazoFijoRepository(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Crear
        public async Task<PlazoFijoResultadoDto> CrearAsync(CreatePlazoFijoDto dto)
        {
            // Buscar la cuenta asociada al usuario
            var cuenta = await _context.Cuenta.FirstOrDefaultAsync(c => c.ID_USUARIO == dto.UsuarioId);
            if (cuenta == null)
                throw new InvalidOperationException("El usuario no tiene una cuenta asociada.");
            // Validar fondos
            if ((decimal)cuenta.SALDO < dto.Monto)
                throw new InvalidOperationException("Fondos insuficientes.");

            // Crear el plazo fijo
            var plazoFijo = new PlazoFijo
            {
                MONTO = dto.Monto,
                PLAZO = dto.Plazo,
                FECHA_INICIO = dto.Fecha_Inicio,
                ID_CUENTA = cuenta.ID_CUENTA,
                ESTADO = EstadosPlazoFijo.VIGENTE
            };

            plazoFijo.DeterminarTasaPorPlazo();
            plazoFijo.CalcularFechaVencimiento();
            plazoFijo.CalcularInteres();
            plazoFijo.ActualizarEstado();

            // ✅ Descontar el dinero de la cuenta
            cuenta.SALDO = (double)((decimal)cuenta.SALDO - dto.Monto);

            _context.PlazoFijo.Add(plazoFijo);
            await _context.SaveChangesAsync();

            return new PlazoFijoResultadoDto
            {
                Monto = plazoFijo.MONTO,
                PlazoDias = plazoFijo.PLAZO,
                TasaInteres = plazoFijo.TASA_INTERES,
                FechaInicio = plazoFijo.FECHA_INICIO,
                FechaVencimiento = plazoFijo.fecha_vencimiento,
                InteresGenerado = plazoFijo.INTERES_GENERADO,
                MontoFinal = plazoFijo.ObtenerMontoTotalAlVencimiento(),
                Estado = plazoFijo.ESTADO
            };
        }

        // ✅ Obtener por ID
        public async Task<PlazoFijo> ObtenerPorIdAsync(int id)
        {
            return await _context.PlazoFijo.FindAsync(id);
        }

        // ✅ Obtener todos
        public async Task<IEnumerable<PlazoFijo>> ObtenerTodosAsync()
        {
            return await _context.PlazoFijo.ToListAsync();
        }
        // ✅ Obtener por usuario
        public async Task<IEnumerable<PlazoFijo>> ObtenerPorUsuarioAsync(int idUsuario)
        {
            var cuentas = await _context.Cuenta
                .Where(c => c.ID_USUARIO == idUsuario)
                .Select(c => c.ID_CUENTA)
                .ToListAsync();

            return await _context.PlazoFijo
                .Where(pf => cuentas.Contains(pf.ID_CUENTA))
                .ToListAsync();
        }

        // ✅ Actualizar (normal)
        public async Task ActualizarAsync(PlazoFijo pf)
        {
            _context.PlazoFijo.Update(pf);
            await _context.SaveChangesAsync();
        }

        // ✅ Actualizar (manual/PUT)
        public async Task ActualizarManualAsync(PlazoFijo pf)
        {
            _context.Entry(pf).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        // ✅ Eliminar
        public async Task EliminarAsync(int id)
        {
            var plazoFijo = await ObtenerPorIdAsync(id);
            if (plazoFijo != null)
            {
                _context.PlazoFijo.Remove(plazoFijo);
                await _context.SaveChangesAsync();
            }
        }

    }
}
