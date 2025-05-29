using DigitalArs.Data;
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

        public async Task<PlazoFijo> CrearAsync(PlazoFijo plazoFijo)
        {
            plazoFijo.CalcularFechaVencimiento();
            plazoFijo.CalcularInteres();
            plazoFijo.ActualizarEstado();

            _context.PlazoFijo.Add(plazoFijo);
            await _context.SaveChangesAsync();

            return plazoFijo;
        }

        public async Task<PlazoFijo> ObtenerPorIdAsync(int id)
        {
            return await _context.PlazoFijo.FindAsync(id);
        }

        public async Task<IEnumerable<PlazoFijo>> ObtenerTodosAsync()
        {
            return await _context.PlazoFijo.ToListAsync();
        }

        // ✅ 1. Actualización para objetos que ya vienen cargados (como cancelar)
        public async Task ActualizarAsync(PlazoFijo pf)
        {
            _context.PlazoFijo.Update(pf);
            await _context.SaveChangesAsync();
        }

        // ✅ 2. Actualización manual (por ejemplo: editar todo el objeto desde un PUT)
        public async Task ActualizarManualAsync(PlazoFijo pf)
        {
            _context.Entry(pf).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
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