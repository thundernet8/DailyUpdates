using Aspen.DailyUpdates.DBModel.Models;
using Aspen.DailyUpdates.DBModel.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace Aspen.DailyUpdates.Web.Application.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/tasks")]
    public class TasksController : ApiController
    {
        private IModelsManager _modelsManager;

        public TasksController(IModelsManager modelsManager)
        {
            _modelsManager = modelsManager;
        }

        [Route("top")]
        public HttpResponseMessage GetTopTasks()
        {
            try
            {
                List<TopField> topTasks = _modelsManager.GetTopFields(null).ToList();
                return new Response(JArray.FromObject(topTasks));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [Route("")]
        public HttpResponseMessage GetTasks()
        {
            try
            {
                List<Field> fields = _modelsManager.GetFields(null).ToList();
                return new Response(JArray.FromObject(fields));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [Route("{id:int}")]
        public HttpResponseMessage GetTask(int id)
        {
            try
            {
                Field field = _modelsManager.GetField(id);
                return new Response(JObject.FromObject(field));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage CreateTask([FromBody]Field field)
        {
            try
            {
                Field newField = _modelsManager.AddField(field.Name, field.Destination, field.Start.Date, field.End.Date, field.ProjectId, field.Parent);
                return new Response(JObject.FromObject(newField));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage UpdateTask(int id, [FromBody]Field field)
        {
            try
            {
                Field updatedField = _modelsManager.UpdateField(id, field.Name, field.Destination, field.Start, field.End, field.ProjectId, field.Parent);
                return new Response(JObject.FromObject(updatedField));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
    }
}
