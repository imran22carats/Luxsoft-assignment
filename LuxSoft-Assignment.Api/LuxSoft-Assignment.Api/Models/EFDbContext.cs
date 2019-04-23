using LuxSoft.Assignment.Api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LuxSoft.Assignment.Api
{
    public class EFDbContext : DbContext
    {
        public EFDbContext(DbContextOptions<EFDbContext> options)
            : base(options)
        { }

        public DbSet<Employee> Employee { get; set; }
    }
}
