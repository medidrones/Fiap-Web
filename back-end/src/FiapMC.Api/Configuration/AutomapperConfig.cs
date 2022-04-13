using AutoMapper;
using FiapMC.Api.ViewModels;
using FiapMC.Business.Models;

namespace FiapMC.Api.Configuration
{
    public class AutomapperConfig : Profile
    {
        public AutomapperConfig()
        {
            CreateMap<Restaurante, RestauranteViewModel>().ReverseMap();
            CreateMap<Endereco, EnderecoViewModel>().ReverseMap();
            CreateMap<ReceitaViewModel, Receita>();

            CreateMap<Receita, ReceitaViewModel>()
                .ForMember(dest => dest.NomeRestaurante, opt => opt.MapFrom(src => src.Restaurante.Nome));
        }
    }
}
