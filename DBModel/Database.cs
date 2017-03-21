using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Configuration;

namespace DBModel
{
    public class Database
    {
        // private static SqlConnection _dbConnection = null; // Two requests can't use the same connection, because they are scoped (by default). Scoped will create one instance of DbContext per request

        public static SqlConnection Connection
        {
            get
            {

                //var sqlBuilder = new SqlConnectionStringBuilder();
                //sqlBuilder.DataSource = Utils.GetSetting("ServerName");
                //sqlBuilder.InitialCatalog = Utils.GetSetting("DBName");
                //sqlBuilder.IntegratedSecurity = true;

                // return new SqlConnection(sqlBuilder.ToString());

                var connectionStr = ConfigurationManager.ConnectionStrings["DailyUpdatesDBConnectionString"].ConnectionString;
                return new SqlConnection(connectionStr);
            }
        }
    }
}
