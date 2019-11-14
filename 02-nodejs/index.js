/*
0 - Obter um usuário
1 - Obter numero de telefone de um usuário atraves de seu ID
2 - Obter o endereco de um usuário pelo ID

*/

const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback){

    return new Promise(function resolvePromise(resolve,reject){
        setTimeout(function(){

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
    
            }) 
                
        }, 1000)

    })
    
}

function obterTelefone(idUsuario){
    return new Promise(function resolvePromise(resolve,reject){
    setTimeout(()=>{
        return resolve
            telefone:'1199002'
            ddd:11
        });
    },2000);
}

function obterEndereco(idUsuario, callback){
        setTimeout(()=>{
            return callback(null, {
                rua: 'dos bobos',
                numero: 0
            })

        },2000);
}

const usuarioPromise = obterUsuario()

usuarioPromise
    .then(function (usuario){
    return obterTelefone(usuario.id)
    .then(function resolverTelefone(result){
        return{
            usuario: {
                nome: usuario.nome,
                id: usuario.id
            },
            telefone: result
        }
    })
})
    .then(function(resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco;
    })
    .then(function (resultado){
        console.log(`
        Nome: ${resultado.usuario.nome}
        Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
        Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}`)
    })
    .catch(function(error){
        console.error('DEU RUIM MANO!', error)
    })

/*
obterUsuario(function resolverUsuario(error, usuario){
    if(error){
        console.error('DEU RUIM em USUARIO!!', error)
        return;
    }
})

obterTelefone(function resolverTelefone(error1, telefone){
    if(error1){
        console.error('DEU RUIM em TELEFONE!!', error)
        return;
    }
})

obterEndereco(function resolverEndereco(error2, endereco){
    if(error2){
        console.error('DEU RUIM em ENDERECO!!', error2)
        return;
    }

    console.log(`
    nome: ${usuario.nome},
    endereco: ${endereco.rua},${endereco.numero},
    telefone: (${telefone.ddd})${telefone.telefone}

`)

})


console.log('usuario', usuario);
console.log('telefone', telefone);
*/