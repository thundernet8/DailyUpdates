using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Models
{
    public class TopField : Field
    {
        public ICollection<Field> SubFields { get; set; }
    }
}
