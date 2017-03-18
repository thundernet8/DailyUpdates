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
                var modelsManager = new ModelsManager(null);
                modelsManager.AddOwner("Xueqian", "CORP\\wuxu");
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
                var modelsManager = new ModelsManager("CORP\\wuxu");
                modelsManager.AddRecord(2, "destination strings", null, "detail string");
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
                var modelsManager = new ModelsManager("CORP\\wuxu");
                modelsManager.UpdateRecord(1, 2, "destination strings modified", null, "detail string 12313141515156");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
