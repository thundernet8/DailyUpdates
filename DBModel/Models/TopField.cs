using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aspen.DailyUpdates.DBModel.Models
{
    public class TopField : Field
    {
        public ICollection<Field> SubFields { get; set; }

        public new DateTime? TurnOver {
            get
            {
                return null;
            }
        }
    }
}
