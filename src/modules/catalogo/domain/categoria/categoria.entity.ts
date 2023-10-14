import { ICategoria, CriarCategoriaProps, RecuperarCategoriaProps } from "./categoria.types";
import { NomeCategoriaNuloOuIndefinido, NomeCategoriaTamanhoMinimoInvalido, NomeCategoriaTamanhoMaximoInvalido } from "./categoria.exception";
import { Entity } from "@shared/domain/entity";
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";

class Categoria extends Entity<ICategoria> implements ICategoria {

    private _nome: string = ''
    private _dataCriacao?: Date | undefined;
    private _dataAtualizacao?: Date | undefined;

    public static readonly TAMANHO_MINIMO_NOME = 3
    public static readonly TAMANHO_MAXIMO_NOME = 50


    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }
    private set dataCriacao(dataCriacao: Date | undefined) {
        this._dataCriacao = dataCriacao;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }
    private set dataAtualizacao(dataAtualizacao: Date | undefined) {
        this._dataAtualizacao = dataAtualizacao;
    }


    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {
        const tamanhoNome = nome.trim().length
        if (nome === null || nome === undefined) {
            throw new NomeCategoriaNuloOuIndefinido();
        }

        if (tamanhoNome < Categoria.TAMANHO_MINIMO_NOME) {
            throw new NomeCategoriaTamanhoMinimoInvalido();
        }

        if (tamanhoNome > Categoria.TAMANHO_MAXIMO_NOME) {
            throw new NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = nome;
    }

    private constructor(categoria:ICategoria){
        super(categoria.id)
        this.nome = categoria.nome;
        this.dataCriacao = categoria.dataCriacao
        this.dataAtualizacao = categoria.dataAtualizacao
    }


    public static criar(props: CriarCategoriaProps): Categoria {
        return new Categoria( props );
    }

    public static recuperar(props: RecuperarCategoriaProps): Categoria {
        return new Categoria(props);
    }

    public toDTO(): ICategoria {
        return CategoriaMap.toDTO(this);
    }

}

export { Categoria }