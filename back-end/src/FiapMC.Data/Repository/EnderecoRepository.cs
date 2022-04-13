using System;
using System.Threading.Tasks;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Models;
using FiapMC.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace FiapMC.Data.Repository
{
    public class EnderecoRepository : Repository<Endereco>, IEnderecoRepository
    {
        public EnderecoRepository(MCDbContext context) : base(context) { }

        public async Task<Endereco> ObterEnderecoPorRestaurante(Guid restauranteId)
        {
            return await Db.Enderecos.AsNoTracking()
                .FirstOrDefaultAsync(f => f.RestauranteId == restauranteId);
        }
    }
}
