// Login Authentication
function login(e) {
    e.preventDefault();
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "admin123") {
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Username or Password");
    }
}

// Employee CRUD
let empForm = document.getElementById("empForm");
let empTable = document.getElementById("empTable");

if (empForm) {
    empForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("empName").value;
        let email = document.getElementById("empEmail").value;
        let age = document.getElementById("empAge").value;

        if (age <= 0) {
            alert("Enter valid age");
            return;
        }

        let row = empTable.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${age}</td>
            <td>
                <button onclick="editRow(this)">Edit</button>
                <button onclick="deleteRow(this)">Delete</button>
            </td>
        `;
        empForm.reset();
    });
}

function deleteRow(btn) {
    btn.parentElement.parentElement.remove();
}

function editRow(btn) {
    let row = btn.parentElement.parentElement;
    document.getElementById("empName").value = row.cells[0].innerText;
    document.getElementById("empEmail").value = row.cells[1].innerText;
    document.getElementById("empAge").value = row.cells[2].innerText;
    row.remove();
}
