import { Usuario } from "@modules/usuario/domain/usuario.entity";
import { IUsuarioRepository } from "@modules/usuario/domain/usuario.repository.interface";
import { UsuarioPrismaRepository } from "./usuario.prima.repository";


const usuarioRepositorio: IUsuarioRepository<Usuario> = new UsuarioPrismaRepository(prisma);

export { usuarioRepositorio }