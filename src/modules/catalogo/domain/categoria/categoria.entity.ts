import { ICategoria, CriarCategoriaProps, RecuperarCategoriaProps } from "./categoria.types";
import { NomeCategoriaNuloOuIndefinido, NomeCategoriaTamanhoMinimoInvalido, NomeCategoriaTamanhoMaximoInvalido } from "./categoria.exception";
import { Entity } from "@shared/domain/entity";
import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";

class Categoria extends Entity<ICategoria> implements ICategoria {

    private _nome: string = ''
    private _dataCriacao?: Date | undefined;
    private _dataAtualizacao?: Date | undefined;

    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }
    private set dataCriacao(value: Date | undefined) {
        this._dataCriacao = value;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }
    private set dataAtualizacao(value: Date | undefined) {
        this._dataAtualizacao = value;
    }


    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new NomeCategoriaNuloOuIndefinido();
        }

        if (value.trim().length < 3) {
            throw new NomeCategoriaTamanhoMinimoInvalido();
        }

        if (value.trim().length > 50) {
            throw new NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = value;
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