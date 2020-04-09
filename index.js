// REQUIRE Packages
//==========================================================
const api = require("./utils/api.js");
const markdown = require("./utils/generateMarkdown.js");
const fs = require("fs");
//const axios = require("axios");
const inquirer = require("inquirer");
const otherData = require("./utils/other.js");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

//console.log(process.env.api_key);


// questions name - USED IN GENERATE MARKDOWN
// ==========================================================
const GITUSER = "github";
const TITLE = "title";
const DESC = "description";
const INSTALL = "installation";
const USAGE = "usage";
const LICENSE = "license";
const CONTRIBUTE = "contributing";
const TESTS = "tests";
const QUESTIONS = "questions"

//for the copyright year in license
const currentYear = new Date().getFullYear();


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
            {
                name: "MIT License",
                value: `MIT License\n\nCopyright (c) ${currentYear} \nPermission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: \n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`},

            {
                name: "GNU GPLv3",
                value: `Copyright (C) ${currentYear} \n\nThis program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. \n\nThis program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details. \n\nYou should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.`},
            {
                name: "ISC License",
                value: `ISC License \n\nCopyright (c) ${currentYear} \n\nPermission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies. \n\nTHE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`},
            { name: "No License", value: "License TBD" }
        ]
    },
    {
        type: "list",
        message: "Would you like people to contribute to your project?",
        name: CONTRIBUTE,
        choices: [
            {
                name: "Yes - and we will follow the Contributor Covenant Guidelines",
                value: "Contact me if you would like to contribute! Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms."
            },
            {
                name: "Yes - they can cotact me",
                value: "Please contact me if you would like to contribute!"
            },
            { name: "No- not at this time.", value: "I am not taking contributors at this time. Thank you!" }
        ]
    },

];

const gihubUser = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: GITUSER
    }
];

async function getUserInput() {
    try {

        //get github username
        const user = await inquirer.prompt(gihubUser);
        console.log(user[GITUSER]);

        //call github api, get login and avatar url
        const githubInfo = await api.api.getUser(user[GITUSER]);
        console.log(githubInfo);
        // userReadMe.name = test.name;
        // userReadMe.email = test.email;
        // userReadMe.avatar = test.avatar_url;

        //get the project information
        const userQuestions = await inquirer.prompt(questions);
        console.log(userQuestions);

        // console.log(otherData.getLicense(userQuestions[LICENSE]));

        //replace commas with newlines in install steps, add numbers
        userQuestions[INSTALL] = markdownInstall(userQuestions[INSTALL]);
        console.log(markdownInstall(userQuestions[INSTALL]));

        //console.log(otherData.getContributing(userQuestions[CONTRIBUTE]));

        const userReadMe = {...githubInfo,...userQuestions};
        console.log(userReadMe);

        const readMeStr = markdown.generateMarkdown(userReadMe);

        await writeFileAsync(`${userReadMe.login}.md`,readMeStr);

        console.log("ReadMe created!");
    }
    catch (err) {
        console.log(err);
    }
}

function markdownInstall(strSteps) {
    let installArr = strSteps.split(",");
    let markdownInstall = "";
    for (let i = 0; i < installArr.length; i++) {
        markdownInstall += `${i+1}. ${installArr[i]}\n`;
    }
    return markdownInstall;
}


// function writeToFile(fileName, data) {
//     fs.writeFile(`${filename}.md`,data,function(err){
//         if(err){
//             return console.log(err)
//         }

//         console.log("ReadMe created!")
//     })
// }

function init() {
    getUserInput();
}



init();
