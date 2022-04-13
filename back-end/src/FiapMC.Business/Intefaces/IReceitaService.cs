using System;
using System.Threading.Tasks;
using FiapMC.Business.Models;

namespace FiapMC.Business.Intefaces
{
    public interface IReceitaService : IDisposable
    {
        Task Adicionar(Receita receita);
        Task Atualizar(Receita receita);
        Task Remover(Guid id);
    }
}
