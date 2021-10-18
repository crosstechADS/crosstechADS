const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "k2s8c9j4",
    database: "db_crosstech"

});

app.use(express.json());
app.use(cors());


app.post("/register", (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM TB_USUARIO WHERE DS_EMAIL = ?", [email],
        (err, result) => {
            if (err) {
                res.send(err);
            }

            if (result.length == 0) {
                bcrypt.hash(password, saltRounds, (erro, hash) => {
                    db.query(
                        "INSERT INTO TB_USUARIO (DS_NOME, DS_EMAIL, DS_SENHA) VALUES (?, ?, ?)",
                        [nome, email, hash],
                        (err, response) => {
                            if (err) {
                                res.send(err);
                            }
                            res.send({ msg: "Cadastrado com sucesso!" });
                        });
                })

            } else {
                res.send({ msg: "Usuário já cadastrado." })
            }
        });
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.query("SELECT * FROM TB_USUARIO WHERE DS_EMAIL = ?", [email],
        (err, result) => {
            if (err) {
                res.send(err);
            }
            if (result.length > 0) {
                bcrypt.compare(password, result[0].DS_SENHA,
                    (erro, result) => {
                        if (result) {
                            res.send({ msg: "Usuário logado com sucesso!" });
                        }
                        else {
                            res.send({ msg: "Senha incorreta." })
                        }

                    });

            }
            else {
                res.send({ msg: "Usuário não encontrado." })
            }


        }
    );
});

app.listen(3001, () => {
    console.log("Rodando na porta 3001.")
});