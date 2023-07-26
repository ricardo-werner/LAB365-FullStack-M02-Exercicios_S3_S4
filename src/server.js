// Estrutura da API sem funcionalidades

/**
 * Importanto  e instaciando o Express na variável app
 */
const express = require('express')
const server= express()
const routers = require('../src/routers')


//Definindo porta do servidor

const port = 3333

// Informando a aplicação Express que será usado o formato JSON para trasferir e receber dados
server.use(express.json())

// Aqui será implementada o grupo de rotas possíveis de serem utilizadas neste APP
// Estas rotas devem ser importadas com o uso do require()
// Como as rotas foram empacotadas no objeto routes, precisamos apenas disponibiliza-lo pra uso
server.use(routers)



// Ativando o servidor e disponibilizando a porta definida anteriormente na variável port
server.listen(port, ()  => console.log(`Seridor rodando na url http://localhost:${port}`))