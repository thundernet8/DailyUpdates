using Aspen.DailyUpdates.DBModel.DataContract;
using Aspen.DailyUpdates.DBModel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aspen.DailyUpdates.DBModel.Services
{
    public interface IModelsManager
    {

        #region User
        ICollection<User> GetUsers();

        User GetCurrentUser();

        User GetUser(int id);

        User GetUser(string domainName);
        #endregion

        #region Get Projects
        ICollection<Project> GetProjects();

        Project GetProject(int id);
        #endregion

        #region Get Fields
        ICollection<Field> GetFields(DateTime? date);

        ICollection<TopField> GetTopFields(DateTime? date);

        Field GetField(int id);

        #endregion

        #region Get Records
        ICollection<Record> GetRecords(DateTime? date);

        ICollection<Record> GetMyRecords(DateTime? date);

        Record GetRecord(int id);

        Record GetMyRecord(int id);

        #endregion

        #region Get Actions
        ICollection<Models.Action> GetOpenActions();

        ICollection<Models.Action> GetMyActions();

        Models.Action GetMyAction(int id);

        Models.Action GetAction(int id);

        #endregion


        #region Activities
        DayActivities GetDayActivities(DateTime? date = null);

        #endregion

        #region Insert User
        User AddOwner(string name, string domainName);

        User AddAdmin(string name, string domainName);

        User AddUser(string name, string domainName, UserRole role = UserRole.User);

        #endregion

        #region Insert Project
        Project AddProject(string name, string description);

        #endregion

        #region Insert/Update Field
        Field AddField(string name, string destination, DateTime start, DateTime end, int projectId, int parent = 0);

        Field UpdateField(int fieldId, string name, string destination, DateTime start, DateTime end, int projectId, int parent = 0, DateTime? turnover = null);

        #endregion

        #region Insert/Update Record
        Record AddRecord(int fieldId, string destination, bool turnover, string detail);


        Record UpdateRecord(int recordId, int fieldId, string destination, bool turnover, string detail);

        #endregion

        #region Insert/Update Action
        Models.Action AddAction(int projectId, string parties, string description, string comment, ActionPriority priority, ActionStatus status = ActionStatus.Open);


        Models.Action UpdateAction(int actionId, string parties, string description, string comment, ActionPriority priority, ActionStatus status = ActionStatus.Open);

        #endregion
    }
}
