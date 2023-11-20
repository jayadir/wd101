// index.js
function submitForm(event) {
    event.preventDefault();
    const fullNameInput = document.getElementById("fullName");
    const emailAddressInput = document.getElementById("emailAddress");
    const passwordInput = document.getElementById("password");
    const dateOfBirthInput = document.getElementById("dateOfBirth");
    const acceptTermsInput = document.getElementById("acceptTerms");
  
    if (!validateAge(dateOfBirthInput.value)) {
      alert("Your age must be between 18 and 55");
      return false;
    }
  
    const tableBody = document.querySelector("tbody");
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
  
    const userTable = document.getElementById("userTable");
    localStorage.setItem("userTable", userTable.outerHTML);
    const userData = getUserData();
    localStorage.setItem("userData", JSON.stringify(userData));
    console.log(getUserData());
  
    // Clear the form after submission
    document.getElementById("userForm").reset();
  }
  
  function getUserData() {
    const table = document.querySelector("table");
    const tbody = table.tBodies[0];
  
    const rows = Array.from(tbody.rows);
    const userData = rows.reduce((accumulator, currentValue) => {
      const [fullNameCell, emailAddressCell, passwordCell, dateOfBirthCell, acceptTermsCell] = Array.from(
        currentValue.cells
      );
      const data = {
        fullName: fullNameCell.textContent,
        emailAddress: emailAddressCell.textContent,
        password: passwordCell.textContent,
        dateOfBirth: dateOfBirthCell.textContent,
        acceptTerms: acceptTermsCell.textContent,
      };
  
      accumulator.push(data);
  
      return accumulator;
    }, []);
  
    return userData;
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
    const output = document.getElementById("userTable");
  
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
  
      output.innerHTML = `
          <table class="user-table">
              <thead>
                  <tr>
                      <th>Full Name</th>
                      <th>Email Address</th>
                      <th>Password</th>
                      <th>Date of Birth</th>
                      <th>Accept Terms</th>
                  </tr>
              </thead>
              <tbody>
                  ${rows}
              </tbody>
          </table>`;
    }
  }
  