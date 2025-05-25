using Microsoft.AspNetCore.Mvc;
using DigitalArs.Entities;
using DigitalArs.Interfaces;

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
        public async Task<ActionResult<PlazoFijo>> GetPorId(int id)
        {
            var plazo = await _repo.ObtenerPorIdAsync(id);
            if (plazo == null) return NotFound();
            return Ok(plazo);
        }

        [HttpPost]
        public async Task<ActionResult<PlazoFijo>> Crear([FromBody] PlazoFijo plazoFijo)
        {
            var creado = await _repo.CrearAsync(plazoFijo);
            return CreatedAtAction(nameof(GetPorId), new { id = creado.ID_PLAZOFIJO }, creado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Actualizar(int id, [FromBody] PlazoFijo plazoFijo)
        {
            if (id != plazoFijo.ID_PLAZOFIJO)
                return BadRequest("ID no coincide.");

            await _repo.ActualizarAsync(plazoFijo);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            await _repo.EliminarAsync(id);
            return NoContent();
        }
    }
}
