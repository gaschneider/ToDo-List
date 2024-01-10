﻿using Microsoft.EntityFrameworkCore;
using System.Reflection;
using ToDoTime.Application;
using ToDoTime.Application.Middlewares;
using ToDoTime.Infrastructure;

namespace ToDoTime
{
    public class Startup(IConfiguration configuration)
    {
        public IConfiguration Configuration { get; } = configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowLocalHost",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            services.AddSwaggerGen();
            services.AddApplication();

            services.AddDbContext<ToDoTimeSQLContext>(option => option.UseSqlServer(Configuration.GetConnectionString("ToDoTimeSQLDB")));
#pragma warning disable CS8603 // Possível retorno de referência nula.
            services.AddScoped<IToDoTimeSQLContext>(provider => provider.GetService<ToDoTimeSQLContext>());
#pragma warning restore CS8603 // Possível retorno de referência nula.
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("AllowLocalHost");

            app.UseCustomExceptionHandler();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI();

        }
    }


}
