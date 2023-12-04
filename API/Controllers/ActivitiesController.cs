using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
namespace API.Controllers;

public class ActivitiesController : BaseApiController
{
    private readonly IMediator _mediator;
    public ActivitiesController()
    {
        _mediator = HttpContext.RequestServices.GetService<IMediator>();
    }
    public ActivitiesController(IMediator mediator)
    {
        _mediator = mediator;
        Mediator = _mediator;
    }

    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities(CancellationToken ct)
    {
        return await Mediator.Send(new List.Query(), ct);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<Activity>> GetActivity(Guid Id)
    {
        return await Mediator.Send((new Details.Query{Id = Id}));
    }

    [HttpPost]
    public async Task<IActionResult> CreateActivity(Activity activity)
    {
        await Mediator.Send(new Create.Command { Activity = activity });
        return Ok("Trying to create!");
    }

    [HttpPut("{Id}")]
    public async Task<IActionResult> EditActivity(Guid Id, Activity activity)
    {
        activity.Id = Id;
        await Mediator.Send(new Edit.Command { Activity = activity });
        return Ok($"Edited {Id}");
    }

    [HttpDelete("{Id}")]
    public async Task<IActionResult> DeleteActivity(Guid Id)
    {
        await Mediator.Send(new Delete.Command { Id = Id });
        return Ok($"Deleted {Id}");
    }
}