using DigitalArs.Data;
using DigitalArs.Interfaces;
using DigitalArs.Repositories;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<ICuentaRepository, CuentaRepository>();

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<IDummyRepository, DummyRepository>();

builder.Services.Configure<RouteOptions>(options => {
    options.LowercaseUrls = true;
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(options => 
    {
        options.RouteTemplate = "/openapi/{documentName}.json";
    });
    app.MapScalarApiReference(options => {
        options.WithEndpointPrefix("/swagger/{documentName}");
        options.WithLayout(ScalarLayout.Classic);
    });
    //app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
