using API.Controllers;
using API.Extentions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

internal class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddAplicationServices(builder.Configuration);
        var app = builder.Build();

// Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.UseCors("CorsPolicy");

        app.UseHttpsRedirection();

        var summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        app.MapGet("/pogoda", () =>
            {
                var forecast =  Enumerable.Range(1, 5).Select(index =>
                        new WeatherForecast
                        (
                            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                            Random.Shared.Next(-20, 3),
                            summaries[Random.Shared.Next(summaries.Length)]
                        ))
                    .ToArray();
                return forecast;
            })
            .WithName("GetWeatherForecast")
            .WithOpenApi();



// Auto oczyszczajacy sie scope
        using var scope = app.Services.CreateScope();

        var services = scope.ServiceProvider;

        try
        {
            var context = services.GetRequiredService<DataContext>();
            await context.Database.MigrateAsync();
            await Seed.SeedData(context);
            var mediator = services.GetRequiredService<IMediator>();

            
            app.MapGet("/api/activities/{Id}", (Guid ID) =>
                new ActivitiesController(mediator).GetActivity(ID));
            app.MapGet("/api/activities", (CancellationToken ct) =>
                new ActivitiesController(mediator).GetActivities(ct));
            app.MapPost("/api/activities",
                (Activity activity) => new ActivitiesController(mediator).CreateActivity(activity));
            app.MapPut("/api/activities/{Id}",
                (Guid Id, Activity activity) => new ActivitiesController(mediator).EditActivity(Id, activity));
            app.MapDelete("/api/activities/{Id}", (Guid Id) => new ActivitiesController(mediator).DeleteActivity(Id));

        }
        catch (Exception e)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError($"{e} occured during migration");

        }


        app.Run();
    }
}

record WeatherForecast(DateOnly Date, int TemperatureC, string Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
