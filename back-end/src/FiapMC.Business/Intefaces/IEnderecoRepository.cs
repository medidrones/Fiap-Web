using System;
using System.Threading.Tasks;
using FiapMC.Business.Models;

namespace FiapMC.Business.Intefaces
{
    public interface IEnderecoRepository : IRepository<Endereco>
    {
        Task<Endereco> ObterEnderecoPorRestaurante(Guid restauranteId);
    }
}
