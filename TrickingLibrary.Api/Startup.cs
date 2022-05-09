using TrickingLibrary.Api.Models;

namespace TrickingLibrary.Api;

public class Startup
{
    private const string AllCors = "All";
    
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        services.AddSingleton<TrickyStore>();
        
        services.AddCors(options => options.AddPolicy(AllCors, build =>
            build.AllowAnyHeader()
                .AllowAnyOrigin()
                .AllowAnyMethod()));
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseCors(AllCors);
        
        app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        });
    }
}