const { dateList, readData, writeData } = require("../utils")

// Nas funções serão implementadas as regras de negócio e serão usadas pelas rotas em routers.js

// A função a baixo troca posição da lista fixa
let list = ["Pedro", "José", "Aderbal", "Danilo", "Luisa","Vitoria"]


module.exports ={
  async processAct(request,response) {
    try {
      const {name1, name2} = request.body
      
      if (!(name1 || name2)){
        response.status(400).send('Um ou mais nomes não foram informados.')
      }
      let posName1 = list.indexOf(name1)
      let posName2 = list.indexOf(name2)
      if ((posName1 || posName2)) {
        response.status(400).send('Um ou mais nomes não constam na lista.')
      }
      let newList = [...list]
      newList[posName1] = list[posName2]
      newList[posName2] = list[posName1]
      response.status(200).send({ oldList: list, newList: newList})
      response.status(200).send('teste de função')
    } catch (error) {
      response.status(500).send(error)
    }
  },
  async diasMes(request, response) {
    try {
      const { mes, ano } = request.body
      if (!(mes || ano)) {
        response.status(400).send({"mensagem": 'Mês ou ano não informado.'})
      }
      if (dateList(mes, ano)) {
        response.status(200).send({"datelist": dateList(mes, ano)})
      } else {
        response.status(400).send({"mensagem": 'Mês tem que ser um valor entre 1 e 12'})
      }
    } catch (error){
      response.status(500).send(error)
    }
  },
  
  async insertItem(request, response) {
    const { item } = request.body
    const fileName = "src/data/itens.json"

    if (!item){
      return response.status(400).send({ mensagem: 'Não foi enviado item para inclusão'})
    }

    let itens = readData(fileName)
    if (!itens) {
      writeData(fileName, [{ item }])
      return response.status(200).send({
        mensagem: "Adicionou um item.", 
        dado: item
      })
    }
    itens = [...itens, {item}]
    writeData(fileName, itens)
    return response.status(200).send({
      mensagem: "Adicionou mais um item.",
      dado: item})

  },
  async filtrar(request,response) {
    let users = readData('src/data/user.json')
    const { ageMin, ageMax, state, job} = request.query
    console.log(ageMin, ageMax, state, job)
    if((!ageMin) && (!ageMax) && (!state) && (!job)){
      return response.status(400).send({ mensagem: 'É necessário o uso de um dos parâmetros.',
                                         erro: 'Requisição inválida. Sem parâmetros.'})
    }
    let usersFiltrados = users.filter(user => {
      if (ageMin && user.age < parseInt(ageMin)) {
        return false;
      }
      if (ageMax && user.age > parseInt(ageMax)) {
        return false;
      }
      if (state && !user.state.toLowerCase().includes(state.toLowerCase())) {
        return false;
      }
      if (job && !pessoa.job.toLowerCase().includes(job.toLowerCase())) {
        return false;
      }
      return true;
    });
    return response.status(200).send({mensagem: usersFiltrados})
  },
  async toUpDate(request, response) {
    const {id} = request.params
    const {name, age, job, state} = request.body
    let users = readData('src/data/user.json')
    
    if((!name) && (!age) && (!state) && (!job)){
      return response.status(400).send({ mensagem: 'É necessário o uso de um dos parâmetros.',
      erro: 400})
    }
    if (!users){
      return response.status(400).send({mensagem: "Não há arquivo para ser pesquisado ou não há usuário."})
    }
    // A fariável userUpDated irá conter apenas usuário com o ID informado
    let userExist = false
    let userUpDated = users.map((user) => {
      if (id == user.id) {
        userExist = true
        return {
          id: user.id,
          name: name ? name : user.name,
          age: age ? age : user.age,
          state:  state ? state : user.state
        }
      }
      return user
      // Irá retornar apenas um usuário que tiver o ID correspondente já modificado 
    })
    if (userExist == false){
      return response.status(401).send({ mensagem: 'Usuário inexistente.'})
    }
    writeData('src/data/user.json', userUpDated)
    return response.status(200).send({ mensagem: 'Usuário atualizado.'})

  },
  async toDelete(request, response) {
    const {id} = request.params
    let users = readData('src/data/user.json')
    
    if (!users){
      return response.status(400).send({mensagem: "Não há arquivo para ser pesquisado ou não há usuário."})
    }
    // A fariável userUpDated irá conter apenas usuário com o ID informado - {id}
    const existUserId = users.some( user => id == user.id)

    if (!existUserId){
      return response.status(404).send({ mensagem: `Usuário com ID ${id} inexistente.`})
    }

    // Filtrando  todo o array e deixando apenas o usuário com ID compatível de fora.
    const usersNew = users.filter(user => id != user.id)
    console.log(usersNew)
    writeData('src/data/user.json', usersNew)
    return response.status(200).send({ mensagem: `Usuário com ID ${id} removido.`})
  },
  async getUser(request, response) {
    const {id} = request.params
    let users = readData('src/data/user.json')
    
    if (!users){
      return response.status(400).send({mensagem: "Não há arquivo para ser pesquisado ou não há usuário."})
    }
    // A fariável userUpDated irá conter apenas usuário com o ID informado - {id}
    const existUserId = users.some( user => id == user.id)

    if (!existUserId){
      return response.status(404).send({ mensagem: `Usuário com ID ${id} inexistente.`})
    }

    // Filtrando  todo o array e deixando apenas o usuário com ID compatível de fora.
    const usersNew = users.filter(user => id == user.id)
    return response.status(200).send(
      { name: usersNew[0].name})
  },
  async convertCase(request, response) {
    let reqString = request.body.str
    console.log(reqString)
    if (reqString && typeof reqString === 'string'){
      reqString = reqString.split('')
      let resString =''

      resString = reqString.map(char => {
        if (char ===char.toUpperCase()) {
          return char.toLowerCase()
        } else if (char === char.toLowerCase()){
          return char.toUpperCase()
        } else {
          return char
        }
      })
      resString = resString.join('')
      return response.status(200).send({ str: resString})
    } else {
      response.status(400).send({mensagem: "A entrada precisa ser uma string."})
    }
  }
}
  
  
