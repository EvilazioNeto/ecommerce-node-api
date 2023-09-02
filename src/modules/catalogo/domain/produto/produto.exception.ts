import { DomainException } from "@shared/domain/domain.exception";

class ProdutoException extends DomainException {
  constructor(message:string = '⚠️ Exceção de Domínio Genérica da Entidade produto') {
    super(message);
    this.name = 'ProdutoException'   
    this.message = message;
  }
}

class NomeProdutoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da produto não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'NomeProdutoTamanhoMinimoInvalido'
    this.message = message;
  }
}

class NomeProdutoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da produto não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'NomeProdutoTamanhoMaximoInvalido'
    this.message = message;
  }
}

class DescricaoProdutoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ A descrição da produto não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'DescricaoProdutoTamanhoMaximoInvalido'
    this.message = message;
  }
}

class DescricaoProdutoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ A descrição da produto não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'DescricaoProdutoTamanhoMinimoInvalido'
    this.message = message;
  }
}

class ValorMinimoProdutoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O Valor minimo do produto é inválido') {
    super(message);
    this.name = 'ValorMinimoProdutoInvalido'
    this.message = message;
  }
}

class QtdMinimaCategoriaProdutoInvalida extends ProdutoException {
  public constructor(message:string = '⚠️ A quantidade mínima de categorias do produto é inválida') {
    super(message);
    this.name = 'QtdMinimaCategoriaProdutoInvalida'
    this.message = message;
  }
}

class QtdMaximaCategoriaProdutoInvalida extends ProdutoException {
  public constructor(message:string = '⚠️ A quantidade mínima de categorias do produto é inválida') {
    super(message);
    this.name = 'QtdMaximaCategoriaProdutoInvalida'
    this.message = message;
  }
}

export {
  ProdutoException,
  NomeProdutoTamanhoMinimoInvalido,
  NomeProdutoTamanhoMaximoInvalido,
  DescricaoProdutoTamanhoMaximoInvalido,
  DescricaoProdutoTamanhoMinimoInvalido,
  QtdMaximaCategoriaProdutoInvalida,
  QtdMinimaCategoriaProdutoInvalida, 
  ValorMinimoProdutoInvalido,
}
