const API_URL = 'http://localhost:3000/alunos';
const lista = document.getElementById('listaAlunos');
const form = document.getElementById('alunoForm');

// Carrega e mostra os alunos da API
async function carregarAlunos() {
  const res = await fetch(API_URL);
  const alunos = await res.json();
  lista.innerHTML = '';
  alunos.forEach(aluno => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${aluno.nome} ${aluno.apelido} (${aluno.curso} - ${aluno.anoCurricular}º ano)
      <button onclick="editarAluno('${aluno._id}')">Editar</button>
      <button onclick="apagarAluno('${aluno._id}')">Apagar</button>
    `;
    lista.appendChild(li);
  });
}

// Envia formulário (adiciona ou atualiza aluno)
form.addEventListener('submit', async e => {
  e.preventDefault();
  const id = document.getElementById('alunoId').value;

  const aluno = {
    nome: document.getElementById('nome').value,
    apelido: document.getElementById('apelido').value,
    curso: document.getElementById('curso').value,
    anoCurricular: Number(document.getElementById('anoCurricular').value)
  };

  if (id) {
    // Atualiza aluno existente
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  } else {
    // Adiciona novo aluno
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  }

  form.reset();
  document.getElementById('alunoId').value = '';
  carregarAlunos();
});

// Preenche o formulário para editar
async function editarAluno(id) {
  const res = await fetch(`${API_URL}/${id}`);
  const aluno = await res.json();
  document.getElementById('alunoId').value = aluno._id;
  document.getElementById('nome').value = aluno.nome;
  document.getElementById('apelido').value = aluno.apelido;
  document.getElementById('curso').value = aluno.curso;
  document.getElementById('anoCurricular').value = aluno.anoCurricular;
}

// Apaga aluno
async function apagarAluno(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  carregarAlunos();
}

// Inicializa a lista ao carregar a página
carregarAlunos();
