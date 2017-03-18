using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DailyUpdates.Controllers
{
    [RoutePrefix("api/v1")]
    public class ActivitiesController : ApiController
    {
        // GET: api/Activities
        [Route("test")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Activities/5
        [HttpGet]
        [Route("gettest/{id:int}")]
        public JObject GetTest(int id)
        {
            return JObject.FromObject(new
            {
                name = System.Web.HttpContext.Current.User.Identity.Name
            });
        }

        // POST: api/Activities
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Activities/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Activities/5
        public void Delete(int id)
        {
        }
    }
}
