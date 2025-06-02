using Microsoft.AspNetCore.Mvc;
using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using DigitalArs.Constantes;
using Microsoft.AspNetCore.Authorization;

namespace DigitalArs.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PlazoFijoController : ControllerBase
    {
        private readonly IPlazoFijoRepository _repo;

        public PlazoFijoController(IPlazoFijoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("obtener todos")]
        public async Task<ActionResult<IEnumerable<PlazoFijo>>> GetTodos()
        {
            var lista = await _repo.ObtenerTodosAsync();
            return Ok(lista);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PlazoFijoResultadoDto>> GetPorId(int id)
        {
            var pf = await _repo.ObtenerPorIdAsync(id);
            if (pf == null) return NotFound();

            pf.ActualizarEstado(); // actualiza a VENCIDO si es asi
            await _repo.ActualizarAsync(pf); // guarda el estado actualizado

            var dto = MapearAResultadoDto(pf);
            return Ok(dto);
        }
        // CREA EL PLAZO FIJO USANDO EL CUERPO DE CREATEPLAZOFIJODTO Y ADEMAS AGREGA LOS C�LCULOS NECESARIOS
        [HttpPost("Crear")]
        public async Task<ActionResult<PlazoFijoResultadoDto>> Crear([FromBody] CreatePlazoFijoDto dto)
        {
            try
            {
                var resultado = await _repo.CrearAsync(dto);
                return CreatedAtAction(nameof(GetPorId), new { id = resultado.FechaInicio }, resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // [HttpPut("{id}/Actualizar")]
        // public async Task<IActionResult> Actualizar(int id, [FromBody] PlazoFijo plazoFijo)
        // {
        //     plazoFijo.ID_PLAZOFIJO = id;

        //     await _repo.ActualizarAsync(plazoFijo);
        //     return NoContent();
        // }

        [HttpDelete("{id}/Eliminar")]
        public async Task<IActionResult> Eliminar(int id)
        {
            await _repo.EliminarAsync(id);
            return NoContent();
        }
        private PlazoFijoResultadoDto MapearAResultadoDto(PlazoFijo pf)
        {
            return new PlazoFijoResultadoDto
            {
                Monto = pf.MONTO,
                PlazoDias = pf.PLAZO,
                TasaInteres = pf.TASA_INTERES,
                FechaInicio = pf.FECHA_INICIO,
                FechaVencimiento = pf.fecha_vencimiento,
                InteresGenerado = pf.INTERES_GENERADO,
                MontoFinal = pf.ObtenerMontoTotalAlVencimiento(),
                Estado = pf.ESTADO
            };
        }

        [HttpPut("{id}/cancelar")]
        public async Task<IActionResult> Cancelar(int id)
        {
            var pf = await _repo.ObtenerPorIdAsync(id);
            if (pf == null) return NotFound();

            if (pf.ESTADO != EstadosPlazoFijo.VIGENTE)
                return BadRequest("Solo se puede cancelar un plazo vigente.");

            pf.ESTADO = EstadosPlazoFijo.CANCELADO;
            await _repo.ActualizarAsync(pf);

            return NoContent();
        }
        [HttpGet("usuario/{idUsuario}")]
        public async Task<ActionResult<IEnumerable<PlazoFijoResultadoDto>>> ObtenerPorUsuario(int idUsuario)
        {
            var plazos = await _repo.ObtenerPorUsuarioAsync(idUsuario);
            var resultado = plazos.Select(p => new PlazoFijoResultadoDto
            {
                Monto = p.MONTO,
                PlazoDias = p.PLAZO,
                TasaInteres = p.TASA_INTERES,
                FechaInicio = p.FECHA_INICIO,
                FechaVencimiento = p.fecha_vencimiento,
                InteresGenerado = p.INTERES_GENERADO,
                MontoFinal = p.ObtenerMontoTotalAlVencimiento(),
                Estado = p.ESTADO
            });
            return Ok(resultado);
        }

    }
}
