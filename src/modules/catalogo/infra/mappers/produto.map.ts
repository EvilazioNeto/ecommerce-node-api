import { ProdutoComCategoriaPrisma } from "@shared/infra/database/prisma.types";
import { Produto } from "../../domain/produto/produto.entity";
import { IProduto, RecuperarProdutoProps, StatusProduto } from "../../domain/produto/produto.types";
import { Categoria } from "../../domain/categoria/categoria.entity";
import { CategoriaMap } from "./categoria.map";
import { StatusProdutoPrisma } from "@prisma/client";

class ProdutoMap {

    public static toDTO(produto: Produto): IProduto {
        return {
          id: produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          valor: produto.valor,
          categorias:  produto.categorias.map((categoria) => { return CategoriaMap.toDTO(categoria)}),
          dataCriacao: produto.dataCriacao,
          dataAtualizacao: produto.dataAtualizacao,
          dataExclusao: produto.dataExclusao,
          status: produto.status
        }
    }   

    public static toDomain(produto: RecuperarProdutoProps): Produto {
        return Produto.recuperar(produto);
    }

    public static fromPrismaModelToDomain(produtoPrisma: ProdutoComCategoriaPrisma): Produto {

        const categorias: Array<Categoria> = [];

        produtoPrisma.categorias.map(
            (categoria) => {
                categorias.push(
                    CategoriaMap.fromPrismaModelToDomain(categoria.categoria)
                )
            }
        );

        return this.toDomain({
            id: produtoPrisma.id,
            nome: produtoPrisma.nome,
            descricao: produtoPrisma.descricao,
            valor: produtoPrisma.valor,
            categorias: categorias,
            dataCriacao: produtoPrisma.dataCriacao,
            dataAtualizacao: produtoPrisma.dataAtualizacao,
            dataExclusao: produtoPrisma.dataExclusao,
            status: StatusProduto[produtoPrisma.status]
        });

    }

    public static toStatusProdutoPrisma(status: StatusProduto): StatusProdutoPrisma{
        return StatusProdutoPrisma[status.toString() as keyof typeof StatusProdutoPrisma];
    }


}

export { ProdutoMap }