using DBModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.DataContract
{
    public class DayActivities
    {
        public DateTime Day { get; set; }

        public ICollection<TopField> TopFields { get; set; }

        //public ICollection<Field> SubFields { get; set; }

        public ICollection<Record> Records { get; set; }
    }
}
