import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
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

    //const categoriaRecuperada = await categoriaRepo.recuperarPorUuid("3688abfe-200e-458c-b959-ac66baea8176")
    //console.log(categoriaRecuperada)

    // const categoria: Categoria = Categoria.criar({
    //     nome: 'Banho'
    // })

    // const categoriaInserida = await categoriaRepo.inserir(categoria);
    // console.log(categoriaInserida)

    //const categoria = await categoriaRepo.recuperarTodos()
    //console.log(categoria)

    // const categoria = Categoria.recuperar({
    //     id: "fed0d258-fe72-4130-9404-a85e4691fa7d",
    //     nome: "Mesa e Cozinha"
    // })
    // const categoriaAtualizada = await categoriaRepo.atualizar(categoria.id,categoria);
    // console.log(categoriaAtualizada)

    const categopriaDeletada = await categoriaRepo.deletar("adcf0d3b-2e4f-4371-b89f-2618ce70b31d")
    console.log(categopriaDeletada)

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
   