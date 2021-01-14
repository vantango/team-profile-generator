const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const allMembers = []

// Manager questions
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `What is your name?`,
        validate: input => {
            if (input !== "") {
                return true;
            } else {
                return "Please enter a minimum of one character"
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: `What is your ID?`,
        validate: input => {
            if (input > 0) {
                return true;
            } else {
                return "Please enter a positive number greater than 0"
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
        validate: emailAddress => {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailAddress.match(regexEmail)) {
                return true;
            } else {
                return "Please enter a valid email address";
            };
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `What is your office number?`,
    }
]

// Engineer questions
const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `What is your name?`,
        validate: input => {
            if (input !== "") {
                return true;
            } else {
                return "Please enter a minimum of one character"
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: `What is your ID?`,
        validate: input => {
            if (input > 0) {
                return true;
            } else {
                return "Please enter a positive number greater than 0"
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
        validate: emailAddress => {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailAddress.match(regexEmail)) {
                return true;
            } else {
                return "Please enter a valid email address";
            };
        }
    },
    {
        type: 'input',
        name: 'github',
        message: `What is your GitHub?`,
    }
]

// Inter questions
const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `What is your name?`,
        validate: input => {
            if (input !== "") {
                return true;
            } else {
                return "Please enter a minimum of one character"
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: `What is your ID?`,
        validate: input => {
            if (input > 0) {
                return true;
            } else {
                return "Please enter a positive number greater than 0"
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
        validate: emailAddress => {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (emailAddress.match(regexEmail)) {
                return true;
            } else {
                return "Please enter a valid email address";
            };
        }
    },
    {
        type: 'input',
        name: 'school',
        message: `Where do you go to school?`,
    }
]


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'employeeType',
            message: `Which employee would you like to add?`,
            choices: ["Manager", "Engineer", "Intern", "Generate team"]
        }


    ]).then(response => {
        console.log(response);
        switch (response.employeeType) {
            case 'Manager':
                managerPrompt();
                break;
            case 'Engineer':
                engineerPrompt();
                break;
            case 'Intern':
                internPrompt();
                break;
            default:
                console.log("Generating team HTML");
                createHtml();
                break;
        }
    })
}

const managerPrompt = () => {
    inquirer.prompt(managerQuestions)
        .then(managerResponse => {
            const newManager = new Manager(managerResponse.name, managerResponse.id, managerResponse.email, managerResponse.officeNumber)
            console.log("Manager info", newManager);
            allMembers.push(newManager);
            promptUser();
        })
}

const engineerPrompt = () => {
    inquirer.prompt(engineerQuestions)
        .then(engineerResponse => {
            const newEngineer = new Engineer(engineerResponse.name, engineerResponse.id, engineerResponse.email, engineerResponse.github);
            console.log("Engineer info", newEngineer);
            allMembers.push(newEngineer);
            promptUser();
        })
}

const internPrompt = () => {
    inquirer.prompt(internQuestions)
        .then(internResponse => {
            const newIntern = new Intern(internResponse.name, internResponse.id, internResponse.email, internResponse.school);
            console.log("Intern info", newIntern);
            allMembers.push(newIntern);
            promptUser();
        })
}

// After the user has input all employees desired, call the `render` function 
const createHtml = () => {
    console.log("All Members are", allMembers);
    console.log(outputPath);
    fs.writeFile(outputPath, render(allMembers), (err) => {
        if (err) throw err;
        console.log('The team profile has been generated!');
    });
}

promptUser();