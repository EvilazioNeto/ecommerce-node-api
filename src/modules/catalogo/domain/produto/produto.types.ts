import { IDatasControle, KeysDatasControles } from "@shared/domain/datas.type";
import { Categoria } from "../categoria/categoria.entity";

interface IProduto extends IDatasControle{
    id?: string,
    nome: string,
    descricao: string,
    valor: number,
    categorias: Array<Categoria>
}

type CriarProdutosProps = Omit<IProduto, "id" | KeysDatasControles>
type RecuperarProdutoProps = IProduto & {
    id: NonNullable<IProduto['id']>
};

export{
    IProduto,
    CriarProdutosProps,
    RecuperarProdutoProps
}