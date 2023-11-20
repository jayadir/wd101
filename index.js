// Uncomment the email validation function if needed
/*
function validateEmail() {
    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailPattern.test(email)) {
        document.getElementById('validationResult').textContent = "";
    } else {
        document.getElementById('validationResult').textContent = "Email is not valid.";
    }
}
*/

function formatDate(inputDate) {
    const [day, month, year] = inputDate.split('/');
    const date = new Date(year, month - 1, day);

    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}

function restrict() {
    var dateInput = document.getElementById("dob");
    var selectedDate = new Date(dateInput.value);

    var maxD = new Date(dateInput.max);
    var minD = new Date(dateInput.min);

    if (selectedDate < minD || selectedDate > maxD) {
        document.getElementById('dob').textContent = "Age should be between " + formatDate(dateInput.min) + " and " + formatDate(dateInput.max);
    } else {
        document.getElementById('dob').textContent = "";
    }
}

function initialState() {
    var dateInput = document.getElementById("dob");
    var today = new Date();
    var maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    var minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

    dateInput.setAttribute("min", formatDate(minDate.toLocaleDateString()));
    dateInput.setAttribute("max", formatDate(maxDate.toLocaleDateString()));
}

window.onload = initialState;

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const userTableBody = document.getElementById("userTableBody");

    loadUserEntries();

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = getValue("name");
        const email = getValue("email");
        const pwd = getValue("password");
        const terms = document.getElementById("terms").checked;
        const dob = getValue("dob");

        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${pwd}</td><td>${dob}</td><td>${terms}</td>`;
        clearFormFields();

        saveUserEntry(name, email, pwd, dob, terms);
    });

    function getValue(id) {
        return document.getElementById(id).value;
    }

    function clearFormFields() {
        registrationForm.reset();
    }

    function loadUserEntries() {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.forEach(({ name, email, pwd, dob, terms }) => {
            const newRow = userTableBody.insertRow();
            newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${pwd}</td><td>${dob}</td><td>${terms}</td>`;
        });
    }

    function saveUserEntry(name, email, pwd, dob, terms) {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.push({ name, email, pwd, dob, terms });
        localStorage.setItem("userEntries", JSON.stringify(userEntries));

        loadUserEntries();
    }
});
