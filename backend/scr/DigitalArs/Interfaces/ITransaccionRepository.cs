using DigitalArs.Models;

namespace DigitalArs.Interfaces
{
    public interface ITransaccionRepository
    {
        IEnumerable<Transaccion> GetAllTransacciones();
        Transaccion? GetTransaccionById(int Id);
        void AddTransaccion(Transaccion transaccion);
        void UpdateTransaccion(Transaccion transaccion);
        void RemoveTransaccion(int Id);
    }
}
