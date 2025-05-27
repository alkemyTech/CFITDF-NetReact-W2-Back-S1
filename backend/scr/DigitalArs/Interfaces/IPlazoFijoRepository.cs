using System.Collections.Generic;
using System.Threading.Tasks;
using DigitalArs.Entities;
using DigitalArs.Models;

namespace DigitalArs.Interfaces
{
    public interface IPlazoFijoRepository
    {
        Task<PlazoFijo> CrearAsync(PlazoFijo plazoFijo);
        Task<PlazoFijo> ObtenerPorIdAsync(int id);
        Task<IEnumerable<PlazoFijo>> ObtenerTodosAsync();
        Task ActualizarAsync(PlazoFijo plazoFijo);
    
        Task EliminarAsync(int id);
    }
}

