using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Models
{
    [Table("Users", Schema = "dbo")]
    public class User
    {
        [Key]
        [Column("ID", Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("NAME", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Name { get; set; }

        [Column("DOMAINNAME", Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string DomainName { get; set; }

        [Column("ROLE", Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public UserRole Role { get; set; } = UserRole.User;

        [NotMapped]
        public bool IsOwner {
            get
            {
                return Role == UserRole.Owner;
            }
        }

        [NotMapped]
        public bool IsAdmin {
            get
            {
                return Role == UserRole.Owner || Role == UserRole.Admin;
            }
        }

        [NotMapped]
        public bool IsMember
        {
            get
            {
                return Role == UserRole.Owner || Role == UserRole.Admin || Role == UserRole.User;
            }
        }
    }

    public enum UserRole
    {
        Owner,
        Admin,
        User,
        Guest
    }
}
