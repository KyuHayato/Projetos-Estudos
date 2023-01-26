const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database.js")
const Pergunta = require("./models/Pergunta")
const Resposta = require("./models/Resposta")
//conexao
connection.authenticate().then(() => {
    console.log('Conexão do banco')
}).catch((error) => {
    console.log('Erro', error)
})


app.set('view engine', 'ejs');
app.use(express.static('public'));
// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Rotas
app.get("/", (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'desc']
        ]
    }).then(perguntas => {
        res.render("index", { perguntas: perguntas });
    })
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
})

app.post("/salvarpergunta", (req, res) => {
    let dadosForm = req.body
    Pergunta.create({
        titulo: dadosForm.titulo,
        descricao: dadosForm.descricao
    }).then(() => {
        res.redirect('/')
    })
});
app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) {
            Resposta.findAll({ where: { perguntaId: pergunta.id }, order: [['id', 'DESC']] }).then(respostas => {
                res.render('pergunta', { pergunta: pergunta, respostas: respostas })
            })
        } else {
            res.redirect('/')
        }
    })
})
app.post('/responder', (req, res) => {
    const body = req.body
    console.log('bod', body)
    Resposta.create({
        corpo: body.corpo,
        perguntaId: body.perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + body.perguntaId)
    })
})

app.listen(3000, () => { console.log("App rodando!"); });