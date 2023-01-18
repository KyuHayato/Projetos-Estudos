module.exports.iniciaChat = (application, req, res) => {
    let dadosForm = req.body
    if (dadosForm.apelido.length != 0 && dadosForm.apelido.length > 4) {
        res.render('chat', { dadosForm: dadosForm })
        application.get('io').emit('msgParaCliente', { apelido: dadosForm.apelido, mensagem: 'acabou de entrar no chat' })
    } else {
        let isShow = true;
        res.render('index', { "isShow": isShow })
    }
}