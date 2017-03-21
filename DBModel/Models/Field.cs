using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aspen.DailyUpdates.DBModel.Models
{
    [Table("Fields", Schema = "dbo")]
    public class Field
    {
        [Key]
        [Column("ID", Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("PARENT", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Parent { get; set; }

        [Column("PROJECTID", Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProjectId { get; set; }

        [Column("NAME", Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Name { get; set; }

        [Column("DESTINATION", Order = 4)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Destination { get; set; }

        [Column("START", Order = 5)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime Start { get; set; }

        [Column("END", Order = 6)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime End { get; set; }

        [Column("TURNOVER", Order = 7)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime? TurnOver { get; set; }
    }
}
