using System;
using System.Threading.Tasks;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Models;
using FiapMC.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace FiapMC.Data.Repository
{
    public class RestauranteRepository : Repository<Restaurante>, IRestauranteRepository
    {
        public RestauranteRepository(MCDbContext context) : base(context)
        {
        }

        public async Task<Restaurante> ObterRestauranteEndereco(Guid id)
        {
            return await Db.Restaurantes.AsNoTracking()
                .Include(c => c.Endereco)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Restaurante> ObterRestauranteReceitasEndereco(Guid id)
        {
            return await Db.Restaurantes.AsNoTracking()
                .Include(c => c.Receitas)
                .Include(c => c.Endereco)
                .FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
