const Pool = require('pg').Pool
const pool = new Pool({
  user: 'squad1',
  host: '3.143.104.1',
  database: 'bootcamp',
  password: 'Squ@d456',
  port: 5432,
})

const query = `
CREATE TABLE entity_facts (
    id int,
    entity varchar,
    details varchar    
);
`;

pool.query(query, (err, res) => {
  if (err) {
      console.error(err);
      return;
  }
  console.log('Table is successfully created');  
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM entity_facts ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM entiry_facts WHERE entity = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { id, entity, details } = request.body

  pool.query('INSERT INTO entity_facts (id, entity, details) VALUES ($1, $2, $3)', [id, entity, details], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

//   const id = parseInt(request.params.id)
// const updateUser = (request, response) => {
//   const { name, email } = request.body

//   pool.query(
//     'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//     [name, email, id],
//     (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User modified with ID: ${id}`)
//     }
//   )
// }

// const deleteUser = (request, response) => {
//   const id = parseInt(request.params.id)

//   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).send(`User deleted with ID: ${id}`)
//   })
// }

module.exports = {
  getUsers,
  getUserById,
  createUser
  // updateUser,
  // deleteUser,
}
