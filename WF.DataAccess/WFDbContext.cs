using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Threading.Tasks;
using System.Linq;
using WF.Domain;
using WF.Model;

namespace WF.DataAccess
{
    public class WFDbContext : DbContext//, IWFDbContext
    {
        public WFDbContext() : base(nameOrConnectionString: "WFDbContext") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            Database.SetInitializer<WFDbContext>(null);
        }

        public DbSet<Well> Wells { get; set; }
    }
}