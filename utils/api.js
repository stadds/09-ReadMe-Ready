const axios = require("axios");
require('dotenv').config();
const api_key = process.env.api_key;

const api = {
  async getUser(username) {

    try {

      const { data } = await axios({
        headers:{'Authorization': `token ${api_key}`},
        url: `https://api.github.com/users/${username}`,
        method: 'GET'
      })

      console.log(data);
      const { login, avatar_url,email } = data;

      console.log(login);
      console.log(avatar_url);
      console.log(email);

      return { login, avatar_url,email } ;
    }
    catch (err) {
      console.log(err);
    }
  }
};

module.exports = { api };
