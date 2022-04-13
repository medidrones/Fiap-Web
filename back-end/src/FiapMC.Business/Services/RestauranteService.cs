using System;
using System.Linq;
using System.Threading.Tasks;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Models;
using FiapMC.Business.Models.Validations;

namespace FiapMC.Business.Services
{
    public class RestauranteService : BaseService, IRestauranteService
    {
        private readonly IRestauranteRepository _restauranteRepository;
        private readonly IEnderecoRepository _enderecoRepository;

        public RestauranteService(IRestauranteRepository restauranteRepository, 
                                 IEnderecoRepository enderecoRepository,
                                 INotificador notificador) : base(notificador)
        {
            _restauranteRepository = restauranteRepository;
            _enderecoRepository = enderecoRepository;
        }

        public async Task<bool> Adicionar(Restaurante restaurante)
        {
            if (!ExecutarValidacao(new RestauranteValidation(), restaurante) 
                || !ExecutarValidacao(new EnderecoValidation(), restaurante.Endereco)) return false;

            if (_restauranteRepository.Buscar(f => f.Documento == restaurante.Documento).Result.Any())
            {
                Notificar("Já existe um restaurante com este documento informado.");
                return false;
            }

            await _restauranteRepository.Adicionar(restaurante);
            return true;
        }

        public async Task<bool> Atualizar(Restaurante restaurante)
        {
            if (!ExecutarValidacao(new RestauranteValidation(), restaurante)) return false;

            if (_restauranteRepository.Buscar(f => f.Documento == restaurante.Documento && f.Id != restaurante.Id).Result.Any())
            {
                Notificar("Já existe um restaurante com este documento infomado.");
                return false;
            }

            await _restauranteRepository.Atualizar(restaurante);
            return true;
        }

        public async Task AtualizarEndereco(Endereco endereco)
        {
            if (!ExecutarValidacao(new EnderecoValidation(), endereco)) return;

            await _enderecoRepository.Atualizar(endereco);
        }

        public async Task<bool> Remover(Guid id)
        {
            if (_restauranteRepository.ObterRestauranteReceitasEndereco(id).Result.Receitas.Any())
            {
                Notificar("O restaurante possui produtos cadastrados!");
                return false;
            }

            var endereco = await _enderecoRepository.ObterEnderecoPorRestaurante(id);

            if (endereco != null)
            {
                await _enderecoRepository.Remover(endereco.Id);
            }

            await _restauranteRepository.Remover(id);
            return true;
        }

        public void Dispose()
        {
            _restauranteRepository?.Dispose();
            _enderecoRepository?.Dispose();
        }
    }
}
