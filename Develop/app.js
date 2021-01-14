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
const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `What is your name?`,
    },
    {
        type: 'input',
        name: 'id',
        message: `What is your ID?`,
    },
    {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: `What is your office number?`,
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `What is your name?`,
    },
    {
        type: 'input',
        name: 'id',
        message: `What is your ID?`,
    },
    {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
    },
    {
        type: 'input',
        name: 'github',
        message: `What is your GitHub?`,
    }
]

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: `What is your name?`,
    },
    {
        type: 'input',
        name: 'id',
        message: `What is your ID?`,
    },
    {
        type: 'input',
        name: 'email',
        message: `What is your email?`,
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

const createHtml = () => {
    console.log("All Members are", allMembers);
    console.log(outputPath);
    fs.writeFile(outputPath, render(allMembers), (err) => {
        if (err) throw err;
        console.log('The team profile has been generated!');
    });
}


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

promptUser();