const axios = require("axios");

const api = {
  getUser(username) {

    const querlURL = `https://api.github.com/users/${username}`;
    
    axios
      .get(querlURL)
      .then(function(response){

        console.log(response.data);

        const {login,avatar_url} = response.data;

        console.log(login);
        console.log(avatar_url);
    
        return {login,avatar_url};

      })

  }
};

module.exports = api;
