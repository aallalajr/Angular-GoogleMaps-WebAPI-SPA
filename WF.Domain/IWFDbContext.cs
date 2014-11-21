using System.Data.Entity;
using System.Linq;
using WF.Model;

namespace WF.Domain
{
    public interface IWFDbContext
    {
        IQueryable<Well> Wells { get; set; }
    }
}