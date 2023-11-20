
function submitForm(event) {
  event.preventDefault();
  const fullNameInput = document.getElementById("name");
  const emailAddressInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const dateOfBirthInput = document.getElementById("dob");
  const acceptTermsInput = document.getElementById("acceptTerms");

  if (!validateEmail(emailAddressInput.value)) {
    alert("Please enter a valid email address.");
    return false;
  }

  if (!validateAge(dateOfBirthInput.value)) {
    alert("Your age must be between 18 and 55");
    return false;
  }

  const tableBody = document.querySelector("#userTable tbody");
  const row = tableBody.insertRow();
  const fullNameCell = row.insertCell(0);
  const emailAddressCell = row.insertCell(1);
  const passwordCell = row.insertCell(2);
  const dateOfBirthCell = row.insertCell(3);
  const acceptTermsCell = row.insertCell(4);

  fullNameCell.textContent = fullNameInput.value;
  emailAddressCell.textContent = emailAddressInput.value;
  passwordCell.textContent = passwordInput.value;
  dateOfBirthCell.textContent = dateOfBirthInput.value;
  acceptTermsCell.textContent = acceptTermsInput.checked ? "Yes" : "No";

  const userData = getUserData();
  localStorage.setItem("userData", JSON.stringify(userData));

  // Clear the form after submission
  document.getElementById("userForm").reset();
}

function getUserData() {
  const table = document.querySelector("#userTable");
  const tbody = table.tBodies[0];

  const rows = Array.from(tbody.rows);
  const userData = rows.map((row) => {
    const [fullNameCell, emailAddressCell, passwordCell, dateOfBirthCell, acceptTermsCell] = row.cells;
    return {
      fullName: fullNameCell.textContent,
      emailAddress: emailAddressCell.textContent,
      password: passwordCell.textContent,
      dateOfBirth: dateOfBirthCell.textContent,
      acceptTerms: acceptTermsCell.textContent,
    };
  });

  return userData;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateAge(birthday) {
  const givenBday = new Date(birthday);
  const currentDate = new Date();
  const age = calculateAge(currentDate, givenBday);
  return age >= 18 && age <= 55;
}

function calculateAge(dt2, dt1) {
  const diff = (dt2.getTime() - dt1.getTime()) / 1000;
  const age = Math.abs(Math.round(diff / (365.25 * 24 * 60 * 60)));
  return age;
}

window.onload = function () {
  renderTable();
};

function renderTable() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const tableBody = document.getElementById("tableBody");

  if (userData) {
    const rows = userData
      .map((data) => {
        return `
            <tr>
                <td>${data.fullName}</td>
                <td>${data.emailAddress}</td>
                <td>${data.password}</td>
                <td>${data.dateOfBirth}</td>
                <td>${data.acceptTerms}</td>
            </tr>`;
      })
      .join("");

