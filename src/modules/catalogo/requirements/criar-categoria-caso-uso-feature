Feature: Criar Categoria
    
    Como um <Administrador>
    Eu quero criar uma categoria>
    De modo que os produtos possam ser associados a uma ou mais categorias facilitando a organização e busca dos produtos>  

Scenario: categoria válida (Padrão)

    Given:  [categiria válida]
    when:  [Solicitara criação de uma categoria]
    Then:  [a categoria deve ser criada corretamente]

Scenario: Categoria inválida - Nome da categoria não atende o tamanho mínimo [Execeção]

    Given: [Uma categoria com nome que não atende ao tamanho mínimo]
    When: [Solicitar a criação de uma categoria]
    Then: [Um erro informando que o nome da categoria não possui o tamanho mínimo válido deve ser apresentado]

Scenario: Categoria inválida - Nome da categoria não atende o tamanho máxima [Execeção]

    Given: [Uma categoria com nome que não atende ao tamanho máximo]
    when: [Solicitar a criação de uma categoria]
    Then: [Um erro informando que o nome da categoria não possui o tamanho máximo válido deve ser apresentado]

Scenario: Categoria inválida - Nome da categoria possui somente espaços em branco [Execeção]

    Given: [Uma categoria com nome que não atende ao tamanho máximo]
    when: [Solicitar a criação de uma categoria]
    Then: [Um erro informando que o nome da categoria não possui o tamanho máximo válido deve ser apresentado]

Scenario: Categoria inválida - Nome da Categoria possui somente espaços em branco (Execeção)    
                   
    Given: [Uma categoria com nome que possui somente espaços em branco]
    when: [Solicitar a Criação de uma Categoria]
    Then: [Um erro informando que o nome da categoria é inválido deve ser apresentado]