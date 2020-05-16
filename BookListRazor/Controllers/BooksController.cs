using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookListRazor.Model;
using Microsoft.AspNetCore.Mvc;

namespace BookListRazor.Controllers
{
    [Route("api/Book")]
    [ApiController]
    public class BooksController : Controller
    {
        private readonly ApplicationDbContext _db;

        public BooksController(ApplicationDbContext db)
        {
            _db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json(new { data = _db.Book.ToList() });
        }
        [HttpDelete]
        public async Task <IActionResult> Delete(int id)
        {
            var bookEntity = _db.Book.FirstOrDefault(m => m.Id == id);
            if(bookEntity == null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }
            _db.Remove(bookEntity);
            await _db.SaveChangesAsync();

            return Json(new { success = true, message = "Deleted Successfully" });
        }
    }
}