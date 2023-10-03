// Data for divisions, zilas, upazilas, and school/college names with website links
const data = {
    divisions: ["Select Division", "Division 1", "Division 2", "Division 3"],
    zilas: {
        "Division 1": ["Select Zila", "Zila 1A", "Zila 1B", "Zila 1C"],
        "Division 2": ["Select Zila", "Zila 2A", "Zila 2B"],
        "Division 3": ["Select Zila", "Zila 3A", "Zila 3B", "Zila 3C", "Zila 3D"],
    },
    upazilas: {
        "Zila 1A": ["Select Upazila", "Upazila 1A1", "Upazila 1A2"],
        "Zila 1B": ["Select Upazila", "Upazila 1B1", "Upazila 1B2", "Upazila 1B3"],
        "Zila 1C": ["Select Upazila", "Upazila 1C1"],
        "Zila 2A": ["Select Upazila", "Upazila 2A1", "Upazila 2A2"],
        "Zila 2B": ["Select Upazila", "Upazila 2B1"],
        "Zila 3A": ["Select Upazila", "Upazila 3A1", "Upazila 3A2"],
        "Zila 3B": ["Select Upazila", "Upazila 3B1"],
        "Zila 3C": ["Select Upazila", "Upazila 3C1"],
        "Zila 3D": ["Select Upazila", "Upazila 3D1", "Upazila 3D2"],
    },
    schools: {
        "Upazila 1A1": [
            { name: "Select School/College", website: "" },
            { name: "School 1A1a", website: "https://school1A1a.com" },
            { name: "School 1A1b", website: "https://school1A1b.com" },
        ],
        "Upazila 1A2": [
            { name: "Select School/College", website: "" },
            { name: "School 1A2a", website: "https://school1A2a.com" },
            { name: "School 1A2b", website: "https://school1A2b.com" },
        ],
        // Add more schools as needed
    },
};

// Function to populate a dropdown with options
function populateDropdown(dropdown, options) {
    dropdown.innerHTML = "";
    options.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}

// Function to populate the school/college dropdown with options
function populateSchoolDropdown(schoolDropdown, schools) {
    schoolDropdown.innerHTML = "<option>Select School/College</option>";
    schools.forEach((school) => {
        const optionElement = document.createElement("option");
        optionElement.textContent = school.name;
        optionElement.setAttribute('data-website', school.website); // Store the website URL as a data attribute
        schoolDropdown.appendChild(optionElement);
    });
}

// Function to handle the selection of a school/college and open the website link
function selectSchool() {
    const schoolDropdown = document.getElementById("school-dropdown");
    const selectedSchool = schoolDropdown.value;

    if (selectedSchool !== "Select School/College") {
        const selectedOption = schoolDropdown.options[schoolDropdown.selectedIndex];
        const websiteURL = selectedOption.getAttribute('data-website');

        if (websiteURL) {
            window.open(websiteURL, '_blank'); // Open the website in a new tab
        }
    }
}

// Event listener for the school/college dropdown
document.getElementById("school-dropdown").addEventListener("change", selectSchool);

// Function to update the dropdowns based on the selected values
function updateDropdowns() {
    const divisionDropdown = document.getElementById("division-dropdown");
    const zilaDropdown = document.getElementById("zila-dropdown");
    const upazilaDropdown = document.getElementById("upazila-dropdown");
    const schoolDropdown = document.getElementById("school-dropdown");
    const websiteLink = document.getElementById("website-link");

    const selectedDivision = divisionDropdown.value;
    const selectedZila = zilaDropdown.value;
    const selectedUpazila = upazilaDropdown.value;

    if (selectedDivision === "Select Division") {
        // Disable and reset the other dropdowns
        zilaDropdown.disabled = true;
        upazilaDropdown.disabled = true;
        schoolDropdown.disabled = true;
        websiteLink.style.display = "none";
    } else {
        zilaDropdown.disabled = false;
        populateDropdown(zilaDropdown, data.zilas[selectedDivision]);
        upazilaDropdown.disabled = true;
        schoolDropdown.disabled = true;
        websiteLink.style.display = "none";
    }

    // Reset the other dropdowns and the website link
    populateDropdown(upazilaDropdown, []);
    populateDropdown(schoolDropdown, []);
    websiteLink.style.display = "none";
}

// Event listeners for dropdown changes
document.getElementById("division-dropdown").addEventListener("change", updateDropdowns);
document.getElementById("zila-dropdown").addEventListener("change", updateDropdowns);
document.getElementById("upazila-dropdown").addEventListener("change", updateDropdowns);

// Initialize the division dropdown
populateDropdown(document.getElementById("division-dropdown"), data.divisions);
