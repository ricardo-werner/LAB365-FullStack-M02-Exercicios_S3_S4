exports.validaEmail = (email) => {
    // este regex e para validar email com domínio .com, .br, .net, etc
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email)) {
        return true
    }
    return false;
  }
/**
 * Função para gerar uma lista de dadas dd/mm/aaaa de um mes e ano passados por parâmetro
 * @param {number} mes valor de 1 a 12
 * @param {number} ano valor com 4 digitos
 * @returns 
 */
exports.dateList = ( mes, ano) => {
        const month = [1,2,3,4,5,6,7,8,9,10,11,12]
        const listDays = []
        if (month.includes(mes)){
            let lastDay = new Date(ano, mes, 0);
            lastDay = lastDay.getDate()
            for (let dia = 1; dia < lastDay+1; dia++) {
                day = dia+'/'+mes+'/'+ano
                listDays.push(day);
            }
            return listDays
        } else {
            null
        }
    }


// Funções com manipulação de arquivos
const fs = require("fs")

/**
 * Função de Escrita de dados em uma arquivo JSON
 * @param {string} filename
 * @param {object} data
 */
exports.writeData = (fileName, data) => {
  try {
    fs.writeFileSync('' + fileName, 
    JSON.stringify(data))
    } catch (error) {
        throw error
    }
}

/**
 * Função para ler um arquivo do tipo JSON
 * @param {string} filename
 * @returns {object} uma lista de objetos
 */
exports.readData = (fileName) => {
  try {
    const readResult = JSON.parse(
      fs.readFileSync('' + fileName, 'utf-8')
      )
    return readResult
    } catch (error) {
        return null
    }
}

/**
 * Esta função gera um ID baseado na data e hora.
 */
exports.generarID = () => {
const date = new date()
return date.getTime()
}
  
exports.codigosErros = (codigo) => {
    const mensagens = { 
        erroParametro: "É necessário o uso de um dos parâmetros.",
        erroRequisicao: "Parâmetros inválidos."

    }
    return mensagens[codigo]
}