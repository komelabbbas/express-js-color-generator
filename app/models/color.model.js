const sql = require('./db.js')

// constructor
const Color = function (data) {
  this.label = data.label
  this.value = data.value
}

Color.table = () => {
  const query = `
  CREATE TABLE IF NOT EXISTS colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );
`

  sql.query(query, (err, result) => {
    if (err) {
      console.error('Error creating colors table: ', err)
      return
    }
    console.log('colors table created or already exists.')
  })
}

Color.create = (newColor, result) => {
  console.log('Color.create')
  sql.query('INSERT INTO colors SET ?', newColor, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    console.log('created color: ', { id: res.insertId, ...newColor })
    result(null, { id: res.insertId, ...newColor })
  })
}

Color.findById = (id, result) => {
  sql.query(`SELECT * FROM colors WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log('found color: ', res[0])
      result(null, res[0])
      return
    }

    // not found Color with the id
    result({ kind: 'not_found' }, null)
  })
}

Color.getAll = (label, result) => {
  let query = 'SELECT * FROM colors'

  if (label) {
    query += ` WHERE label LIKE '%${label}%'`
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    console.log('colors: ', res)
    result(null, res)
  })
}

Color.updateById = (id, color, result) => {
  sql.query(
    'UPDATE colors SET label = ?, value = ? WHERE id = ?',
    [color.label, color.value, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(null, err)
        return
      }

      if (res.affectedRows == 0) {
        // not found Color with the id
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('updated color: ', { id: id, ...color })
      result(null, { id: id, ...color })
    }
  )
}

Color.remove = (id, result) => {
  sql.query('DELETE FROM colors WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      // not found Color with the id
      result({ kind: 'not_found' }, null)
      return
    }

    console.log('deleted color with id: ', id)
    result(null, res)
  })
}

module.exports = Color
