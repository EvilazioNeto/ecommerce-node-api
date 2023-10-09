//Todos os atributos/propriedades que uma categoria deve ter no sistema

import { IDatasControle, KeysDatasControles } from "@shared/domain/datas.type";

//Auxilia na criação de invariantes e modelos ricos
interface ICategoria extends IDatasControle{
    id?: string;
    nome: string;
}

type CriarCategoriaProps = Omit<ICategoria, "id" | KeysDatasControles>;

type RecuperarCategoriaProps = ICategoria & {
    id: NonNullable<ICategoria['id']>
}

export {ICategoria, CriarCategoriaProps, RecuperarCategoriaProps}