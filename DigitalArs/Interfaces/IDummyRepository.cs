using DigitalArs.Entities;

namespace DigitalArs.Interfaces {
    public interface IDummyRepository {
        IEnumerable<Dummy> GetAllDummies();
        Dummy? GetDummyById(int Id);
        void AddDummy(Dummy entity);
        void UpdateDummy(Dummy entity);
        void RemoveDummy(int id);
    }
}
