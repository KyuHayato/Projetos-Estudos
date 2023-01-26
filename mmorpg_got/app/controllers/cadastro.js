module.exports.cadastro = (application, req, res) => {
    res.render('cadastro')
}
module.exports.cadastrar = (application, req, res) => {
    let dadosForm = req.body
        res.send('cadastro')
}