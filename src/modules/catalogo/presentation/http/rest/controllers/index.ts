
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id.express.controller";
import { RecuperarTodasCategoriaExpressController } from "./recuperar-todas-categorias.express.controller";
import { InserirCategoriaExpressController } from "./inserir-categoria.express.controller";
import { AtualizarCategoriaExpressController } from "./atualizar-categoria.express.controller";
import { DeletarCategoriaExpressController } from "./deletar-categoria.express.controller";
import { atualizarCategoriaUseCase, deletarCategoriaUseCase, inserirCategoriaUseCase, recuperarCategoriaPorIdUseCase, recuperarProdutoPorIdUseCase, recuperarTodasCategoriasUseCase, recuperarTodosProdutosUseCase } from "@modules/catalogo/application/use-case";
import { RecuperarTodosProdutosExpressController } from "./recuperar-todos-produtos.express.controller";

const recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCase);
const recuperarTodasCategoriasController = new RecuperarTodasCategoriaExpressController(recuperarTodasCategoriasUseCase);
const recuperarTodosProdutosController = new RecuperarTodosProdutosExpressController(recuperarTodosProdutosUseCase);
const inserirCategoriaController = new InserirCategoriaExpressController(inserirCategoriaUseCase);
const atualizarCategoriaController = new AtualizarCategoriaExpressController(atualizarCategoriaUseCase);
const deletarCategoriaController = new DeletarCategoriaExpressController(deletarCategoriaUseCase);

export {
    recuperarCategoriaPorIdController,
    recuperarTodasCategoriasController,
    inserirCategoriaController,   
    atualizarCategoriaController,
    deletarCategoriaController,
    recuperarTodosProdutosController
}