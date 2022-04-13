using System;
using System.Threading.Tasks;
using FiapMC.Business.Models;

namespace FiapMC.Business.Intefaces
{
    public interface IRestauranteService : IDisposable
    {
        Task<bool> Adicionar(Restaurante restaurante);
        Task<bool> Atualizar(Restaurante restaurante);
        Task<bool> Remover(Guid id);

        Task AtualizarEndereco(Endereco endereco);
    }
}
