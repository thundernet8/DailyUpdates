using Aspen.DailyUpdates.DBModel.Models;
using Aspen.DailyUpdates.DBModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;

namespace Install
{
    class Program
    {
        static string Name = System.Security.Principal.WindowsIdentity.GetCurrent().Name;

        static void Main(string[] args)
        {
            // TODO clean db
            PrepareDb();

            Console.WriteLine("Enter to create the first user as owner");
            Console.ReadKey();

            Console.WriteLine(String.Format("Your domain name is {0}\r\n", Name));

            DomainName domainName = new DomainName(Name);

            Console.WriteLine(String.Format("Please input your nickname, or {0} will be used\r\n", domainName.GetName()));

            string nickname = Console.ReadLine();
            if(nickname == string.Empty)
            {
                nickname = domainName.GetName();
            }
            ModelsManager manager = new ModelsManager(domainName);
            manager.AddOwner(nickname, domainName.GetFullName());

            manager = null;

            ModelsManager newManager = new ModelsManager(domainName);

            Console.WriteLine("Enter to create default projects: {Scheduling} and {Planning}\r\n");
            Console.ReadKey();
            newManager.AddProject("Scheduling Project", "APS Web Project");
            newManager.AddProject("Athena Planning Project", "PIMS Web Project");

            Console.WriteLine("Enter to create default top task fields\r\n");
            Console.ReadKey();
            newManager.AddField("FrontEnd", "UI part work", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1);
            newManager.AddField("BackEnd", "C# code", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1);
            newManager.AddField("Others", "Others exclude Frontend and Backend", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1);
            newManager.AddField("FrontEnd", "Athena UI parts", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 2);

            newManager.AddField("Web Gantt Chart Component", "Investigate the APIs in Yefim's Web Gantt Chart component and find what it can do", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1, 1);
            newManager.AddField("Classical Gantt Chart", "a) Investigate the features that current Gantt Chart can do but WGC not and the features that the draft describes\r\nb) Ask Yefim to add new APIs ", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1, 1);
            newManager.AddField("Slider", "Add new features to the slider that the draft describes", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1, 1);
            newManager.AddField("Trend Chart & thumbnails", "Add new features to the Trend chart that the draft describes", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1, 1);
            newManager.AddField("Migration tool", "Support to migrate the entities that are relevant to APS Crude Simulation and Crude Unit to SQL Server database", new DateTime(2016, 12, 1), new DateTime(2018, 5, 31), 1, 2);
            newManager.AddField("APS data model", "a) Investigate what entities are relevant to APS Crude Simulation and Crude Unit to Scheduling\r\nb) Add them to Scheduling project", new DateTime(2016, 12, 1), new DateTime(2018, 5, 31), 1, 2);
            newManager.AddField("Merge code", "Merge the code in Backend branch to SchedulingMain branch and make it build and run successfully", new DateTime(2017, 3, 1), new DateTime(2017, 3, 31), 1, 2);
            newManager.AddField("Deploy in the demo machine", "Make Scheduling run successfully in afodemo1 machine", new DateTime(2017, 3, 10), new DateTime(2017, 4, 10), 1, 2);
            newManager.AddField("Flowsheet component", "Work together with Tim on the Flowsheet component written by GoJS", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 1, 3);
            newManager.AddField("Fix Athena defects", "Fix the defects for Athena V10 Code Freeze", new DateTime(2016, 5, 1), new DateTime(2018, 5, 31), 2, 4);

            Console.WriteLine("Finished, enter to exit");
            Console.ReadKey();
        }

        public static void PrepareDb()
        {
            SqlConnection connection = Aspen.DailyUpdates.DBModel.Database.Connection;
            if (System.Data.Entity.Database.Exists(connection))
            {
                Console.WriteLine("Database exist, enter to drop\r\n");
                Console.ReadKey();

                DailyReportsContext context = new DailyReportsContext();
                context.Database.Delete();
                Console.WriteLine("Database was deleted\r\n");

                Console.WriteLine("Enter to create new database\r\n");
                Console.ReadKey();

                Console.WriteLine("Adding new database\r\n");
                context.Database.Create();
                Console.WriteLine("Database created\r\n");

                Console.WriteLine("Enter to continue\r\n");
                Console.ReadKey();
            }
            
        }
    }
}
