class NoticiasDAO {
	constructor(connection) {
		this._connection = connection;
	}
	getNoticias(callback) {
		this._connection.query('select * from noticias order by data_criacao desc', callback);
	}
	getNoticia(id_noticia, callback) {
		this._connection.query(`select * from noticias where id_noticia = ${id_noticia.id_noticia}`, callback);
	}
	getFiveUltimasNoticias(callback) {
		this._connection.query('select * from noticias order by data_criacao desc limit 5', callback);
	}
	salvarNoticia(noticia, callback) {
		this._connection.query('insert into noticias set ?', noticia, callback);
	}
}

module.exports = function () {
	return NoticiasDAO
}