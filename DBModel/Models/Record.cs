using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DBModel.Models
{
    [Table("Records", Schema = "dbo")]
    public class Record
    {
        [Key]
        [Column("ID", Order = 0)]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("UID", Order = 1)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Uid { get; set; }

        [Column("FIELDID", Order = 2)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int FieldId { get; set; }

        [Column("DESTINATION", Order = 3)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Destination { get; set; }

        [Column("CREATE", Order = 4)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime Create { get; set; }

        [Column("UPDATE", Order = 5)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public DateTime? Update { get; set; }

        [Column("UPDATEBY", Order = 6)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int? UpdateBy { get; set; } = 0;

        [Column("DETAIL", Order = 7)]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Detail { get; set; }

        [NotMapped]
        public bool TurnOver { get; set; }

        [NotMapped]
        public string UserName { get; set; }
    }
}
