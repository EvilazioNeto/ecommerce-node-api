import { faker } from "@faker-js/faker";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { ProdutoMap } from "../mappers/produto.map";
import { PrismaClient, StatusProdutoPrisma } from "@prisma/client";
import { afterEach } from "node:test";
import { beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";


const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

let produtoRepositorio: ProdutoPrismaRepository;
let UUIDValido: string;
let nomeProdutoValido: string;
let descricaoProdutoValido: string;
let valorProdutoValido: number;
let dataCriacaoproduto: Date;
let dataAtualizacaoProduto: Date;
let dataExclusao: Date;
let statusProdutoValido: StatusProdutoPrisma;

describe('Repositorio Prisma: Produto', () => {

    beforeAll(async () => {
        produtoRepositorio = new ProdutoPrismaRepository(prismaMock);
        UUIDValido = faker.string.uuid();
        nomeProdutoValido = faker.string.alpha({ length: { min: Produto.TAMANHO_MINIMO_NOME, max: Produto.TAMANHO_MAXIMO_NOME } });
        descricaoProdutoValido = faker.string.alpha({ length: { min: Produto.TAMANHO_MINIMO_DESCRICAO, max: Produto.TAMANHO_MAXIMO_DESCRICAO } });
        valorProdutoValido = faker.number.int({ min: Produto.VALOR_MINIMO });
        dataCriacaoproduto = faker.date.anytime();
        dataAtualizacaoProduto = faker.date.anytime();
        dataExclusao = faker.date.anytime();
        statusProdutoValido = StatusProdutoPrisma.ATIVO;

    });

    afterEach(() => {
        vi.resetAllMocks();
        mockReset(prismaMock);
    });

    describe('Recuperar Produto por ID', () => {

        test('Deve Recuperar um produto por UUID', async () => {
            const produtoPrisma = {
                id: UUIDValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                dataCriacao: dataCriacaoproduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataCriacaoproduto,
                status: statusProdutoValido,
                categorias: [
                    {
                        produtoId: 'f23d489c-9cf9-4e8b-aba2-a973548565b68',
                        categoriaId: 'e0756955-be34-4934-baba-aff22b5769a7',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime(),
                        categoria: {
                            id: UUIDValido,
                            nome: 'Mesa',
                            dataCriacao: faker.date.anytime(),
                            dataAtualizacao: faker.date.anytime()
                        }
                    },
                    {
                        produtoId: 'c57c4a68-1766-4098-939f-f5b8c0d8eb28',
                        categoriaId: '88d7cef0-f390-45c0-8611-1154ec62e089',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime(),
                        categoria: {
                            id: UUIDValido,
                            nome: 'Banho',
                            dataCriacao: faker.date.anytime(),
                            dataAtualizacao: faker.date.anytime()
                        }
                    }
                ]
            };

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma);

            const produto: Produto = ProdutoMap.fromPrismaModelToDomain(produtoPrisma);
            const produtoRecuperada = await produtoRepositorio.recuperarPorUuid(produto.id);

            expect(produtoRecuperada).toEqual(produto);
            expect(prismaMock.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findUnique).toBeCalledWith({
                where: {
                    id: produto.id
                },
                include: produtoIncludeCategoriaPrisma
            });
        });
    });
})