import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test } from "vitest";
import { Categoria } from "../categoria/categoria.entity";
import { Produto } from "./produto.entity";
import { DescricaoProdutoTamanhoMaximoInvalido, DescricaoProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido, NomeProdutoTamanhoMinimoInvalido, QtdMaximaCategoriaProdutoInvalida, QtdMinimaCategoriaProdutoInvalida, ValorMinimoProdutoInvalido } from "./produto.exception";
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

beforeAll (async ()=>{

    
     nomeProdutoValido = faker.string.alpha({length: {min:5,max:50}})
     nomeProdutoTamanhoMinInvalido = faker.string.alpha({length: {min:0,max:4}})
     nomeProdutoTamanhoMaxInvalido = faker.string.alpha({length: {min:51,max:51}})
     descricaoProdutoValido = faker.string.alpha({length: {min:10,max:200}})
     descricaoProdutoTamanhoMinInvalido = faker.string.alpha({length: {min:0,max:9}})
     descricaoProdutoTamanhoMaxInvalido = faker.string.alpha({length: {min:201,max:201}})
     valorProdutoValido = faker.number.int({min: 1,max: 2000})
     valorMinProdutoInvalido = faker.number.int({min: -10, max: 0})

     const categoriaValida01 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     const categoriaValida02 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     const categoriaValida03 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     const categoriaValida04 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
     categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1,max:3});
     categoriasQtdMinInvalidas = [];
     categoriasQtdMaxInvalidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], { min: 4, max: 4});
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
            .toThrowError(NomeProdutoTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Máximo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoTamanhoMaxInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido);

    });
    
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Mínimo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMinInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMinimoInvalido);

    });
    
    test('Não Deve Criar Produto Com Descrição Inválida (Tamanho Máximo)', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMaxInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(DescricaoProdutoTamanhoMaximoInvalido);

    });

    test('Não Deve Criar Produto Com Valor Mínimo Inválido', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorMinProdutoInvalido,
            categorias: categoriasValidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(ValorMinimoProdutoInvalido);

    });

    test('Não Deve Criar Produto Com Número Mínimo de Categorias Inválido', async () => {

        const produtoNomeInvalido: CriarProdutosProps= {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMinInvalidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMinimaCategoriaProdutoInvalida);

    });

    test('Não Deve Criar Produto Com Número Máximo de Categorias Inválido', async () => {

        const produtoNomeInvalido: CriarProdutosProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMaxInvalidas
        };

        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(QtdMaximaCategoriaProdutoInvalida);

    });
    
});