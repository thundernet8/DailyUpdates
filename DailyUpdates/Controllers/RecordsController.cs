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

        [Route("me/{id:int}")]
        public JObject GetMyRecord(int id)
        {
            Record myRecord = _modelsManager.GetMyRecord(id);
            if (myRecord == null)
            {
                return null;
            }
            return JObject.FromObject(myRecord);
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

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage UpdateRecord(int id, [FromBody]Record record)
        {
            try
            {
                Record updatedRecord = _modelsManager.UpdateRecord(id, record.FieldId, record.Destination, record.TurnOver, record.Detail);
                return new Response(JObject.FromObject(updatedRecord));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        // DELETE: api/Projects/5
        public void Delete(int id)
        {
        }
    }
}
