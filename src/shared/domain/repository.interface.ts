interface IQuery<T> {
    recuperarPorUuid(uuid: string): Promise<T | null>;
    recuperarTodos(): Promise<Array<T>>;
    existe(uuid: string): Promise<Boolean>;
}

interface ICommand<T> {
    inserir(entity: T): Promise<T>;
    atualizar(uuid: string, entity: Partial<T>): Promise<Boolean>;
    deletar(uuid: string): Promise<Boolean>;
}

interface IRepository<T> extends IQuery<T>, ICommand<T> {};

export {IRepository}