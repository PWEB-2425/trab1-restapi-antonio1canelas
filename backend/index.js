require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Modelo Aluno
const alunoSchema = new mongoose.Schema({
  nome: String,
  apelido: String,
  curso: String,
  anoCurricular: Number
});
const Aluno = mongoose.model('Aluno', alunoSchema);

// GET todos os alunos
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await Aluno.find();
    res.json(alunos);
  } catch (err) {
    console.error('Erro ao buscar alunos:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

// GET aluno por ID
app.get('/alunos/:id', async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    res.json(aluno);
  } catch (err) {
    console.error('Erro ao buscar aluno:', err);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

// POST novo aluno
app.post('/alunos', async (req, res) => {
  try {
    const novo = new Aluno(req.body);
    const salvo = await novo.save();
    res.status(201).json(salvo);
  } catch (err) {
    console.error('Erro ao criar aluno:', err);
    res.status(400).json({ erro: 'Erro ao criar aluno' });
  }
});

// PUT (atualizar aluno)
app.put('/alunos/:id', async (req, res) => {
  try {
    const atualizado = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!atualizado) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    res.json(atualizado);
  } catch (err) {
    console.error('Erro ao atualizar aluno:', err);
    res.status(500).json({ erro: 'Erro ao atualizar aluno' });
  }
});

// DELETE aluno
app.delete('/alunos/:id', async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    console.error('Erro ao apagar aluno:', err);
    res.status(500).json({ erro: 'Erro ao apagar aluno' });
  }
});

// Conexão ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ API real a correr na porta ${PORT}`);
});

  })
  .catch(err => {
    console.error('Erro ao ligar ao MongoDB:', err);
  });
9