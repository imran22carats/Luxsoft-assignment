using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LuxSoft.Assignment.Api.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string EmpId { get; set; }
        public string Designation { get; set; }
        public int Age { get; set; }
        public bool IsDeleted { get; set; }
    }
}
