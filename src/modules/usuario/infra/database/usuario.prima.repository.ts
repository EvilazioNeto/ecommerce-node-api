import { Usuario } from "@modules/usuario/domain/usuario.entity";
import { IUsuarioRepository } from "@modules/usuario/domain/usuario.repository.interface";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { UsuarioMap } from "../mappers/usuario.map";
import { CredenciaisUsuarioProps } from "@modules/usuario/domain/usuario.types";

class UsuarioPrismaRepository extends PrismaRepository implements IUsuarioRepository<Usuario> {

    async autenticar(credenciais: CredenciaisUsuarioProps): Promise<boolean> {
        const usuarioExistente = await this.recuperarPorEmail(credenciais.email)
        if (usuarioExistente && (credenciais.senha) === usuarioExistente.senha) { return true }
        return false
    }

    async recuperarPorEmail(email: string): Promise<Usuario | null> {
        const usuarioRecuperado = await this._datasource.usuario.findUnique(
            {
                where: {
                    email: email
                }
            }
        )
        if (usuarioRecuperado) {
            return UsuarioMap.fromPrismaModelToDomain(usuarioRecuperado);
        }
        return null;
    }

    async recuperarPorUuid(uuid: string): Promise<Usuario | null> {
        throw new Error("Method not implemented.");
    }

    async recuperarTodos(): Promise<Array<Usuario>> {
        throw new Error("Method not implemented.");
    }

    async existe(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async inserir(usuario: Usuario): Promise<Usuario> {
        const usuarioInserido = await this._datasource.usuario.create(
            {
                data: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    senha: usuario.senha,
                    tipo: UsuarioMap.toTipoUsuarioPrisma(usuario.tipo)
                }
            }
        );
        return UsuarioMap.fromPrismaModelToDomain(usuarioInserido);
    }

    async atualizar(uuid: string, usuario: Usuario): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async deletar(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}

export { UsuarioPrismaRepository }