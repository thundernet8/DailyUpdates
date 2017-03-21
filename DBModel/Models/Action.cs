using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aspen.DailyUpdates.DBModel.Models
{
    [Table("Actions", Schema = "dbo")]
    public class Action
    {
        [Key]
        [Column("ID", Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("UID", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Uid { get; set; }

        [Column("PROJECTID", Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProjectId { get; set; }

        [Column("PARTIES", Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        [StringLength(100)]
        public string Parties { get; set; }

        [Column("DESCRIPTION", Order = 4)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Description { get; set; }

        [Column("PRIORITY", Order = 5)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public ActionPriority Priority { get; set; }

        [Column("STATUS", Order = 6)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public ActionStatus Status { get; set; }

        [Column("CREATE", Order = 7)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime Create { get; set; }

        [Column("UPDATE", Order = 8)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime? Update { get; set; }

        [Column("COMMENT", Order = 9)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Comment { get; set; }

        [NotMapped]
        public string PriorityStr
        {
            get
            {
                return Enum.GetName(typeof(ActionPriority), this.Priority);
            }
        }

        [NotMapped]
        public string StatusStr
        {
            get
            {
                return Enum.GetName(typeof(ActionStatus), this.Status);
            }
        }
    }

    public enum ActionPriority
    {
        Low,
        Medium,
        High
    }

    public enum ActionStatus
    {
        Open,
        Closed
    }
}
