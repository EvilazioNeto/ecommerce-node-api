import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test } from "vitest";
import { Categoria } from "../categoria/categoria.entity";
import { Produto } from "./produto.entity";
import { ProdutoExceptions } from "./produto.exception";
import { CriarProdutosProps } from "./produto.types";


let nomeProdutoValido: string;
let nomeProdutoTamanhoMinInvalido: string;
let nomeProdutoTamanhoMaxInvalido: string;
let descricaoProdutoValido: string;
let descricaoProdutoTamanhoMinInvalido: string;
let descricaoProdutoTamanhoMaxInvalido: string;
let valorProdutoValido: number;
let valorMinProdutoInvalido: number;
let categoriasValidas: Array<Categoria>;
let categoriasQtdMinInvalidas: Array<Categoria>;
let categoriasQtdMaxInvalidas: Array<Categoria>;
let UUIDValido: string;
let categoriasQtdValidaAptaAdicao: Array<Categoria>;
let categoriasQtdMaxValidaInaptaAdicao: Array<Categoria>;
let categoriasQtdValidaInaptaAdicaoDuplicacao: Array<Categoria>;
let categoriasQtdValidaAptaRemocao: Array<Categoria>;
let categoriasQtdMinValidaInaptaRemocao: Array<Categoria>;
let categoriasQtdValidaInaptaRemocaoNaoAssociada: Array<Categoria>;

beforeAll (async ()=>{

    
     nomeProdutoValido = faker.string.alpha({length: {min:5,max:50}})
     nomeProdutoTamanhoMinInvalido = faker.string.alpha({length: {min:0,max:4}})
     nomeProdutoTamanhoMaxInvalido = faker.string.alpha({length: {min:51,max:51}})
     descricaoProdutoValido = faker.string.alpha({length: {min:10,max:200}})
     descricaoProdutoTamanhoMinInvalido = faker.string.alpha({length: {min:0,max:9}})
     descricaoProdutoTamanhoMaxInvalido = faker.string.alpha({length: {min:201,max:201}})
     valorProdutoValido = faker.number.int({min: 1,max: 2000})
     valorMinProdutoInvalido = faker.number.int({min: -10, max: -1})

     const categoriaValida01 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     const categoriaValida02 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     const categoriaValida03 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     const categoriaValida04 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1,max:3});
     categoriasQtdMinInvalidas = [];
     categoriasQtdMaxInvalidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], { min: 4, max: 4});
     categoriasQtdValidaAptaAdicao = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02], { min: 1, max: 2});
     categoriasQtdMaxValidaInaptaAdicao = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], { min: 3, max: 3});
     categoriasQtdValidaInaptaAdicaoDuplicacao = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02], { min: 1, max: 2});
     categoriasQtdValidaAptaRemocao = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], { min: 2, max: 3});
	 categoriasQtdMinValidaInaptaRemocao = faker.helpers.arrayElements<Categoria>([categoriaValida01], { min: 1, max: 1});
	 categoriasQtdValidaInaptaRemocaoNaoAssociada = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], { min: 2, max: 3});

     UUIDValido = faker.string.uuid(); // Retorna um UUID v4
})

describe('Entidade de Domínio: Criar Produto', () => {
    
    test('Deve Criar Um Produto Válido', async () => {

        const produtoValido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(Produto.criar(produtoValido))
            .to.be.instanceof(Produto);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Mínimo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoTamanhoMinInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.NomeProdutoTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Máximo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoTamanhoMaxInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.NomeProdutoTamanhoMaximoInvalido);

    });
    
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Mínimo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMinInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.DescricaoProdutoTamanhoMinimoInvalido);

    });
    
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Máximo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMaxInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.DescricaoProdutoTamanhoMaximoInvalido);

    });

    test('Não Deve Criar Produto Com Valor Mínimo Inválido', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorMinProdutoInvalido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.ValorMinimoProdutoInvalido);

    });

    test('Não Deve Criar Produto Com Número Mínimo de Categorias Inválido', async () => {

        const produtoNomeInvalido: CriarProdutosProps= {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMinInvalidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.QtdMinimaCategoriasProdutoInvalida);

    });

    test('Não Deve Criar Produto Com Número Máximo de Categorias Inválido', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMaxInvalidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ProdutoExceptions.QtdMaximaCategoriasProdutoInvalida);

    });
    
});

describe('Entidade de Domínio: Adicionar Categoria ao Produto', () => {
    
    test('Deve Adicionar Uma Categoria Válida a Um Produto Válido Apto a Ter Uma Nova Categoria', async () => {

        //Dado (Given)
        const produtoValidoAptoNovaCategoria: Produto = Produto.recuperar({
            id: UUIDValido,
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdValidaAptaAdicao
        });

        //Categoria válida que não seja uma das categorias já adicionadas
        const categoriaValida = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});

        //Quando (When) e Então (Then)
		expect(produtoValidoAptoNovaCategoria.adicionarCategoria(categoriaValida))
            .toBe(categoriaValida);

        expect(produtoValidoAptoNovaCategoria.categorias)
            .toContain(categoriaValida);

    });

    test('Não Deve Adicionar Uma Categoria Válida a Um Produto Válido Inapto a Ter Uma Nova Categoria - Quantidade Máxima de Categorias', async () => {

        //Dado (Given)
        const produtoValidoInaptoNovaCategoria: Produto = Produto.recuperar({
            id: UUIDValido,
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMaxValidaInaptaAdicao
        });

        //Categoria válida que não seja uma das categorias já adicionadas
        const categoriaValida = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});

        //Quando (When) e Então (Then)
        expect(() => produtoValidoInaptoNovaCategoria.adicionarCategoria(categoriaValida))
            .toThrowError(ProdutoExceptions.ProdutoJaPossuiQtdMaximaCategorias);
        
    });

    test('Não Deve Adicionar Uma Categoria Válida a Um Produto Válido Inapto a Ter Uma Nova Categoria - Categoria Já Adicionada', async () => {

        //Dado (Given)
        const produtoValidoInaptoNovaCategoria: Produto = Produto.recuperar({
            id: UUIDValido,
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdValidaInaptaAdicaoDuplicacao
        });

        //Categoria válida já adicionada - recupera do array passado no produto anteriormete - garente que é um elemento que já existe
        const categoriaValida = categoriasQtdValidaInaptaAdicaoDuplicacao[0];

        //Quando (When) e Então (Then)
        expect(() => produtoValidoInaptoNovaCategoria.adicionarCategoria(categoriaValida))
            .toThrowError(ProdutoExceptions.ProdutoJaPossuiCategoriaInformada);
        
    });

});
	
describe('Entidade de Domínio: Remover Categoria do Produto', () => {

    test('Deve Remover Uma Categoria Válida de Um Produto Válido Apto a Ter Uma Categoria Removida', async () => {

        //Dado (Given)
        const produtoValidoAptoRemoverCategoria: Produto = Produto.recuperar({
            id: UUIDValido,
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdValidaAptaRemocao
        });

        //Categoria válida que já esteja adicionada 
        const categoriaValida = categoriasQtdValidaAptaRemocao[0];

        //Quando (When) e Então (Then)
        expect(produtoValidoAptoRemoverCategoria.removerCategoria(categoriaValida))
            .toBe(categoriaValida);
        
        expect(produtoValidoAptoRemoverCategoria.categorias)  
            .not.toContain(categoriaValida);
        
    });
    
    test('Não Deve Remover Uma Categoria Válida de Um Produto Válido Inapto a Ter Uma Categoria Removida - Quantidade Mínima de Categorias', async () => {

        //Dado (Given)
        const produtoValidoInaptoRemoverCategoria: Produto = Produto.recuperar({
            id: UUIDValido,
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMinValidaInaptaRemocao
        });

        //Categoria válida que já esteja adicionada 
        const categoriaValida = categoriasQtdMinValidaInaptaRemocao[0];

        //Quando (When) e Então (Then)
        expect(() => produtoValidoInaptoRemoverCategoria.removerCategoria(categoriaValida))
            .toThrowError(ProdutoExceptions.ProdutoJaPossuiQtdMinimaCategorias);
        
    });

    test('Não Deve Remover Uma Categoria Válida de Um Produto Válido Inapto a Ter Uma Categoria Removida - Categoria Não Associada ao Produto', async () => {

        //Dado (Given)
        const produtoValidoInaptoRemoverCategoria: Produto = Produto.recuperar({
            id: UUIDValido,
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdValidaInaptaRemocaoNaoAssociada
        });

        //Categoria válida que não seja uma das categorias já adicionadas
        const categoriaValida = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});

        //Quando (When) e Então (Then)
        expect(() => produtoValidoInaptoRemoverCategoria.removerCategoria(categoriaValida))
            .toThrowError(ProdutoExceptions.ProdutoNaoPossuiCategoriaInformada);
        
    });
    
});
    