module.exports = (application) => {

    application.get('/', (req, res) => {

        const connection = application.config.dbConnection()
        const noticiaModel = new application.app.models.NoticiasDAO(connection)
        noticiaModel.getFiveUltimasNoticias((error, result) => {
            console.log(result)
            res.render("home/index", { noticias: result })

        })
    })
}
