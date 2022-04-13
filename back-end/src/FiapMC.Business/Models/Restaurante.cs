using System.Collections.Generic;

namespace FiapMC.Business.Models
{
    public class Restaurante : Entity
    {
        public string Nome { get; set; }
        public string Documento { get; set; }
        public TipoRestaurante TipoRestaurante { get; set; }
        public Endereco Endereco { get; set; }
        public bool Ativo { get; set; }

        /* EF Relations */
        public IEnumerable<Receita> Receitas { get; set; }
    }
}
