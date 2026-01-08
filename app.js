const express = require('express')
const app = express()
const PORT = 3000
const usersData = require('./data.js')

function filtrarUsers(specialty) {
  return usersData.filter(user => user.specialty === specialty)
}

    // <a href="/ventas">ventas </a>
    // <a href="/marketing"> marketing </a>
    // <a href="/desarrolladores"> desarrolladores </a>
    // <a href="/QAs"> QAs</a>

function pageEspecialidad(nombreEspecialidad, usuarios) {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nombreEspecialidad}</title>
    </head>
    <body>
      <nav>
        <a href="/">Inicio</a>
      </nav>
      <h1>Especialidad: ${nombreEspecialidad}</h1>
      <p>Número de personas: ${usuarios.length}</p>
      <ul>
        ${usuarios.map(u => `<li>${u.name} - ${u.age} años</li>`).join('')}
      </ul>
    </body>
    </html>
    `
}

app.get('/', (req, res) => {
  const especialidades = [...new Set(usersData.map(u => u.specialty))]
  const links = especialidades.map(e => `<li><a href="/${e}">${e}</a></li>`).join('')
  res.send(
    `
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ventas</title>
      </head>
      <body>
        <h1>Listado de usuarios</h1>
        <ul>
          ${links}
        </ul>
      </body>
    </html>
    `)

})

app.get('/:especialidad', (req, res) => {
  const specialty = req.params.especialidad
  const usuarios = filtrarUsers(specialty)

  if (usuarios.length === 0) {
    res.status(404).send(
      `
      <h1>Especialidad sin usuarios</h1>
      <a href="/">inicio</a>
      `)
    return
  }

  res.send(pageEspecialidad(specialty, usuarios))
})

app.use((req, res) => {
  res.status(404).send(
    `
    <h1>Página no encontrada</h1>
    <a href="/">inicio</a>
    `)
})

app.listen(3000, () => {
  console.log( `Servidor escuchando desde http://localhost:${PORT}`)
})