// REQUIRE Packages
//==========================================================
const api = require("./utils/api.js");
const markdown = require("./utils/generateMarkdown.js");
const fs = require("fs");
//const axios = require("axios");
const inquirer = require("inquirer");
const badgeData = require("./utils/badge.js");
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
const GITREPO = "gitrepo";
const QUESTIONS = "questions";
const BADGES = "badges";

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
        type: "editor",
        message: "What steps are required to install this program? (SAVE and exit the file when done)",
        name: INSTALL
    },
    {
        type: "editor",
        message: "Provide instructions or an example on how to use your program. (SAVE and exit the file when done)",
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
                value: "[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)\n\nContact me if you would like to contribute! Please note that this project is released with a Contributor Code of Conduct. By participating in this project you agree to abide by its terms."
            },
            {
                name: "Yes - they can cotact me",
                value: "Please contact me if you would like to contribute!"
            },
            { name: "No- not at this time.", value: "I am not taking contributors at this time. Thank you!" }
        ]
    },
    {
        type: "editor",
        message: "List some Test Cases (SAVE and exit the file when done)",
        name: TESTS
    },
    {
        type: "editor",
        message: "List and answer some frequently asked questions about your project (SAVE and exit the file when done)",
        name: QUESTIONS
    },
    {
        type: "checkbox",
        message: "Choose some badges you would like to include in your ReadMe:",
        name: BADGES,
        choices: [
            {
                value: "git-follow",
                name: "GitHub Follower Count"
            },
            {
                value: "git-watchers",
                name: "GitHub Watcher count"
            },
            {
                value:"git-starred",
                name:"GitHub Starred"
            },
            {
                value: "git-reposize",
                name: "GitHub Repo size"
            },
            {
                value: "git-openissues",
                name: "GitHub number of open issues for my repo"
            }
        ]
    }

];

const gihubUser = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: GITUSER
    },
    {
        type: "input",
        message: "What is your GitHub Repo for this ReadMe?",
        name: GITREPO
    }
];

async function getUserInput() {
    try {

        //get github username and their repo name
        const user = await inquirer.prompt(gihubUser);
       // console.log(user[GITUSER]);
        //console.log(user[GITREPO]);

        //call github api, get login and avatar url, and email
        const githubInfo = await api.api.getUser(user[GITUSER]);
       // console.log(githubInfo);


        //get the project information
        const userQuestions = await inquirer.prompt(questions);
        //console.log(userQuestions);

        //get the badge markdown based on the user input
        const newBadgeStr = badgeData.getBadges(user[GITUSER],user[GITREPO],userQuestions[BADGES]);
        //console.log(newBadgeStr);

        //overwrite the badge property of the prompts field with the new badge str containing the new markdown
        userQuestions[BADGES] = newBadgeStr;

        //create a new object that combines the 2 prompt objects.
        const userReadMe = {...githubInfo,...userQuestions};
       // console.log(userReadMe);

        //generate the ReadMe markdown based on the new user object
        const readMeStr = markdown.generateMarkdown(userReadMe);

        // save the new markdown str to a file!
        await writeFileAsync(`${userQuestions[TITLE]}.md`,readMeStr);

        console.log("ReadMe created!");
    }
    catch (err) {
        console.log(err);
    }
}

function init() {
    getUserInput();
}



init();
