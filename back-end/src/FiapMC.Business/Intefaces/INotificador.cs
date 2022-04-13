using System.Collections.Generic;
using FiapMC.Business.Notificacoes;

namespace FiapMC.Business.Intefaces
{
    public interface INotificador
    {
        bool TemNotificacao();
        List<Notificacao> ObterNotificacoes();
        void Handle(Notificacao notificacao);
    }
}
