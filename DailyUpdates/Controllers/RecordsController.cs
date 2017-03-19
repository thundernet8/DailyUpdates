using DBModel.Models;
using DBModel.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace DailyUpdates.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/records")]
    public class RecordsController : ApiController
    {
        private ModelsManager _modelsManager = null;

        public RecordsController()
        {
            _modelsManager = new ModelsManager(RequestContext.Principal.Identity.Name);
        }

        [Route("me/today")]
        public JArray GetMyRecordsToday()
        {
            List<Record> myRecordsToday = _modelsManager.GetMyRecords(null).ToList();
            return JArray.FromObject(myRecordsToday);
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage CreateRecord([FromBody]Record record)
        {
            try
            {
                Record newRecord = _modelsManager.AddRecord(record.FieldId, record.Destination, record.TurnOver, record.Detail);
                return new Response(JObject.FromObject(newRecord));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        // PUT: api/Projects/5
        public void Put(int id, [FromBody]string value)
        {

        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
        }
    }
}
