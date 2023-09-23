import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient();

async function main() {
    let categoria: Categoria;
    categoria = Categoria.criar({nome: 'mesa'})

    await prisma.categoria.create({
        data: {
            id: categoria.id,
            nome: categoria.nome
        }
    })

    const categoriaRecuperada = await prisma.categoria.update({
        where: {id: "3688abfe-200e-458c-b959-ac66baea8176"},
        data: {nome: "banho"}
    })

    const ListaCategorias = await prisma.categoria.findMany();
    console.log(ListaCategorias);  
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