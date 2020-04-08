// REQUIRE Packages
//==========================================================
const api = require("./utils/api.js");
const markdown = require("./utils/generateMarkdown.js");
const fs = require("fs");
//const axios = require("axios");
const inquirer = require("inquirer");
const otherData = require("./utils/other.js");

// questions name
// ==========================================================
const GITUSER = "github";
const TITLE = "title";
const DESC = "description";
const INSTALL = "installation";
const USAGE = "usage";
const LICENSE = "license";
const CONTRIBUTE = "contributing";
const TESTS = "tests";


const questions = [
    {
        type: "input",
        message: "What is your project's title?",
        name: TITLE
    },
    {
        type: "input",
        message: "Provide a short description of your project:",
        name: DESC
    },
    {
        type: "input",
        message: "What steps are required to install this program? Please use commas to separate each step.",
        name: INSTALL
    },
    {
        type: "input",
        message: "Provide instructions or an example on how to use your program.",
        name: USAGE
    },
    {
        type: "list",
        message: "Which license would you like to use for your project?",
        name: LICENSE,
        choices: [
            "MIT License",
            "GNU GPLv3",
            "ISC License",
            "No License"
        ]
    },
    {
        type: "list",
        message: "Would you like people to contribute to your project?",
        name: CONTRIBUTE,
        choices: [
            "Yes - and we will follow the Contributor Covenant Guidelines",
            "Yes - they can cotact me",
            "No- not at this time."
        ]
    },

];

const gihubUser = [
    {
        type:"input",
        message: "What is your GitHub username?",
        name: GITUSER
    }
];

async function getUserInput(){
    try{
        const user = await inquirer.prompt(gihubUser);
        console.log(user[GITUSER]);

        const test = await api.api.getUser(user[GITUSER]);
        console.log(test);

        const userQuestions = await inquirer.prompt(questions);
        
        console.log(userQuestions);
    }
    catch(err){
        console.log(err);
    }
}


function writeToFile(fileName, data) {
}

function init() {
    getUserInput();
}



init();
