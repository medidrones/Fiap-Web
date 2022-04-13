using FiapMC.Api.Extensions;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Notificacoes;
using FiapMC.Business.Services;
using FiapMC.Data.Context;
using FiapMC.Data.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace FiapMC.Api.Configuration
{
    public static class DependencyInjectionConfig
    {
        public static IServiceCollection ResolveDependencies(this IServiceCollection services)
        {
            services.AddScoped<MCDbContext>();
            services.AddScoped<IReceitaRepository, ReceitaRepository>();
            services.AddScoped<IRestauranteRepository, RestauranteRepository>();
            services.AddScoped<IEnderecoRepository, EnderecoRepository>();

            services.AddScoped<INotificador, Notificador>();
            services.AddScoped<IRestauranteService, RestauranteService>();
            services.AddScoped<IReceitaService, ReceitaService>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IUser, AspNetUser>();

            services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

            return services;
        }
    }
}
