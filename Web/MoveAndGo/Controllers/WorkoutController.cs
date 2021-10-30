using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoveAndGo.Models;

namespace MoveAndGo.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : Controller
    {
        private readonly UserManager<User> _manager;
        private readonly MoveAndGoContext _context;

        public WorkoutController(UserManager<User> manager, MoveAndGoContext context)
        {
            _manager = manager;
            _context = context;
        }

        // GET: api/Workout
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetWorkouts()
        {
            return new ObjectResult((await _context.Workouts.ToListAsync()).Select(
                async e =>
                new
                {
                    e.Id,
                    e.Title,
                    e.Author,
                    AuthorAvatar = (await _manager.FindByNameAsync(e.Author)).Avatar,
                    e.Video,
                    e.Text,
                    e.TypeId,
                    e.Intensity
                }
            ).Select(e => e.Result));
        }

        // GET: api/Workout/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkout(string id)
        {
            var workout = await _context.Workouts.FindAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            return workout;
        }

        // POST: api/Workout
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<Workout>> PostWorkout(Workout workout)
        //{
        //    _context.Workouts.Add(workout);
        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (WorkoutExists(workout.Id))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtAction("GetWorkout", new { id = workout.Id }, workout);
        //}

        //// DELETE: api/Workout/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteWorkout(string id)
        //{
        //    var workout = await _context.Workouts.FindAsync(id);
        //    if (workout == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Workouts.Remove(workout);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool WorkoutExists(string id)
        //{
        //    return _context.Workouts.Any(e => e.Id == id);
        //}
    }
}
