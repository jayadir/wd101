function formatUserDate(inputDate) {
    const parts = inputDate.split('/');
    if (parts.length !== 3) {
        return 'Invalid date format';
    }

    const [month, day, year] = parts.map(part => parseInt(part, 10));
    const date = new Date(year, month - 1, day);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}

function validateDate() {
    const dateInput = document.getElementById("dob");
    const selectedDate = new Date(dateInput.value);
    const maxDate = new Date(dateInput.max);
    const minDate = new Date(dateInput.min);

    const isInvalid = selectedDate < minDate || selectedDate > maxDate;

    if (isInvalid) {
        alert("Age should be between " + formatUserDate(dateInput.min) + " and " + formatUserDate(dateInput.max));
    }
}

function setInitialState() {
    const dateInput = document.getElementById("dob");
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());

    dateInput.setAttribute("min", minDate.toISOString().split('T')[0]);
    dateInput.setAttribute("max", maxDate.toISOString().split('T')[0]);
}

window.onload = setInitialState;

document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    const userTableBody = document.getElementById("userTableBody");

    loadUserEntries();

    registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = getValue("name");
        const email = getValue("email");
        const password = getValue("password");
        const terms = getCheckedValue("terms");
        const dob = getValue("dob");

        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${terms}</td>`;
        clearFormFields();

        saveUserEntry(name, email, password, dob, terms);
    });

    function getValue(id) {
        return document.getElementById(id).value;
    }

    function getCheckedValue(id) {
        return document.getElementById(id).checked;
    }

    function clearFormFields() {
        registrationForm.reset();
    }

    function loadUserEntries() {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.forEach(({ name, email, password, dob, terms }) => {
            const newRow = userTableBody.insertRow();
            newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${terms}</td>`;
        });
    }

    function saveUserEntry(name, email, password, dob, terms) {
        const userEntries = JSON.parse(localStorage.getItem("userEntries")) || [];
        userEntries.push({ name, email, password, dob, terms });
        localStorage.setItem("userEntries", JSON.stringify(userEntries));
    }
});
