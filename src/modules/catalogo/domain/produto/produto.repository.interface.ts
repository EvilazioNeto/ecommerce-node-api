import { IRepository } from "@shared/domain/repository.interface";
import { Produto } from "./produto.entity";
import { Categoria } from "../categoria/categoria.entity";

interface IProdutoRepository<T> extends IRepository<T> {

    adicionarCategoria(produto:Produto, categoria: Categoria): Promise<boolean>;
    removerCategoria(produto:Produto, categoria: Categoria): Promise<boolean>;
    recuperarPorCategoria(idCategoria: string): Promise<Produto[]>;

}

export { IProdutoRepository }