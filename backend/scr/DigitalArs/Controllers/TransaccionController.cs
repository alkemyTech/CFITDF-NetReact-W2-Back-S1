using DigitalArs.Dtos;
using DigitalArs.Interfaces;
using DigitalArs.Models;
using Microsoft.AspNetCore.Http.Timeouts;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Diagnostics.Contracts;
using System.Threading.Tasks.Dataflow;

namespace DigitalArs.Controllers;

[Route("/api/[controller]")]
[ApiController]

public class TransaccionController : ControllerBase
{
    private ITransaccionRepository _transaccionRepository;

    public TransaccionController(ITransaccionRepository transaccionRepository)
    {
        _transaccionRepository = transaccionRepository;
    }

    [HttpGet]
    public ActionResult<Transaccion[]> GetTransacciones()
    {
        return Ok(_transaccionRepository.GetAllTransacciones());
    }

    [HttpGet("{id}")]
    public ActionResult<Transaccion> GetTransaccion(int Id)
    {
        if (_transaccionRepository.GetTransaccionById(Id) is Transaccion transaccion)
        {
            return Ok(transaccion);
        }

        return NotFound();
    }

    [HttpPost]
    public ActionResult<Transaccion> CreateTransaccion(CreateTransaccionDtos createTransaccionDto)
    {
        var transaccion = new Transaccion()
        {
            Id_cuentaorigen = createTransaccionDto.Id_transaccion,
            Id_cuenta_destino = createTransaccionDto.Id_cuenta_destino,
            monto = createTransaccionDto.monto,
            fecha = createTransaccionDto.fecha,
            tipo = createTransaccionDto.tipo,
        };

        _transaccionRepository.AddTransaccion(transaccion);

        return CreatedAtAction(nameof(GetTransaccion), new { Id_transaccion = transaccion.Id_transaccion }, transaccion);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateTransaccion(int id, Transaccion updateTransaccion)
    {
        if(_transaccionRepository.GetTransaccionById(id) is Transaccion transaccion)
        {
            //transaccion.Id_cuentaorigen = updateTransaccion.Id_cuentaorigen;
            //transaccion.Id_cuenta_destino = updateTransaccion.Id_cuenta_destino;
            transaccion.monto = updateTransaccion.monto;
            //transaccion.fecha = updateTransaccion.fecha;
            transaccion.tipo = updateTransaccion.tipo;

            _transaccionRepository.UpdateTransaccion(transaccion);
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    public ActionResult RemoveTransaccion(int id)
    {
        if (_transaccionRepository.GetTransaccionById(id) is Transaccion transaccion)
        {
            _transaccionRepository.RemoveTransaccion(id);
            return NoContent();
        }

        return NotFound();
    }
}
