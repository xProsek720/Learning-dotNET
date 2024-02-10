using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]

public class BaseApiController : ControllerBase
{
    public BaseApiController(IMediator mediator) {
        Mediator = mediator;
    }
 
    public BaseApiController() {
    }

    protected IMediator Mediator { get; set; }
}