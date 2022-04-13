using FiapMC.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FiapMC.Data.Mappings
{
    public class ReceitaMapping : IEntityTypeConfiguration<Receita>
    {
        public void Configure(EntityTypeBuilder<Receita> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.Descricao)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(p => p.Ingrediente)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(p => p.ModoPreparo)
                .IsRequired()
                .HasColumnType("varchar(1000)");

            builder.Property(p => p.Tag)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.Property(p => p.Imagem)
                .IsRequired()
                .HasColumnType("varchar(100)");

            builder.ToTable("Receitas");
        }
    }
}
