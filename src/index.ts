import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
import { ProdutoPrismaRepository } from "@modules/catalogo/infra/database/produto.prisma.repository";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main() {
    
    prisma.$connect().then(
        async () =>{
            console.log('Postgres Conectado')
        }
    );

    const categoriaRepo = new CategoriaPrismaRepository(prisma)
    const produtoRepo = new ProdutoPrismaRepository(prisma)

    // const categoriaRecuperada = await categoriaRepo.recuperarPorUuid("3688abfe-200e-458c-b959-ac66baea8176")
    // console.log(categoriaRecuperada)

    // const categoria: Categoria = Categoria.criar({
    //      nome: 'Esporte'
    // })

    // const categoriaInserida = await categoriaRepo.inserir(categoria);
    // console.log(categoriaInserida)

    // const categoria = await categoriaRepo.recuperarTodos()
    // console.log(categoria)

    // const todaCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos()
    // console.log(todaCategorias)


    // const categoria = Categoria.recuperar({
    //     id: "fed0d258-fe72-4130-9404-a85e4691fa7d",
    //     nome: "Mesa e Cozinha"
    // })

    //   const categoria: Categoria = Categoria.criar({
    //     nome: "Mesa e Cozinha",
    //   })
    //   const categoriaInserida = await categoriaRepo.inserir(categoria)
    //   console.log(categoriaInserida)

    // const categoriaAtualizada = await categoriaRepo.atualizar(categoria.id,categoria);
    // console.log(categoriaAtualizada)

    // const categoriaDeletada = await categoriaRepo.deletar("3b844c50-c05d-4492-a262-a659b5eb185a")
    // console.log(categoriaDeletada)

    // const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("f23d489c-9cf9-4e8b-aba2-a973548565b6")
    // console.log(produtoRecuperado)

    // const categoria01: Categoria = Categoria.recuperar({
    //     id: "33616a36-1099-40cd-b57e-bc76e0631240",
    //     nome: 'Esporte'
    // });    
 
    // const produto: Produto = Produto.criar({
    //     nome: 'Bola de basquete',
    //     descricao: 'Bola de Basquete',
    //     valor: 40,
    //     categorias: [categoria01]
    // })

    // const produtoInserido = await produtoRepo.inserir(produto);
    // console.log(produtoInserido);

    // const todosProdutos = Array<Produto> = await produtoRepo.recuperarTodos()
    // console.log(todosProdutos)

    // const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id,produto);

    // console.log(atualizouProduto)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
       if (error instanceof DomainException) {
           console.log('Execeção de Dóminio');
           console.log(error.message);
       }
       else {
           console.log('Outras Exceções');
           console.log(error.message);
       }
       await prisma.$disconnect()
       process.exit(1)
   })
   