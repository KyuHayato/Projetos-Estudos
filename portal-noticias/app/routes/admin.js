const { body, validationResult } = require('express-validator');
module.exports = (application) => {
    application.get('/form_add_noticia', (req, res) => {
        res.render("admin/form_add_noticia", { validacao: {}, noticia: {} })
    })

    application.post('/noticias/salvar',
        [
            body('titulo', 'Campo não pode ser vazio').notEmpty(),
            body('noticia', 'Numero minimo de caracteres 5 e maximo 15').isLength({ min: 5}),
            body('data_noticia', 'Data vazia ou formato errado').notEmpty().isDate({ format: 'YYYY-MM-DD' })
        ], (req, res) => {
            const noticia = req.body
            const errors = validationResult(req);
            if (errors.errors.length >0) {
                res.render("admin/form_add_noticia", { validacao: errors, noticia: noticia });
                return;
            }
            const connection = application.config.dbConnection();
            const noticiasDAO = new application.app.models.NoticiasDAO(connection);

            noticiasDAO.salvarNoticia(noticia, (error, result) => {
                res.redirect('/noticias')
            });

        })
}
