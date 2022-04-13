using System;

namespace FiapMC.Business.Models
{
    public class Receita : Entity
    {
        public Guid RestauranteId { get; set; }

        public string Nome { get; set; }
        public string Descricao { get; set; }
        public string Ingrediente { get; set; }
        public string ModoPreparo { get; set; }
        public string Tag { get; set; }
        public string Imagem { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }

        /* EF Relations */
        public Restaurante Restaurante { get; set; }
    }
}
