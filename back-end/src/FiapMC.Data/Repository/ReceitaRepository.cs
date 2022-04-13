using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Models;
using FiapMC.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace FiapMC.Data.Repository
{
    public class ReceitaRepository : Repository<Receita>, IReceitaRepository
    {
        public ReceitaRepository(MCDbContext context) : base(context) { }

        public async Task<Receita> ObterReceitaRestaurante(Guid id)
        {
            return await Db.Receitas.AsNoTracking().Include(f => f.Restaurante)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Receita>> ObterReceitasRestaurantes()
        {
            return await Db.Receitas.AsNoTracking().Include(f => f.Restaurante)
                .OrderBy(p => p.Nome).ToListAsync();
        }

        public async Task<IEnumerable<Receita>> ObterReceitasPorRestaurante(Guid restauranteId)
        {
            return await Buscar(p => p.RestauranteId == restauranteId);
        }
    }
}
