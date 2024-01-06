using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using ToDoTime.Application;
using ToDoTime.Infrastructure;

namespace ToDoTime
{
    public class Startup(IConfiguration configuration)
    {
        public IConfiguration Configuration { get; } = configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddApplication();

            services.AddDbContext<ToDoTimeSQLContext>(option => option.UseSqlServer(Configuration.GetConnectionString("ToDoTimeSQLDB")));
#pragma warning disable CS8603 // Possível retorno de referência nula.
            services.AddScoped<IToDoTimeSQLContext>(provider => provider.GetService<ToDoTimeSQLContext>());
#pragma warning restore CS8603 // Possível retorno de referência nula.

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                options.JsonSerializerOptions.WriteIndented = true;
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllHeaders",
                    builder =>
                    {
                        builder.AllowAnyOrigin()
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();
            app.UseSwaggerUI();
            app.UseCors("AllowAllHeaders");
        }
    }


}
