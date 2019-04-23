using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using LuxSoft.Assignment.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LuxSoft.Assignment.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EFDbContext _efDbContext;

        public EmployeeController(EFDbContext eFDbContext)
        {
            _efDbContext = eFDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get() => new OkObjectResult(await _efDbContext.Employee.ToListAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute, Required]int id) => new OkObjectResult(await _efDbContext.FindAsync<Employee>(id));

        [HttpPost]
        public IActionResult Post([FromBody, Required]Employee employee)
        {
            _efDbContext.Add(employee);
            _efDbContext.SaveChanges();
            return new OkObjectResult(employee);
        }

        [HttpPut]
        public IActionResult Put([FromBody, Required]Employee employee)
        {
            _efDbContext.Update(employee);
            _efDbContext.SaveChanges();
            return new OkObjectResult(employee);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute, Required]int id)
        {
            var employee = _efDbContext.Find<Employee>(id);
            employee.IsDeleted = true;
            _efDbContext.Update(employee);
            _efDbContext.SaveChanges();
            return new OkObjectResult(employee);
        }

    }
}