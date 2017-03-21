using Aspen.DailyUpdates.DBModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aspen.DailyUpdates.DBModel.DataContract
{
    public class DayActivities
    {
        public DateTime Day { get; set; }

        public ICollection<TopField> TopFields { get; set; }

        //public ICollection<Field> SubFields { get; set; }

        public ICollection<Record> Records { get; set; }

        public ICollection<User> Users { get; set; }

        public ICollection<Project> Projects { get; set; }

        public ICollection<Models.Action> OpenActions { get; set; }
    }
}
