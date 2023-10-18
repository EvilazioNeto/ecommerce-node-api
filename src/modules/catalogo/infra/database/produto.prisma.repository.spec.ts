import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep } from "vitest-mock-extended";
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { beforeAll, describe } from "vitest";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let produtoRepositorio: ProdutoPrismaRepository;
let UUIDValido: string;
let nomeProdutoValido: string;
let descricaoProdutoValido: string;
let valorProdutoValido: number;
let categoriaValida: Array<Categoria>
let dataCriacaoProduto: Date;
let dataAtualizacaoProduto: Date;
let statusProdutoValido: StatusProduto;

describe('Repositório Prisma: Produto', () => {

    beforeAll(async () =>{
        produtoRepositorio = new ProdutoPrismaRepository(prismaMock)
        UUIDValido = faker.string.uuid();
        nomeProdutoValido = faker.string.alpha({ length: { min: Produto.TAMANHO_MINIMO_NOME, max: Produto.TAMANHO_MAXIMO_NOME } });
        descricaoProdutoValido = faker.string.alpha({length: {min: Produto.TAMANHO_MINIMO_DESCRICAO, max: Produto.TAMANHO_MAXIMO_DESCRICAO}})
        valorProdutoValido = faker.number.int({min: Produto.VALOR_MINIMO})
        
        dataCriacaoProduto = faker.date.anytime();
        dataAtualizacaoProduto = faker.date.anytime();
        statusProdutoValido = StatusProduto.ATIVO
    })
})


