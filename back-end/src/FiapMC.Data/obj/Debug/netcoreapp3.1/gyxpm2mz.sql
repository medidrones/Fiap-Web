IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [Restaurantes] (
    [Id] uniqueidentifier NOT NULL,
    [Nome] varchar(200) NOT NULL,
    [Documento] varchar(14) NOT NULL,
    [TipoRestaurante] int NOT NULL,
    [Ativo] bit NOT NULL,
    CONSTRAINT [PK_Restaurantes] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [Enderecos] (
    [Id] uniqueidentifier NOT NULL,
    [RestauranteId] uniqueidentifier NOT NULL,
    [Logradouro] varchar(200) NOT NULL,
    [Numero] varchar(50) NOT NULL,
    [Complemento] varchar(250) NULL,
    [Cep] varchar(8) NOT NULL,
    [Bairro] varchar(100) NOT NULL,
    [Cidade] varchar(100) NOT NULL,
    [Estado] varchar(50) NOT NULL,
    CONSTRAINT [PK_Enderecos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Enderecos_Restaurantes_RestauranteId] FOREIGN KEY ([RestauranteId]) REFERENCES [Restaurantes] ([Id]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Receitas] (
    [Id] uniqueidentifier NOT NULL,
    [RestauranteId] uniqueidentifier NOT NULL,
    [Nome] varchar(200) NOT NULL,
    [Descricao] varchar(1000) NOT NULL,
    [Ingrediente] varchar(1000) NOT NULL,
    [ModoPreparo] varchar(1000) NOT NULL,
    [Tag] varchar(100) NOT NULL,
    [Imagem] varchar(100) NOT NULL,
    [Valor] decimal(18,2) NOT NULL,
    [DataCadastro] datetime2 NOT NULL,
    [Ativo] bit NOT NULL,
    CONSTRAINT [PK_Receitas] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Receitas_Restaurantes_RestauranteId] FOREIGN KEY ([RestauranteId]) REFERENCES [Restaurantes] ([Id]) ON DELETE NO ACTION
);

GO

CREATE UNIQUE INDEX [IX_Enderecos_RestauranteId] ON [Enderecos] ([RestauranteId]);

GO

CREATE INDEX [IX_Receitas_RestauranteId] ON [Receitas] ([RestauranteId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220326180734_Migrations', N'3.1.4');

GO

