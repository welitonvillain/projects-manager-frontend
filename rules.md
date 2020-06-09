### Geral
  -> Gravação de atividades deve ocorrer ao selecionar o último horário. Definir um tempo para que isso ocorra após o usuário selecionar.
  -> Atividades precisam de um indice gravado no banco de dados para que após gravado, se o usuário quiser remover a atividade, seja possível remover do banco.
  ->

### Weeks
  -> Se a data for maior que a data atual não deve ser permitido navegar para frente.

  - [] Usar estado local para definir os dias
  - [] Implementar lógica para definir o mês no caso de data inicial e final cairem em meses diferentes
  - [] Implementar lógica para definir os dias da semana com base na data atual.

### Days
  - [] Gerar de forma automática os dias da semana. É interessante poder usar esse dia para escrever a atividade no banco.

### Horários da Tabela
  -> Um array fixo com os valores.
  -> Não remover horarios passados ou implementar lógica que funcione independente.
  -> O dia de cada atividade será definido ao gravar no banco de dados. Para isso é necessário saber o dia em que essa atividade está sendo escrita. Pode-se usar o dia do title ou definir um campo novo no objeto de atividades para escrever a data.

  - [] Adicionar opção de criar horarios no Select Box.
  - [] Adicionar regra para verificar horários passados e avisar erros.
  - [] Adicionar funcionalidade ao ultimo Select para criar nova tarefa e gravar no banco



