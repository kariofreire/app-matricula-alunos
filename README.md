# Sistema para realizar matrícula de alunos em cursos.

#### Foram utilizados neste projeto
- Vuetify
- Vue Router

#### Instalação do projeto

```sh
    # Faça o clone do projeto
    $ git clone https://github.com/kariofreire/app-matricula-alunos.git

    # Entre no diretório do projeto
    $ cd app-matricula-alunos

    # Realize a instalação de dependências
    $ npm install

    # Copie e cole o arquivo docker-compose
    $ cp docker-compose.example.yml docker-compose.yml

    # Starta o docker
    $ docker-compose up -d --build

    # Para entrar no container
    $ docker exec -it app-matricula-alunos /bin/sh
```

#### Por fim o projeto estará sendo executado em:

- http://localhost:8080/

#### Credenciais de acesso:

| Email | Senha |
|---|---|
| adm@email.com | 123456 |