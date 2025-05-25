using DigitalArs.Data;
using DigitalArs.Interfaces;
using DigitalArs.Models;


namespace DigitalArs.Repositories
{
    public class CuentaRepository : ICuentaRepository
    {
        private AppDbContext _dbContext;

        public CuentaRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<Cuenta> GetAllCuentas()
        {
            try
            {
                return _dbContext.Cuenta.ToList();
            }
            catch (InvalidCastException ex)
            {
                Console.WriteLine($"Error de conversión: {ex.Message}");
                return Enumerable.Empty<Cuenta>();
            }
        }

        public Cuenta? GetCuentaById(int id)
        {
            return _dbContext.Cuenta.FirstOrDefault(c => c.ID_CUENTA == id);

        }


        public void AddCuenta(Cuenta cuenta)
        {
            _dbContext.Cuenta.Add(cuenta);
            _dbContext.SaveChanges();
        }

        public void UpdateCuenta(Cuenta cuenta)
        {
            _dbContext.Cuenta.Update(cuenta);
            _dbContext.SaveChanges();
        }

        public void RemoveCuenta(int id)
        {
            var cuenta = _dbContext.Cuenta.FirstOrDefault(c => c.ID_CUENTA == id);
            if (cuenta != null)
            {
                _dbContext.Cuenta.Remove(cuenta);
                _dbContext.SaveChanges();
            }
        }

    }
}
