// configurando o axios
// para enviar junto com a requisição o meu token --> header

import axios from "axios";

const apiURLs = {
  development: "http://localhost:8080",
  production: "LINK DO SERVER DEPLOYADO VAI AQUI",
};

//instancia que sabe qual é a BASEURL QUE DEVE SER USADA NAS REQUISIÇÕES DO AXIOS
const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });


// intercepta todos as requisições, todos os requests, não importa se é get, se é post etc
api.interceptors.request.use((config) => {

  
  //capturar o loggedInUser do localStorage  (lembrando que ele vem em formato de JSON)
  const loggedInUserJSON = localStorage.getItem("loggedInUser");

  //transformando o json em uma OBJETO
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""')

  if (parseLoggedInUser.token) {
    //SE houver um token -> coloca ele no cabeçalho da requisição como um Bearer Token
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` }
  }

  return config
});

export default api