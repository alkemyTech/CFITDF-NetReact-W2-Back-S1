using DigitalArs.Data;
using DigitalArs.Entities;
using DigitalArs.Interfaces;

namespace DigitalArs.Repositories {
    public class DummyRepository : IDummyRepository {
        private AppDbContext _dbContext;
        public DummyRepository(AppDbContext dbContext) {
            _dbContext = dbContext;
        }

        public IEnumerable<Dummy> GetAllDummies() {
            return _dbContext.Dummies.ToList();
        }
        public Dummy? GetDummyById(int Id) {
            return _dbContext.Dummies.FirstOrDefault(d => d.Id == Id);
        }

        public void AddDummy(Dummy entity) {
            _dbContext.Dummies.Add(entity);
            _dbContext.SaveChanges();
        }

        public void UpdateDummy(Dummy entity) {
            _dbContext.Dummies.Update(entity);
            _dbContext.SaveChanges();
        }

        public void RemoveDummy(int id) {
            var dummy = _dbContext.Dummies.FirstOrDefault(d =>d.Id == id);
            if (dummy != null) {
                _dbContext.Dummies.Remove(dummy);
                _dbContext.SaveChanges();
            }
        }
    }
}
