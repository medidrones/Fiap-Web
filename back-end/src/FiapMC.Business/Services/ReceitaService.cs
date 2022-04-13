using System;
using System.Threading.Tasks;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Models;
using FiapMC.Business.Models.Validations;

namespace FiapMC.Business.Services
{
    public class ReceitaService : BaseService, IReceitaService
    {
        private readonly IReceitaRepository _receitaRepository;
        private readonly IUser _user;

        public ReceitaService(IReceitaRepository receitaRepository,
                              INotificador notificador, 
                              IUser user) : base(notificador)
        {
            _receitaRepository = receitaRepository;
            _user = user;
        }

        public async Task Adicionar(Receita receita)
        {
            if (!ExecutarValidacao(new ReceitaValidation(), receita)) return;

            await _receitaRepository.Adicionar(receita);
        }

        public async Task Atualizar(Receita receita)
        {
            if (!ExecutarValidacao(new ReceitaValidation(), receita)) return;

            await _receitaRepository.Atualizar(receita);
        }

        public async Task Remover(Guid id)
        {
            await _receitaRepository.Remover(id);
        }

        public void Dispose()
        {
            _receitaRepository?.Dispose();
        }
    }
}
