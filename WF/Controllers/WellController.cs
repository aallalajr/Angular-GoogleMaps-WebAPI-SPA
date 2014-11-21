using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WF.DataAccess;
using WF.Model;

namespace WF.Controllers
{
    public class WellController : ApiController
    {
        private WFDbContext db = new WFDbContext();
//        private readonly IWFDbContext _dbContext;
//
//        public WellController(IWFDbContext dbContext)
//        {
//            _dbContext = dbContext;
//        }

        public IQueryable<Well> GetAllWells()
        {
            return db.Wells;
        }

        public IHttpActionResult GetWell(int id)
        {
            var well = db.Wells.SingleOrDefault(x => x.Id == id);
            return Ok(well);
        }

        public HttpResponseMessage Put([FromBody]Well model)
        {
            var headers = HttpContext.Current.Request.Headers;
            IEnumerable<string> headerValues = headers.GetValues("CommandType");
            if (headerValues == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            var commandType = headerValues.FirstOrDefault();
            if (commandType != "UpdateWell")
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            db.Entry(model).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            } 
            return Request.CreateResponse(HttpStatusCode.OK); 
        }

        public HttpResponseMessage Post([FromBody]Well model)
        {
            var headers = HttpContext.Current.Request.Headers;
            IEnumerable<string> headerValues = headers.GetValues("CommandType");
            if (headerValues == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            var commandType = headerValues.FirstOrDefault();
            if (commandType != "CreateWell")
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            db.Entry(model).State = EntityState.Added;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        public HttpResponseMessage Delete(int id)
        {
            var headers = HttpContext.Current.Request.Headers;
            IEnumerable<string> headerValues = headers.GetValues("CommandType");
            if (headerValues == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            var commandType = headerValues.FirstOrDefault();
            if (commandType != "DeleteWell")
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            var well = db.Wells.SingleOrDefault(x => x.Id == id); 
            if (well == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            db.Entry(well).State = EntityState.Deleted;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }
            return Request.CreateResponse(HttpStatusCode.OK);
        }
    }
}