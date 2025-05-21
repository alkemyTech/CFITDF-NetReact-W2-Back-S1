using DigitalArs.Dtos;
using DigitalArs.Entities;
using DigitalArs.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace DigitalArs.Controllers;
[Route("api/[controller]")]
[ApiController]
public class DummyController : ControllerBase {
    private IDummyRepository _dummyRepository;
    public DummyController(IDummyRepository dummyRepository) {
        _dummyRepository = dummyRepository;
    }

    [HttpGet]
    public ActionResult<Dummy[]> GetDummies() {
        return Ok(_dummyRepository.GetAllDummies());
    }

    [HttpGet("{id}")]
    public ActionResult<Dummy> GetDummy(int id) {
        if (_dummyRepository.GetDummyById(id) is Dummy dummy) {
            return Ok(dummy);
        }
        return NotFound();
    }

    [HttpPost]
    public ActionResult<Dummy> CreateDummy(CreateDummyDto createDummyDto) {
        var dummy = new Dummy() { Name = createDummyDto.Name };
        _dummyRepository.AddDummy(dummy);
        return CreatedAtAction(nameof(GetDummy), new { id = dummy.Id }, dummy);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateDummy(int id, Dummy updatedDummy) {
        if (_dummyRepository.GetDummyById(id) is Dummy dummy) {
            dummy.Name = updatedDummy.Name;

            _dummyRepository.UpdateDummy(dummy);
            return NoContent();
        }
        return NotFound();
    }

    [HttpDelete("{id}")]
    public ActionResult RemoveDummy(int id) {
        if (_dummyRepository.GetDummyById(id) is Dummy dummy) {
            _dummyRepository.RemoveDummy(id);
            return NoContent();
        }
        return NotFound();
    }
}
