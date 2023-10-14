import { IDatasControle, KeysDatasControles } from "@shared/domain/datas.type";
import { Categoria } from "../categoria/categoria.entity";

enum StatusProduto {
    ATIVO = "ATIVO",
    DESATIVO = "DESATIVO"
}

interface IProduto extends IDatasControle{
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categorias: Array<Categoria>;
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