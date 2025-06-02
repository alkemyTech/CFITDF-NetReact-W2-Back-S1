using System.Collections.Generic;
using System.Threading.Tasks;
using DigitalArs.Dtos;
using DigitalArs.Models;

namespace DigitalArs.Interfaces
{
    public interface IPlazoFijoRepository
    {
        Task<PlazoFijoResultadoDto> CrearAsync(CreatePlazoFijoDto dto);
        Task<PlazoFijo> ObtenerPorIdAsync(int id);
        Task<IEnumerable<PlazoFijo>> ObtenerTodosAsync();
        Task<IEnumerable<PlazoFijo>> ObtenerPorUsuarioAsync(int idUsuario);
        Task ActualizarAsync(PlazoFijo plazoFijo);
       Task ActualizarManualAsync(PlazoFijo plazoFijo);
        Task EliminarAsync(int id);
        
   
    }
}

