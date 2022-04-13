using System;
using System.Threading.Tasks;
using FiapMC.Business.Models;

namespace FiapMC.Business.Intefaces
{
    public interface IRestauranteRepository : IRepository<Restaurante>
    {
        Task<Restaurante> ObterRestauranteEndereco(Guid id);
        Task<Restaurante> ObterRestauranteReceitasEndereco(Guid id);
    }
}
