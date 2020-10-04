# Recuperação de senha

**RF** <!-- Requisitos Funcionais -->

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF** <!-- Requisitos Não Funcionais -->

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN** <!-- Regras de Negócios -->

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

  **RF** <!-- Requisitos Funcionais -->

  - O usuário deve poder atualizar seu avatar, nome, e-mail e senha;

  **RNF** <!-- Requisitos Não Funcionais -->

  **RN** <!-- Regras de Negócios -->

  - O usuario não pode alterar seu e-mail para um e-mail ja utilizado;
  - Para atualizar sua senha, o usuario deve informar a senha antiga;
  - Para atualizar sua senha, o usuario precisa confirma sua nova senha;

# Painel do prestador

  **RF** <!-- Requisitos Funcionais -->

  - O usuário deve poder listar seus agendamentos de um dia especifico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder vizualizar as notificações não lidas;

  **RNF** <!-- Requisitos Não Funcionais -->

  - Os agendamentos do prestador no dia devem ser amarzenados em cache;
  - As notificações do prestador devem ser armazenadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

  **RN** <!-- Regras de Negócios -->

  - A notificação deve ter um status de lida ou não lida para que o presador possa controlar;


# Agendamento de serviços

  **RF** <!-- Requisitos Funcionais -->

  - O usuário deve poder listar todos os prestadores de serviço cadastrados;
  - O usuário deve poder listar os dias de um mês com pelo menos horario disponível de um prestador;
  - O usuário deve poder listar os horarios dispineis em um dia especifico de um prestador;
  - O usuário deve poder realizar um novo agendamento com um prestador;

  **RNF** <!-- Requisitos Não Funcionais -->

  - A listagem de prestadores deve ser armazenada em cache;

  **RN** <!-- Regras de Negócios -->

  - Cada agendamento deve durar 1h exatamente;
  - Os agentamentos deve estar disponiveis entre 8h as 18h (Primeiro horario as 8h, ultimo as 17h)
  - O usuario não pode agendar em um horario já ocupado;
  - O usuario não pode agendar em horario que já passou;
  - O usuario não pode agendar serviços para consigo mesmo;
