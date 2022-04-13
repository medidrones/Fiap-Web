using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using FiapMC.Business.Models;

namespace FiapMC.Business.Intefaces
{
    public interface IReceitaRepository : IRepository<Receita>
    {
        Task<IEnumerable<Receita>> ObterReceitasPorRestaurante(Guid restauranteId);
        Task<IEnumerable<Receita>> ObterReceitasRestaurantes();
        Task<Receita> ObterReceitaRestaurante(Guid id);
    }
}
