using Aspen.DailyUpdates.DBModel.DataContract;
using Aspen.DailyUpdates.DBModel.Models;
using Aspen.DailyUpdates.DBModel.Services;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Aspen.DailyUpdates.Web.Application.Controllers
{
    [Authorize]
    [RoutePrefix("api/v1/activities")]
    public class ActivitiesController : ApiController
    {
        private IModelsManager _modelsManager;

        public ActivitiesController(IModelsManager modelsManager)
        {
            _modelsManager = modelsManager;
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
