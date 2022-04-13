using FiapMC.Business.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace FiapMC.Data.Mappings
{
    public class RestauranteMapping : IEntityTypeConfiguration<Restaurante>
    {
        public void Configure(EntityTypeBuilder<Restaurante> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                .IsRequired()
                .HasColumnType("varchar(200)");

            builder.Property(p => p.Documento)
                .IsRequired()
                .HasColumnType("varchar(14)");

            // 1 : 1 => Restaurante : Endereco
            builder.HasOne(f => f.Endereco)
                .WithOne(e => e.Restaurante);

            // 1 : N => Restaurante : Receitas
            builder.HasMany(f => f.Receitas)
                .WithOne(p => p.Restaurante)
                .HasForeignKey(p => p.RestauranteId);

            builder.ToTable("Restaurantes");
        }
    }
}
