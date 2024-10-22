// adding skills
    const skillForm = document.querySelector('#skillForm');
    const skillInput = document.querySelector('#skillInput');
    const skillList= document.querySelector('#skillList');


skillForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const NewSkill = skillInput.value.trim();

        if (NewSkill !== '') {

            const ListItem = document.createElement('li');
            ListItem.textContent = NewSkill;

            skillList.appendChild(ListItem);

            skillInput.value = '';
        }
});


// for loops for projects
const projectTitles = [ // array of project titles
    "Birthday Invite Project", "Color Vocab Project", "Box Making Project",
    "Motivational Poster Project", "CSS Flag", "Web Design Agency",
    "Mondrain Painting", "Pricing Project", "TinDog"
];

const titleLinks = [
    "/public/movie-ranking.html",
    "/public/birthday-invite.html",
    "/public/Color Vocab.html",
    "/public/Box Model.html",
    "/public/Motivational.html",
    "/public/Flag.html",
    "/public/Web Design Agency CSS.html",
    "/public/Mondrian.html",
    "/public/Pricing.html",
    "/public/TinDog.html"
];

const projectDescriptions = [ // array of project descriptions
    "A project showcasing some of my favorite movies.", "A project about my birthday.",
    "A project about learning colors in spanish.", "A project showcasing the use of Box Models in CSS.",
    "A project of a motivational poster with use of CSS.", "A flag made out of CSS selectors.",
    "A parody of a Web Design Agency with the use of CSS elements.", "A Mondrain painting using grid functions.",
    "A pricing website using flexbox functions.", "A parody of tinder with dogs, using bootstrap components."
];

const projectImages = [
    "./assets/images/movie-ranking.png",
    "./assets/images/birthday-invite.png",
    "./assets/images/color-vocab.png",
    "./assets/images/Box-model.png",
    "./assets/images/Motivational.png",
    "./assets/images/Laos.png",
    "./assets/images/Web-Design.png",
    "./assets/images/mondrain.png",
    "./assets/images/price.png",
    "./assets/images/TinDog.png"
];

const projectDeadlines = [ // array of project deadline (dummy dates)
    "2024-12-15",
    "2024-10-20",
    "2024-09-01",
    "2024-12-04",
    "2024-12-15",
    "2024-10-20",
    "2024-09-01",
    "2024-12-04",
    "2024-09-01",
];

function getProjectStatus(deadline) { // deadline function to determine if project is "ongoing" or not
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);

    if (deadlineDate > currentDate) {
        return "Ongoing";
    } else {
        return "Completed";
    }
}


function displayProjects() { // create a function that lists these arrays
    const projectList = document.getElementById('projectList');

    for (let i = 0; i < projectTitles.length; i++) {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const title =  document.createElement('h2');
        const titleLink = document.createElement('a');
        titleLink.href = titleLinks[i];
        titleLink.textContent = projectTitles[i];
        title.appendChild(titleLink);


        const image = document.createElement('img');
        image.src = projectImages[i];
        image.alt = projectTitles[i];
        image.classList.add('project-image');


        const description = document.createElement('h4');
        description.textContent = projectDescriptions[i];

        const deadline = document.createElement('p');
        deadline.textContent = `Deadline: ${projectDeadlines[i]}`;

        const deadlineStatus = document.createElement('i');
        deadlineStatus.textContent = `Status: ${getProjectStatus(projectDeadlines[i])}`; // calls function to see if which status it should say
        deadlineStatus.classList.add('status');

        projectDiv.appendChild(title);
        projectDiv.appendChild(image);
        projectDiv.appendChild(description);
        projectDiv.appendChild(deadline);
        projectDiv.appendChild(deadlineStatus);



        projectList.appendChild(projectDiv);

    }
}

// call function
displayProjects();




// donwload count
let downloadCount = 0;

function updateDownloadCount() { // update download count whenever clicked on

    downloadCount++;
    displayDownloadCount();

}

function displayDownloadCount() { // displays the download count
    document.getElementById('downloadCount').textContent = `Downloads: ${downloadCount}`;
}

document.addEventListener('DOMContentLoaded', function() { // detects when user clicks button
    const downloadLink = document.getElementById('resumeDownload');

    if (downloadLink) {
        downloadLink.addEventListener('click', updateDownloadCount);
    }

    displayDownloadCount();
});



// education and work experience section

const experienceData = [ // array for work experience
    { title: "Produce Associate", company: "Sam's Club", startDate: "August 2024", endDate: "September 2024", Description: "Maintains up-to-date knowledge of the products; collaborating with cross functional teams and helping educate other associates on tools, tasks, and resources; communicating effectively and developing interpersonal skills for providing customer service; and being flexible to the needs of the business to work in other areas, tracking goods, maintaining in-stock levels, and controlling shrinkage in a timely manner."},
    { title: "Delivery Driver", company: "Jimmy John's", startDate: "September 2022 - February 2023", endDate: "November 2023 - April 2024", Description: "Responsible for performing all job duties accurately, safely and with honesty and integrity. Ask for feedback on provided services and resolve clients' complaints. Be prompt tactful, calm, courteous, and profession in all interactions"},
    { title: "Customer Associate", company: "Raising Cane's", startDate: "April 2023", endDate: "November 2024", Description: "Evaluate employee performance to gauge where skills are lacking and provide feedback. Be prompt, tactful, calm, courteous, and professional in all interactions"}
];

const educationData = [ // array for education experience
    { degree: "Associates", school: "Glendale Community College", duration: "2 years", description: "4 Semesters consiting average of 4 Classes each. Joined Maricopa Honors Society and Participated in Cinema Society Club as a Senator"},
    { degree: "Certificate", school: "Pharmacy Technician Program - West-Mec", duration: "1 year", description: "This one year hands-on course teaches the basics of pharmacy duties while also performing them in a practice lab for 450 hours of classroom and lab instruction"},
];


function createTable(data, headers, tableId) {
    const table = document.createElement('table');
    table.id = tableId;

    const thead = table.createTHead(); // creating table header
    const headerRow = thead.insertRow();

    for (let i = 0; i < headers.length; i++) { // using for loops to display data
        const th = document.createElement('th');
        th.textContent = headers[i];
        headerRow.appendChild(th);
    }    

    const tbody = table.createTBody(); // creating table body
    for (let i = 0; i < data.length; i++) {
        const row = tbody.insertRow();
        const item = data[i];
        for (let key in item) {
            const cell = row.insertCell();
            cell.textContent = item[key];
        }
    }

    return table;
}


// creating experience table
function createExperienceTable() {
  const headers = ["Title", "Company", "Start Date", "End Date", "Description"];
  const table = createTable(experienceData, headers, "experienceTable");
  document.getElementById('experience').appendChild(table);
}

// creating education table
function createEducationTable() {
  const headers = ["Degree", "School", "Duration", "Description"];
  const table = createTable(educationData, headers, "educationTable");
  document.getElementById('education').appendChild(table);
}

//initialize tables
function initTables() {
  createExperienceTable();
  createEducationTable();
}

// call initTables when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initTables);