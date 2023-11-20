function formatUserDate(inputDate) {
    const parts = inputDate.split('/');
    if (parts.length !== 3) {
        return 'Invalid date format';
    }

    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10) - 1; // Months in JavaScript are 0-indexed
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
}

function validateDate() {
    const dateInput = document.getElementById("dob");
    const selectedDate = new Date(dateInput.value);
    const maxDate = new Date(dateInput.max);
    const minDate = new Date(dateInput.min);

    if (selectedDate < minDate) {
        alert("Age should be less than " + formatUserDate(dateInput.max));
    } else if (selectedDate > maxDate) {
        alert("Age should be less than " + formatUserDate(dateInput.min));
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

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const terms = document.getElementById("terms").checked;
        const dob = document.getElementById("dob").value;

        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `<td>${name}</td><td>${email}</td><td>${password}</td><td>${dob}</td><td>${terms}</td>`;
        clearFormFields();

        saveUserEntry(name, email, password, dob, terms);
    });

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
