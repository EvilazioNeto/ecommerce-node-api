import { IDatasControle, KeysDatasControles } from "@shared/domain/datas.type";
import { ICategoria } from "../categoria/categoria.types";

enum StatusProduto {
    ATIVO = "ATIVO",
    DESATIVO = "DESATIVO"
}

interface IProduto extends IDatasControle{
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categorias: Array<ICategoria>;
    status?: StatusProduto;
}

type CriarProdutosProps = Omit<IProduto, "id" | KeysDatasControles | "status">
type RecuperarProdutoProps = IProduto & {
    id: NonNullable<IProduto['id']>
};

export{
    IProduto,
    CriarProdutosProps,
    RecuperarProdutoProps,
    StatusProduto
}