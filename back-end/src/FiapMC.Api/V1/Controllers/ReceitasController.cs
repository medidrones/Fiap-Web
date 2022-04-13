using System;
using System.Collections.Generic;
using System.IO;
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
    [Route("api/v{version:apiVersion}/receitas")]
    public class ReceitasController : MainController
    {
        private readonly IReceitaRepository _receitaRepository;
        private readonly IReceitaService _receitaService;
        private readonly IMapper _mapper;

        public ReceitasController(INotificador notificador, 
                                  IReceitaRepository receitaRepository, 
                                  IReceitaService receitaService, 
                                  IMapper mapper,
                                  IUser user) : base(notificador, user)
        {
            _receitaRepository = receitaRepository;
            _receitaService = receitaService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IEnumerable<ReceitaViewModel>> ObterTodos()
        {
            return _mapper.Map<IEnumerable<ReceitaViewModel>>(await _receitaRepository.ObterReceitasRestaurantes());
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<ReceitaViewModel>> ObterPorId(Guid id)
        {
            var receitaViewModel = await ObterReceita(id);

            if (receitaViewModel == null) return NotFound();

            return receitaViewModel;
        }

        [ClaimsAuthorize("Receita", "Adicionar")]
        [HttpPost]
        public async Task<ActionResult<ReceitaViewModel>> Adicionar(ReceitaViewModel receitaViewModel)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            var imagemNome = Guid.NewGuid() + "_" + receitaViewModel.Imagem;
            if (!UploadArquivo(receitaViewModel.ImagemUpload, imagemNome))
            {
                return CustomResponse(receitaViewModel);
            }

            receitaViewModel.Imagem = imagemNome;
            await _receitaService.Adicionar(_mapper.Map<Receita>(receitaViewModel));

            return CustomResponse(receitaViewModel);
        }

        [ClaimsAuthorize("Receita", "Atualizar")]
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Atualizar(Guid id, ReceitaViewModel receitaViewModel)
        {
            if (id != receitaViewModel.Id)
            {
                NotificarErro("Os ids informados não são iguais!");
                return CustomResponse();
            }

            var receitaAtualizacao = await ObterReceita(id);
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            if (receitaViewModel.ImagemUpload != null)
            {
                var imagemNome = Guid.NewGuid() + "_" + receitaViewModel.Imagem;
                if (!UploadArquivo(receitaViewModel.ImagemUpload, imagemNome))
                {
                    return CustomResponse(ModelState);
                }

                receitaAtualizacao.Imagem = imagemNome;
            }
            else
            {
                receitaViewModel.Imagem = receitaAtualizacao.Imagem;
            }

            receitaAtualizacao.RestauranteId = receitaViewModel.RestauranteId;
            receitaAtualizacao.Nome = receitaViewModel.Nome;
            receitaAtualizacao.Descricao = receitaViewModel.Descricao;
            receitaAtualizacao.Ingrediente = receitaViewModel.Ingrediente;
            receitaAtualizacao.ModoPreparo = receitaViewModel.ModoPreparo;
            receitaAtualizacao.Tag = receitaViewModel.Tag;
            receitaAtualizacao.Valor = receitaViewModel.Valor;
            receitaAtualizacao.Ativo = receitaViewModel.Ativo;

            await _receitaService.Atualizar(_mapper.Map<Receita>(receitaAtualizacao));

            return CustomResponse(receitaViewModel);
        }

        [ClaimsAuthorize("Receita", "Excluir")]
        [HttpDelete("{id:guid}")]
        public async Task<ActionResult<ReceitaViewModel>> Excluir(Guid id)
        {
            var receita = await ObterReceita(id);

            if (receita == null) return NotFound();

            await _receitaService.Remover(id);

            return CustomResponse(receita);
        }

        private bool UploadArquivo(string arquivo, string imgNome)
        {
            if (string.IsNullOrEmpty(arquivo))
            {
                NotificarErro("Forneça uma imagem para esta receita!");
                return false;
            }

            var imageDataByteArray = Convert.FromBase64String(arquivo);

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imgNome);

            if (System.IO.File.Exists(filePath))
            {
                NotificarErro("Já existe um arquivo com este nome!");
                return false;
            }

            System.IO.File.WriteAllBytes(filePath, imageDataByteArray);

            return true;
        }
       
        private async Task<ReceitaViewModel> ObterReceita(Guid id)
        {
            return _mapper.Map<ReceitaViewModel>(await _receitaRepository.ObterReceitaRestaurante(id));
        }
    }
}
