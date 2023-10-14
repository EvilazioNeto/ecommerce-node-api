import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test } from 'vitest';
import { IDEntityUUIDInvalid } from '@shared/domain/domain.exception';
import { Categoria } from './categoria.entity';
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from './categoria.exception';
import { CriarCategoriaProps, RecuperarCategoriaProps } from './categoria.types';

let nomeCategoriaValido: string;
let nomeCategoriaTamanhoMinInvalido: string;
let nomeCategoriaTamanhoMaxInvalido: string;
let UUIDValido: string;
let UUIDInvalido: string;

beforeAll(async () => {

	nomeCategoriaValido = faker.string.alpha({length:{min:3,max:50}});
    nomeCategoriaTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:2}});
    nomeCategoriaTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:51}});
    UUIDValido = faker.string.uuid(); // Retorna um UUID v4
	UUIDInvalido = faker.string.alpha({length:{min:1,max:20}});

});

describe('Entidade de Domínio: Categoria', () => {

    describe('Criar Categoria', () => {
    
        test('Deve Criar Uma Categoria Válida', async () => {

            const categoriaValida: CriarCategoriaProps = {
                nome: nomeCategoriaValido
            };

            expect(Categoria.criar(categoriaValida))
                .to.be.instanceof(Categoria);

        });

        test('Não Deve Criar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {

            const categoriaNomeInvalido: CriarCategoriaProps = {
                nome: nomeCategoriaTamanhoMinInvalido
            };

            expect(() => Categoria.criar(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMinimoInvalido);

        });

        test('Não Deve Criar Categoria Com Nome Inválido (Tamanho Máximo)', async () => {

            const categoriaNomeInvalido: CriarCategoriaProps = {
                nome: nomeCategoriaTamanhoMaxInvalido
            };

            expect(() => Categoria.criar(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMaximoInvalido);

        });

    });

    describe('Recuperar Categoria', () => {

        test('Deve Recuperar Uma Categoria Válida', async () => {

            const categoriaValida: RecuperarCategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaValido
            };

            expect(Categoria.recuperar(categoriaValida))
                .to.be.instanceof(Categoria);

        });

        test('Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)', async () => {

            const categoriaIdInvalido: RecuperarCategoriaProps = {
                id: UUIDInvalido,
                nome: nomeCategoriaValido
            };

            expect(() => Categoria.recuperar(categoriaIdInvalido))
                .toThrowError(IDEntityUUIDInvalid);

        });

        test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {

            const categoriaNomeInvalido: RecuperarCategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaTamanhoMinInvalido
            };

            expect(() => Categoria.recuperar(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMinimoInvalido);

        });

        test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)', async () => {

            const categoriaNomeInvalido: RecuperarCategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaTamanhoMaxInvalido
            };

            expect(() => Categoria.recuperar(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMaximoInvalido);

        });

    });

});
