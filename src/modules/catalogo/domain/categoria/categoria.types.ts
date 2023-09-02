//Todos os atributos/propriedades que uma categoria deve ter no sistema
//Auxilia na criação de invariantes e modelos ricos
interface ICategoria {
    id?: string;
    nome: string;
}

type CriarCategoriaProps = Omit<ICategoria, "id">;

type RecuperarCategoriaProps = Required<ICategoria>;

export {ICategoria, CriarCategoriaProps, RecuperarCategoriaProps}