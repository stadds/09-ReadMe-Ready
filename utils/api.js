const axios = require("axios");

const api = {
  async getUser(username) {

    try {

      const queryURL = `https://api.github.com/users/${username}`;

      const { data } = await axios.get(queryURL);
      const { login, avatar_url } = data;

      console.log(login);
      console.log(avatar_url);

      return { login, avatar_url };
    }
    catch (err) {
      console.log(err);
    }
  }
};

module.exports = { api };
