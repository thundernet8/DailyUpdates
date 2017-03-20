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
    [RoutePrefix("api/v1/tasks")]
    public class TasksController : ApiController
    {
        private ModelsManager _modelsManager = null;

        public TasksController()
        {
            _modelsManager = new ModelsManager(RequestContext.Principal.Identity.Name);
        }

        [Route("top")]
        public JArray GetTopTasks()
        {
            List<TopField> topTasks = _modelsManager.GetTopFields(null).ToList();
            return JArray.FromObject(topTasks);
        }

        [Route("")]
        public JArray GetTasks()
        {
            List<Field> tasks = _modelsManager.GetFields(null).ToList();
            return JArray.FromObject(tasks);
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
    }
}
