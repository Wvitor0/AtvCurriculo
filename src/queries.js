const Pool = require('pg').Pool
//configuracoes do banco
const pool = new Pool({
  user: 'bbtglwgv',
  host: 'flora.db.elephantsql.com',
  database: 'bbtglwgv',
  password: '7fcz_R5xkeYNzROzrwgQx8n0USo-7rar',
  port: 5432,
})

const getCurriculo = (request, response) => {
    pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const getCurriculoById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM curriculo WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  
  const createCurriculo = (request, response) => {
    const { id, nome, email, telefone, formacao, experiencia } = request.body
  
    pool.query('INSERT INTO curriculo (id, nome, email, telefone, formacao, experiencia) VALUES ($1, $2, $3, $4, $5, $6)', [id, nome, email, telefone, formacao, experiencia], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Curriculo added with ID: ${results.insertId}`)
    })
  }
  
  const updateCurriculo = (request, response) => {
    const id = parseInt(request.params.id)
    const { nome, email, telefone, formacao, experiencia } = request.body
  
    pool.query(
      'UPDATE curriculo SET name = $1, email = $2 WHERE id = $3',
      [nome, email, telefone, formacao, experiencia],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Curriculo modified with ID: ${id}`)
      }
    )
  }
  
  const deleteCurriculo = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Curriculo deleted with ID: ${id}`)
    })
  }
  
  module.exports = {
    getCurriculo,
    getCurriculoById,
    createCurriculo,
    updateCurriculo,
    deleteCurriculo,
  }