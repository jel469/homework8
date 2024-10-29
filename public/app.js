$(document).ready(function() {
    $('.navbar-nav a.nav-link').on('click', function(e) {
        if (this.href.indexOf(location.pathname) !== -1) {
            e.preventDefault();

            const targetId = $(this).attr('href').split('#')[1];
            const $targetSection = $('#' + targetId);

            if ($targetSection.length) {
                const navHeight = $('.navbar').outerHeight();

                $('html, body').animate({ // animate function
                    scrollTop: $targetSection.offset().top - navHeight
                }, 500); // scroll speed

                $('.navbar-collapse').collapse('hide');
            }
        }
    });

    $(window).on('scroll', function() {
        const scrollPosition = $(this).scrollTop();
        const navHeight = $('.navbar').outerHeight();

        $('section').each(function() {
            const topDistance = $(this).offset().top - navHeight - 5; 

            if (scrollPosition >= topDistance) {
                const id = $(this).attr('id');
                $('.navbar-nav .nav-link').removeClass('active');
                $(`.navbar-nav .nav-link[href$="#${id}"]`).addClass('active');
            }
        });
    });
});

$(document).ready(function() {
    let skillsSet = [];

    function updateSkillsList() { // update
        const $skillsList = $('#skillsList');
        $skillsList.empty();
        
        skillsSet.forEach((skill, index) => {
            const $li = $('<li>').text(skill).hide().fadeIn(); // fade in
            
            const $editBtn = $('<button>')
                .addClass('edit-btn')
                .text('Edit')
                .click(function() {
                    editSkill(index);
                });

            const $deleteBtn = $('<button>')
                .addClass('delete-btn')
                .text('Delete')
                .click(function() {
                    deleteSkill(index);
                });

            $li.append($deleteBtn).append($editBtn);
            $skillsList.append($li);
        });
    }
 // adding
    function addSkill(skill) {
        skill = skill.trim();
        if (skill === '') {
            alert('Please enter a skill.');
            return false;
        }
        if (skillsSet.some(existingSkill => existingSkill.toLowerCase() === skill)) {
            alert('This skill already exists.'); // skill exists already
            return false;
        }
        
        skillsSet.push(skill);
        updateSkillsList();
        return true;
    }
 // edit
    function editSkill(index) {
        const oldSkill = skillsSet[index];
        const newSkill = prompt('Edit skill:', oldSkill);
        if (newSkill !== null) {
            const trimmedNewSkill = newSkill.trim();
            if (trimmedNewSkill === '') {
                alert('Skill cannot be empty.');
                return;
            }
            skillsSet[index] = trimmedNewSkill;
            updateSkillsList();
        }
    }

    function deleteSkill(index) {// delete
        $('#skillsList li').eq(index).slideUp(300, function() {
            skillsSet.splice(index, 1);
            updateSkillsList();
        });
    }

    $('#skillForm').submit(function(e) {
        e.preventDefault();
        const skill = $('#skillInput').val();
        if (addSkill(skill)) {
            $('#skillInput').val('');
        }
    });
    function clearInputs() {
        $('#skillForm input').val('');
    }

    $('#skillInput').keydown(function(e) {
        if (e.key === 'Enter') { // enter key
            e.preventDefault();
            const skill = $(this).val();
            if (addSkill(skill)) {
                $(this).val('');
            }
        } else if (e.key === 'Escape') { // escape key
            e.preventDefault();
            clearInputs();
        }
    });

    $('#skillForm').submit(function(e) {
        e.preventDefault();
        const skill = $('#skillInput').val();
        if (addSkill(skill)) {
            $('#skillInput').val('');
        }
    });
});



// for loops for projects
const projectTitles = [ // array of project titles
    "Birthday Invite Project", "Color Vocab Project", "Box Making Project",
    "Motivate Poster Project", "CSS Flag", "Web Design Agency",
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

$(document).ready(function() {
    const projects = projectTitles.map((title, index) => ({ // getting projects from previous arrays
        title: title,
        link: titleLinks[index],
        description: projectDescriptions[index],
        imageURL: projectImages[index],
        deadline: new Date(projectDeadlines[index])
    }));

    function getProjectStatus(deadline) { // deadline
        const currentDate = new Date();
        return deadline > currentDate ? "Ongoing" : "Completed";
    }

    function renderProjects(projectsArray) { // card format
        const $container = $('#projectList');
        $container.empty();

        for (let i = 0; i < projectsArray.length; i++) { // use of for
            const project = projectsArray[i];
            const $projectDiv = $('<div>').addClass('project');

            const $title = $('<h2>');
            const $titleLink = $('<a>')
                .attr('href', project.link)
                .text(project.title);
            $title.append($titleLink);

            const $image = $('<img>')
                .attr('src', project.imageURL)
                .attr('alt', project.title)
                .addClass('project-image');

            const $description = $('<h4>').text(project.description);

            const $deadline = $('<p>').text(`Deadline: ${project.deadline.toDateString()}`);

            const $status = $('<i>')
                .text(`Status: ${getProjectStatus(project.deadline)}`)
                .addClass('status');

            $projectDiv.append($title, $image, $description, $deadline, $status);
            $container.append($projectDiv);
        }
    }

    function sortProjects(ascending = true) {
        projects.sort((a, b) => { // using array.sort function
            return ascending ? a.deadline - b.deadline : b.deadline - a.deadline;
        });
        renderProjects(projects);
    }

    renderProjects(projects);

    // sorting buttons
    const $sortContainer = $('<div>').addClass('sort-container');
    const $sortAsc = $('<button>')
        .text('Sort Earliest to Latest')
        .addClass('btn btn-primary mr-2')
        .click(() => sortProjects(true));
    const $sortDesc = $('<button>')
        .text('Sort Latest to Earliest')
        .addClass('btn btn-secondary')
        .click(() => sortProjects(false));

    $sortContainer.append($sortAsc, $sortDesc);
    $('#projectList').before($sortContainer);
});



// donwload count
let downloadCount = 0;

function updateDownloadCount() { // update download count whenever clicked on

    downloadCount++;
    displayDownloadCount();

}

function displayDownloadCount() { // displays the download count
    document.getElementById('downloadCount').textContent = `Downloads: ${downloadCount}`;
}
 // dom manipulation
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


function createEducationTable() {// creating education table
  const headers = ["Degree", "School", "Duration", "Description"];
  const table = createTable(educationData, headers, "educationTable");
  document.getElementById('education').appendChild(table);
}


function initTables() {//initialize tables
  createExperienceTable();
  createEducationTable();
}

// call initTables when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initTables);  // dom manipulation