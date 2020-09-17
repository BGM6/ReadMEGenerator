const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
async function gitFunc() {
  const userAnswer = await inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub username?",
      name: "username",
    },

    {
      type: "input",
      message: "What is the title of your application?",
      name: "appTitle",
    },
    {
      type: "input",
      message: "What technology were use for the application?",
      name: "technology",
    },
    {
      type: "input",
      message: "Please provide a description of your application:",
      name: "appDescription",
    },
    {
      type: "input",
      message:
        "Please provide step-by-step instruction on the installation process for your application: ",
      name: "appInstallation",
    },
    {
      type: "input",
      message: "Provide description of usage:",
      name: "appUsage",
    },
    {
      type: "input",
      message: "Provide license name: ",
      name: "appLicense",
    },
    {
      type: "input",
      message:
        "Please provide the git hub name of any other contributors separated by ',': ",
      name: "appContributor",
    },
    {
      type: "input",
      message: "Provide examples on how to run tests: ",
      name: "tests",
    },
  ]);
  // Variables that stores user answers
  const Username = userAnswer.username;
  const AppTitle = userAnswer.appTitle;
  const AppDescription = userAnswer.appDescription;
  const AppInstallation = userAnswer.appInstallation;
  const AppUsage = userAnswer.appUsage;
  const AppLicense = userAnswer.appLicense;
  const AppContributor = userAnswer.appContributor;
  const Test = userAnswer.tests;
  const Tech = userAnswer.technology;
  // console.log(userAnswer);
  // git response
  const GitResponse = await axios.get(
    `https://api.github.com/users/${Username}`
  );
  const GitData = GitResponse.data;
  const GitEmail = GitData.email;
  const UserUrl = GitData.html_url;
  const ProfileImg = GitData.avatar_url;
  const RepoURL = GitData.repos_url;
  // console.log(GitEmail);
  // console.log(GitData);
  // Creating the read me file from user and git data
  const Result = `
    # ${AppTitle} 
    ${AppDescription}
    \n* [Installation](#Installation)
    \n* [License](#License)
    \n* [Contributors](#Contributors)
    \n* [Author](#Author)
    \n* [Usage](#Usage)
    \n* [Tests](#Tests)
    \n
    # Installation
    ${AppInstallation}
    # Technology
    ${Tech}
    # License 
    This project is licensed under the ${AppLicense}.
    # Contributors
    ${AppContributor}
    # Usage
    ${AppUsage}
    # Tests
    ${Test}
    # Author 
    \n![ProfileImage](${ProfileImg})
    \n**${Username}**
    \nEmail: ${GitEmail}
    \nGitHub: ${UserUrl}
    \nRepoUrl: ${RepoURL}
                `;

  // This writes the user answers and API calls to a md file
  const WriteResult = fs.writeFileSync(
    path.join(__dirname, "../readMeGenerator", "readMe.md"),
    Result
  );
  console.log("readMe file has been created...");
}
gitFunc();
