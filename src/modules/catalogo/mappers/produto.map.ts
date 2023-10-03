import { ProdutoComCategoriaPrisma } from "@shared/infra/database/prisma.types";
import { Produto } from "../domain/produto/produto.entity";
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";
import { Categoria } from "../domain/categoria/categoria.entity";
import { CategoriaMap } from "./categoria.map";

class ProdutoMap {
    public static toDTO(produto: Produto): IProduto{
        return{
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            categorias: produto.categorias
        }
    }

    public static toDomain(produto: RecuperarProdutoProps): Produto{
        return Produto.recuperar(produto)
    }

    public static fromPrismaModelToDomain(produto: ProdutoComCategoriaPrisma): Produto{
        const categorias: Array<Categoria> = [];

        produto.categorias.map((categoria)=>{
            categorias.push(CategoriaMap.fromPrismaModelToDomain(categoria.categoria))
        })

        return this.toDomain(
            {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categorias: categorias
            }
        )
    }
}

export {ProdutoMap}