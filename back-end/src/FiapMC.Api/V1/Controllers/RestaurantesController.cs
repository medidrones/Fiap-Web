using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FiapMC.Api.Controllers;
using FiapMC.Api.Extensions;
using FiapMC.Api.ViewModels;
using FiapMC.Business.Intefaces;
using FiapMC.Business.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FiapMC.Api.V1.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}/restaurantes")]
    public class RestaurantesController : MainController
    {
        private readonly IRestauranteRepository _restauranteRepository;
        private readonly IRestauranteService _restauranteService;
        private readonly IEnderecoRepository _enderecoRepository;
        private readonly IMapper _mapper;

        public RestaurantesController(IRestauranteRepository restauranteRepository, 
                                      IMapper mapper, 
                                      IRestauranteService restauranteService,
                                      INotificador notificador, 
                                      IEnderecoRepository enderecoRepository,
                                      IUser user) : base(notificador, user)
        {
            _restauranteRepository = restauranteRepository;
            _mapper = mapper;
            _restauranteService = restauranteService;
            _enderecoRepository = enderecoRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IEnumerable<RestauranteViewModel>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<RestauranteViewModel>>(await _restauranteRepository.ObterTodos());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<RestauranteViewModel>> ObterPorId(Guid id)
        {
            var restaurante = await ObterRestauranteReceitasEndereco(id);

            if (restaurante == null) return NotFound();

            return restaurante;
        }

        [ClaimsAuthorize("Restaurante", "Adicionar")]
        [HttpPost]
        public async Task<ActionResult<RestauranteViewModel>> Adicionar(RestauranteViewModel restauranteViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _restauranteService.Adicionar(_mapper.Map<Restaurante>(restauranteViewModel));

            return CustomResponse(restauranteViewModel);
        }

        [ClaimsAuthorize("Restaurante", "Atualizar")]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<RestauranteViewModel>> Atualizar(Guid id,[FromBody] RestauranteViewModel restauranteViewModel)
        {
            if (id != restauranteViewModel.Id)
            {
                NotificarErro("O id informado não é o mesmo que foi passado na query");
                return CustomResponse(restauranteViewModel);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _restauranteService.Atualizar(_mapper.Map<Restaurante>(restauranteViewModel));

            return CustomResponse(restauranteViewModel);
        }

        [ClaimsAuthorize("Restaurante", "Excluir")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<RestauranteViewModel>> Excluir(Guid id)
        {
            var restauranteViewModel = await ObterRestauranteEndereco(id);

            if (restauranteViewModel == null) return NotFound();

            await _restauranteService.Remover(id);

            return CustomResponse(restauranteViewModel);
        }

        [HttpGet("endereco/{id:guid}")]
        public async Task<EnderecoViewModel> ObterEnderecoPorId(Guid id)
        {
            return _mapper.Map<EnderecoViewModel>(await _enderecoRepository.ObterPorId(id));
        }

        [ClaimsAuthorize("Restaurante", "Atualizar")]
        [HttpPut("endereco/{id:guid}")]
        public async Task<IActionResult> AtualizarEndereco(Guid id, EnderecoViewModel enderecoViewModel)
        {
            if (id != enderecoViewModel.Id)
            {
                NotificarErro("O id informado não é o mesmo que foi passado na query");
                return CustomResponse(enderecoViewModel);
            }

            if (!ModelState.IsValid) return CustomResponse(ModelState);

            await _restauranteService.AtualizarEndereco(_mapper.Map<Endereco>(enderecoViewModel));

            return CustomResponse(enderecoViewModel);
        }

        private async Task<RestauranteViewModel> ObterRestauranteReceitasEndereco(Guid id)
        {
            return _mapper.Map<RestauranteViewModel>(await _restauranteRepository.ObterRestauranteReceitasEndereco(id));
        }

        private async Task<RestauranteViewModel> ObterRestauranteEndereco(Guid id)
        {
            return _mapper.Map<RestauranteViewModel>(await _restauranteRepository.ObterRestauranteEndereco(id));
        }
    }
}
