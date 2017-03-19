using DBModel.Models;
using DBModel.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleTest
{
    class Program
    {
        static string Name = System.Security.Principal.WindowsIdentity.GetCurrent().Name;

        static void Main(string[] args)
        {
            // AddRecordTest();
            AddOwnerTest();

            Console.ReadKey();
        }

        public static void AddOwnerTest()
        {
            try
            {
                var modelsManager = new ModelsManager(Name);
                modelsManager.AddOwner("Xueqian", Name);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public static Project GetProject(int id)
        {
            try
            {
                var modelsManager = new ModelsManager(null);
                return modelsManager.GetProject(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void AddRecordTest()
        {
            try
            {
                var modelsManager = new ModelsManager(Name);
                modelsManager.AddRecord(2, "destination strings", false, "detail string");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public static void UpdateRecordTest()
        {
            try
            {
                var modelsManager = new ModelsManager(Name);
                modelsManager.UpdateRecord(1, 2, "destination strings modified", false, "detail string 12313141515156");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
