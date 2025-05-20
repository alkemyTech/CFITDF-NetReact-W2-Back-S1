using DigitalArs.Entities;
using Microsoft.EntityFrameworkCore;

namespace DigitalArs.Data {
    public class AppDbContext : DbContext{
        public DbSet<Dummy> Dummies { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            optionsBuilder.UseSqlServer();
        }
    }
}
