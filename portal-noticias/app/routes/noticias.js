module.exports = (application) => {

  application.get('/noticias', (req, res) => {
    const connection = application.config.dbConnection();
    const noticiasDAO = new application.app.models.NoticiasDAO(connection);

    noticiasDAO.getNoticias((error, result) => {
      res.render("noticias/noticias", { noticias: result });
    });
  })

  application.get('/noticia', function (req, res) {
    const id_noticia = req.query
		const connection = application.config.dbConnection();
		const noticiasDAO = new application.app.models.NoticiasDAO(connection);

		noticiasDAO.getNoticia(id_noticia,(error, result) => {
			res.render("noticias/noticia", { noticia: result });
		});
	});
}

