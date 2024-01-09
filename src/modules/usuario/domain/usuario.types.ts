import { IDatasControle, KeysDatasControles } from "@shared/domain/datas.type";

enum TipoUsuario {
    CLIENTE = "CLIENTE",
    ADMINISTRADOR = "ADMINISTRADOR"
}

interface IUsuario extends IDatasControle {
    id?: string;
    nome: string;
    email: string;
    senha: string;
    tipo: TipoUsuario;
}

type CriarUsuarioProps = Omit<IUsuario, "id" | KeysDatasControles>

type RecuperarUsuarioProps = IUsuario & {
    id: NonNullable<IUsuario['id']>
};

type CredenciaisUsuarioProps = Omit<IUsuario, "id" | "nome" | "tipo" | KeysDatasControles>;

export {
    IUsuario,
    CriarUsuarioProps,
    RecuperarUsuarioProps,
    TipoUsuario,
    CredenciaisUsuarioProps
}