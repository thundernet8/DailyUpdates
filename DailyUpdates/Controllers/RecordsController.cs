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
        private IModelsManager _modelsManager;

        public RecordsController(IModelsManager modelsManager)
        {
            _modelsManager = modelsManager;
        }

        [Route("me/today")]
        public HttpResponseMessage GetMyRecordsToday()
        {
            try
            {
                List<Record> myRecordsToday = _modelsManager.GetMyRecords(null).ToList();
                return new Response(JArray.FromObject(myRecordsToday));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [Route("me/{id:int}")]
        public HttpResponseMessage GetMyRecord(int id)
        {
            try
            {
                Record myRecord = _modelsManager.GetMyRecord(id);
                if (myRecord == null)
                {
                    return null;
                }
                return new Response(JObject.FromObject(myRecord));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
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
