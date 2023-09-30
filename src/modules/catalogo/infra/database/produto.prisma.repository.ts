import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";

class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto> {
    async recuperarPorUuid(uuid: string): Promise<Produto | null> {
        const produtoRecuperado = await this._datasource.produto.findUnique(
            {
                where: {
                    id: uuid
                },
                include: {
                    categorias: {
                        include: {
                            categoria: true
                        }
                    }
                }
            }

        )
        if (produtoRecuperado) {
            const produto = Produto.recuperar({
                id: produtoRecuperado.id,
                nome: produtoRecuperado.nome,
                descricao: produtoRecuperado.descricao,
                valor: produtoRecuperado.valor,
                categorias: produtoRecuperado.categorias.map(
                    (categoria) => {
                        return Categoria.recuperar({
                            id: categoria.produtoId,
                            nome: categoria.categoria.nome
                        })
                    }
                )
            })
            return produto;
        }
        return null
    }
    recuperarTodos(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    async existe(uuid: string): Promise<Boolean> {
        const produtoExistente = await this.recuperarPorUuid(uuid)
        if(produtoExistente) {return true}
        return false
    }

    async inserir(produto: Produto): Promise<Produto> {
        const produtoInserido = await this._datasource.produto.create(
            {
                data: {
                    id: produto.id,
                    nome: produto.nome,
                    descricao: produto.descricao,
                    valor: produto.valor,
                    categorias: {
                        create: [
                            
                        ]
                    }
                }
            }
        )
    }
    atualizar(uuid: string, entity: Partial<Produto>): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    deletar(uuid: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}

export { ProdutoPrismaRepository }


                            