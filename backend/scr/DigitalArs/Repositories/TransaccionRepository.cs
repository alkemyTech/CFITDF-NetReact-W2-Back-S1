using DigitalArs.Data;
using DigitalArs.Interfaces;
using DigitalArs.Models;

namespace DigitalArs.Repositories
{
    public class TransaccionRepository : ITransaccionRepository
    {
        private AppDbContext _dbContext;

        public TransaccionRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Transaccion> GetAllTransacciones()
        {
            return _dbContext.Transacciones.ToList();
        }

        public Transaccion? GetTransaccionById(int id)
        {
            return _dbContext.Transacciones.FirstOrDefault(t => t.ID_TRANSACCION == id);
        }

        public void AddTransaccion(Transaccion transaccion)
        {
            _dbContext.Transacciones.Add(transaccion);
            _dbContext.SaveChanges();
        }

        public void UpdateTransaccion(Transaccion transaccion)
        {
            _dbContext.Transacciones.Update(transaccion);
            _dbContext.SaveChanges();
        }

        public void RemoveTransaccion(int id)
        {
            var transaccion = _dbContext.Transacciones.FirstOrDefault(t => t.ID_TRANSACCION == id);
            if (transaccion != null)
            {
                _dbContext.Transacciones.Remove(transaccion);
                _dbContext.SaveChanges();
            }
        }
    }
}
