using Domain;
using MediatR;
using Persistence;

namespace Application.Activities;

public class Details
{
    public class Query : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }

    private static DataContext _context;
    
    public class Handler : IRequestHandler<Query, Activity>
    {
        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
        {
            return await _context.Activities.FindAsync(request.Id);
        }
    }
    
}