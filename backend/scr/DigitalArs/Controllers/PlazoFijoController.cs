using Microsoft.AspNetCore.Mvc;
using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using DigitalArs.Constantes;

namespace DigitalArs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlazoFijoController : ControllerBase
    {
        private readonly IPlazoFijoRepository _repo;

        public PlazoFijoController(IPlazoFijoRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
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
        // CREA EL PLAZO FIJO USANDO EL CUERPO DE CREATEPLAZOFIJODTO Y ADEMAS AGREGA LOS CÁLCULOS NECESARIOS
        [HttpPost]
        public async Task<ActionResult<PlazoFijoResultadoDto>> Crear([FromBody] CreatePlazoFijoDto dto)
        {
            var plazoFijo = new PlazoFijo
            {
                MONTO = dto.Monto,
                PLAZO = dto.Plazo,
                FECHA_INICIO = dto.Fecha_Inicio,
                ID_CUENTA = dto.UsuarioId,
                ESTADO = EstadosPlazoFijo.VIGENTE
            };

            plazoFijo.DeterminarTasaPorPlazo();
            plazoFijo.CalcularInteres();
            plazoFijo.CalcularFechaVencimiento();
            plazoFijo.ActualizarEstado();

            var creado = await _repo.CrearAsync(plazoFijo);
            var resultado = MapearAResultadoDto(creado);

            return CreatedAtAction(nameof(GetPorId), new { id = creado.ID_PLAZOFIJO }, resultado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] PlazoFijo plazoFijo)
        {
            plazoFijo.ID_PLAZOFIJO = id;

            await _repo.ActualizarAsync(plazoFijo);
            return NoContent();
        }

        [HttpDelete("{id}")]
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

    }
}
