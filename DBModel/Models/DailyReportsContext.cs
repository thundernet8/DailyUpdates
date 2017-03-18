using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBModel;

namespace DBModel.Models
{
    public class DailyReportsContext : DbContext
    {
        public DailyReportsContext()
            : base(DBModel.Database.Connection, false)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Field> Fields { get; set; }

        public DbSet<Record> Records { get; set; }

        public DbSet<Action> Actions { get; set; }
    }
}
