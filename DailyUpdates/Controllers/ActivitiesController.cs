using DBModel.DataContract;
using DBModel.Models;
using DBModel.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DailyUpdates.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/activities")]
    public class ActivitiesController : ApiController
    {
        private ModelsManager _modelsManager = null;

        public ActivitiesController()
        {
            _modelsManager = new ModelsManager(RequestContext.Principal.Identity.Name);
        }

        [Route("today")]
        public HttpResponseMessage GetTodayActivities()
        {
            try
            {
                DayActivities activities = _modelsManager.GetDayActivities();
                return new Response(JObject.FromObject(activities));
            }
            catch(Exception ex)
            {
                return new Response(ex);
            }
        }

        [Route("{year:int}/{month:int}/{day:int}")]
        public HttpResponseMessage GetActivitiesOfDate(int year, int month, int day)
        {
            try
            {
                DateTime date = new DateTime(year, month, day);
                DayActivities activities = _modelsManager.GetDayActivities(date);
                return new Response(JObject.FromObject(activities));
            }
            catch (Exception ex)
            {
                return new Response(ex);
            }
        }
    }
}
