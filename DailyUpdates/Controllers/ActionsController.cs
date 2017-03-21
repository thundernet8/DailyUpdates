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
    [RoutePrefix("api/v1/actions")]
    public class ActionsController : ApiController
    {
        private IModelsManager _modelsManager;

        public ActionsController(IModelsManager modelsManager)
        {
            _modelsManager = modelsManager; // new ModelsManager(RequestContext.Principal.Identity.Name);
        }

        [Route("open")]
        public HttpResponseMessage GetOpenActions()
        {
            try
            {
                List<DBModel.Models.Action> openActions = _modelsManager.GetOpenActions().ToList();
                return new Response(JArray.FromObject(openActions));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [Route("me")]
        public HttpResponseMessage GetMyActions()
        {
            try
            {
                List<DBModel.Models.Action> myActions = _modelsManager.GetMyActions().ToList();
                return new Response(JArray.FromObject(myActions));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [Route("me/{id:int}")]
        public HttpResponseMessage GetMyAction(int id)
        {
            try
            {
                DBModel.Models.Action action = _modelsManager.GetMyAction(id);
                return new Response(JObject.FromObject(action));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [HttpPost]
        [Route("")]
        public HttpResponseMessage CreateAction([FromBody]DBModel.Models.Action action)
        {
            try
            {
                DBModel.Models.Action newAction = _modelsManager.AddAction(action.ProjectId, action.Parties, action.Description, action.Comment, action.Priority);
                return new Response(JObject.FromObject(newAction));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public HttpResponseMessage UpdateAction(int id, [FromBody]DBModel.Models.Action action)
        {
            try
            {
                DBModel.Models.Action updatedAction = _modelsManager.UpdateAction(id, action.Parties, action.Description, action.Comment, action.Priority, action.Status);
                return new Response(JObject.FromObject(updatedAction));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
    }
}
