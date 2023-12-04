using Application.Activities;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extentions;

public static class ApplicationServiceExtensions
{
    private static IServiceCollection _services;
    private static IConfiguration _config;

    public static IServiceCollection AddAplicationServices(this IServiceCollection services, IConfiguration config)
    {
        _services = services;
        _config = config;
        
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors(opt =>
        {
            opt.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
            });
        });
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly((typeof(List.Handler).Assembly)));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        return services;
        
    }
}