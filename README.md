Trabalho Prático 1 - Programação Web
Autor: António Pedro Magalhães Canelas
Número: 31834
Curso: Engenharia de Redes e Sistemas de Computadores
Disciplina: Programação Web
Publicação:
- Frontend (Vercel): https://trab1-restapi-antonio1canelas-ng7t.vercel.app

Como instalar e correr:
Backend:
 cd backend
 npm install
 npm start

Frontend:
 Abrir index.html dentro da pasta /frontend no navegador,
 ou fazer deploy em plataformas como o Vercel.
Descrição da base de dados:
A base de dados MongoDB contém duas coleções principais:
- Alunos: nome, apelido, curso, anoCurricular
- Cursos: nomeDoCurso
Descrição da API (rotas principais):
- GET /alunos -> listar alunos
- POST /alunos -> adicionar aluno
- PUT /alunos/:id -> editar aluno
- DELETE /alunos/:id -> apagar aluno
- GET /cursos -> listar cursos
Descrição do frontend:
Aplicação web desenvolvida em HTML, CSS e JavaScript com uso de fetch API.
Permite visualizar, adicionar, editar e remover alunos.
Outros conteúdos relevantes:
- API simulada com json-server (pasta /mock-server)
- Testes com Postman exportados (/tests)
- Estrutura MVC usada no backend (bónus)
    