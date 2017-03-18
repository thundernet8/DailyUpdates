using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DBModel.Models;
using DBModel.DataContract;

namespace DBModel.Services
{
    public class ModelsManager
    {
        private User _currentUser = null;

        public ModelsManager(string domainName)
        {
            using (var _dbContext = new DailyReportsContext())
            {
                _currentUser = _dbContext.Users.Where(x => x.DomainName == domainName).FirstOrDefault();
            }
        }

        #region Utilities
        public void RequireOwnerAccess()
        {
            if (_currentUser == null || !_currentUser.IsOwner())
            {
                throw new ClientException("Not allowed to do this as you are not a site owner");
            }
        }

        public void RequireAdminAccess()
        {
            if (_currentUser == null || !_currentUser.IsAdmin())
            {
                throw new ClientException("Not allowed to do this as you are not a administrator");
            }
        }

        public void RequireMemberAccess()
        {
            if (_currentUser == null)
            {
                throw new ClientException("Not allowed to do this as you are not a member");
            }
        }
        #endregion

        public ICollection<User> GetUsers()
        {
            using(var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<User>().OrderBy(x => x.Id).ToList();
            }
        }

        public User GetCurrentUser()
        {
            return _currentUser;
        }

        public User GetUser(int id)
        {
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<User>().Find(id);
            }
        }

        public User GetUser(string domainName)
        {
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Users.Where(x => x.DomainName == domainName).FirstOrDefault();
            }
        }

        public ICollection<Project> GetProjects()
        {
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<Project>().OrderBy(x => x.Id).ToList();
            }
        }

        public Project GetProject(int id)
        {
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<Project>().Find(id);
            }
        }

        public ICollection<Field> GetFields(DateTime? date)
        {
            if (date == null)
            {
                date = DateTime.Now.Date;
            }
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<Field>().Where(x => x.Start <= date && x.End >= date).OrderBy(x => x.Id).ToList();
            }
        }

        public ICollection<TopField> GetTopFields(DateTime? date)
        {
            List<Field> fields = this.GetFields(date).ToList();
            List<TopField> topFields = new List<TopField>();
            (from field in fields where field.Parent == 0 select field).ToList().ForEach((fieldOfTop) =>
            {
                TopField topField = new TopField()
                {
                    Id = fieldOfTop.Id,
                    Parent = 0,
                    ProjectId = fieldOfTop.ProjectId,
                    Name = fieldOfTop.Name,
                    Destination = fieldOfTop.Destination,
                    Start = fieldOfTop.Start,
                    End = fieldOfTop.End
                };
                topField.SubFields = (from field in fields where field.Parent == topField.Id select field).ToList();
                topFields.Add(topField);
            });

            return topFields;
        }

        public Field GetField(int id)
        {
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<Field>().Find(id);
            }
        }

        public ICollection<Record> GetRecords(DateTime? date)
        {
            if (date == null)
            {
                date = DateTime.Now.Date;
            }
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<Record>().Where(x => x.Create == date).OrderBy(x => x.Id).ToList();
            }
        }

        public Record GetRecord(int id)
        {
            using (var _dbContext = new DailyReportsContext())
            {
                return _dbContext.Set<Record>().Find(id);
            }
        }

        public DayActivities GetDayActivities(DateTime? date)
        {
            if (date == null)
            {
                date = DateTime.Now.Date;
            }
            DayActivities dayActivities = new DayActivities()
            {
                Day = (DateTime)date,
                TopFields = GetTopFields(date),
                Records = GetRecords(date)
            };

            return dayActivities;
        }

        #region Insert User
        public User AddOwner(string name, string domainName)
        {
            var users = GetUsers();
            if (users.Count() > 0)
            {
                throw new ClientException("Owner must be the first user");
            }
            return AddUser(name, domainName, UserRole.Owner);
        }

        public User AddAdmin(string name, string domainName)
        {
            RequireOwnerAccess();
            return AddUser(name, domainName, UserRole.Admin);
        }

        public User AddUser(string name, string domainName, UserRole role = UserRole.User)
        {
            RequireAdminAccess();
            using (var _dbContext = new DailyReportsContext())
            {
                var exist = _dbContext.Users.Any(x => x.Name == name || x.DomainName == domainName);
                if (exist)
                {
                    throw new ClientException("The user is existed");
                }
                var user = _dbContext.Users.Add(new User()
                {
                    Name = name,
                    DomainName = domainName,
                    Role = role
                });

                _dbContext.SaveChanges();

                return user;
            }
        }
        #endregion

        #region Insert Project
        public Project AddProject(string name, string description)
        {
            RequireOwnerAccess();
            using (var _dbContext = new DailyReportsContext())
            {
                var exist = _dbContext.Projects.Any(x => x.Name == name);
                if (exist)
                {
                    throw new ClientException("The project is existed");
                }
                var project = _dbContext.Projects.Add(new Project()
                {
                    Name = name,
                    Description = description
                });

                _dbContext.SaveChanges();

                return project;
            }
        }
        #endregion

        #region Insert Field
        public Field AddField(string name, string destination, DateTime start, DateTime end, int projectId, int parent = 0)
        {
            RequireAdminAccess();
            if (string.IsNullOrWhiteSpace(name))
            {
                throw new ClientException("field name must be provided");
            }
            if (parent != 0 && string.IsNullOrWhiteSpace(destination))
            {
                throw new ClientException("sub field must have a destination for sample usage");
            }

            var project = GetProject(projectId);

            if (project == null)
            {
                throw new ClientException("project you specified is not exist");
            }

            Field parentField = null;
            if (parent != 0)
            {
                parentField = GetField(parent);
                if (parentField == null) throw new ClientException("the parent field you specified is not exist");

                projectId = parentField.ProjectId; // sub field must have same project id with parent
            }
            

            using (var _dbContext = new DailyReportsContext())
            {
                var exist = _dbContext.Fields.Any(x => x.Name == name);
                if (exist)
                {
                    throw new ClientException("The field is existed");
                }
                var field = _dbContext.Fields.Add(new Field()
                {
                    Name = name,
                    Destination = destination,
                    Start = start.Date,
                    End = end.Date,
                    Parent = parent,
                    ProjectId = projectId
                });

                _dbContext.SaveChanges();

                return field;
            }
        }
        #endregion

        #region Insert/Update Record
        public Record AddRecord(int fieldId, string destination, DateTime? turnover, string detail)
        {
            RequireMemberAccess();
            var user = GetUser(_currentUser.Id);
            if (user == null)
            {
                throw new ClientException("the specified user is not a member");
            }
            var field = GetField(fieldId);
            if (field == null)
            {
                throw new ClientException("the specified field is not exist");
            }
            if (field.Parent == 0)
            {
                throw new ClientException("cannot append a record to top field");
            }
            if (string.IsNullOrWhiteSpace(destination)){
                throw new ClientException("destination must not be blank");
            }

            using (var _dbContext = new DailyReportsContext())
            {
                var r = _dbContext.Records.ToList();
                var nowDate = DateTime.Now.Date;
                // relationship validation
                if (_dbContext.Records.Any(x => x.Create == nowDate && x.FieldId == fieldId))
                {
                    throw new ClientException("the specified field has been fill today");
                }

                var record = _dbContext.Records.Add(new Record()
                {
                    Uid = _currentUser.Id,
                    FieldId = fieldId,
                    Destination = destination,
                    Create = nowDate,
                    Detail = detail
                });
                _dbContext.SaveChanges();

                return record;
            }
        }

        public void UpdateRecord(int recordId, int fieldId, string destination, DateTime? turnover, string detail)
        {
            RequireMemberAccess();
            var record = GetRecord(recordId);
            if (record == null)
            {
                throw new ClientException("the specified record is not exist");
            } else if (record.Uid != _currentUser.Id && !_currentUser.IsAdmin())
            {
                throw new ClientException("you cannot edit other's record");
            }

            var field = GetField(fieldId);
            if (field == null)
            {
                throw new ClientException("the specified field is not exist");
            } else if (field.Parent == 0)
            {
                throw new ClientException("cannot append a record to top field");
            }

            if (string.IsNullOrWhiteSpace(destination))
            {
                throw new ClientException("destination must not be blank");
            }

            using (var _dbContext = new DailyReportsContext())
            {
                // relationship validation
                var nowDate = DateTime.Now.Date;
                if (_dbContext.Records.Any(x => x.Create == nowDate && x.FieldId == fieldId && x.Id != recordId))
                {
                    throw new ClientException("the specified field has been fill today");
                }

                record = _dbContext.Records.Where(x => x.Id == recordId).FirstOrDefault();
                record.FieldId = fieldId;
                record.Update = DateTime.Now;
                record.UpdateBy = _currentUser.Id;
                record.Destination = destination;
                if (turnover != null)
                {
                    record.TurnOver = ((DateTime)turnover).Date;
                }
                record.Detail = detail;
                _dbContext.SaveChanges();
            }
        }
        #endregion
    }
}
