

let users = JSON.parse(localStorage.getItem("users")) || [];

let editingId = null;

const form = document.getElementById("userForm");
const tableBody = document.getElementById("userTableBody");
const submitBtn = document.getElementById("submitBtn");

renderUsers();


form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const phone = document.getElementById("phone").value.trim();
const city = document.getElementById("city").value.trim();

if(!name || !email || !phone || !city){
    alert("Please fill all fields");
    return;
}

if(editingId){

    users = users.map(user =>
        user.id === editingId
        ? { ...user, name, email, phone, city }
        : user
    );

    editingId = null;
    submitBtn.textContent = "Add User";

}else{

    const user = {
        id: Date.now(),
        name,
        email,
        phone,
        city
    };

    users.push(user);
}

saveToLocalStorage();
renderUsers();
form.reset();

});


function renderUsers(){

tableBody.innerHTML = "";

if(users.length === 0){

tableBody.innerHTML = `
<tr>
<td colspan="6" class="no-data">
No Users Available
</td>
</tr>
`;

return;
}

users.forEach(user => {

tableBody.innerHTML += `
<tr>
<td>${user.id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.phone}</td>
<td>${user.city}</td>

<td>

<button
class="edit-btn"
onclick="editUser(${user.id})">
Edit
</button>

<button
class="delete-btn"
onclick="deleteUser(${user.id})">
Delete
</button>

</td>

</tr>
`;

});

}


function editUser(id){

const user = users.find(user => user.id === id);

document.getElementById("name").value = user.name;
document.getElementById("email").value = user.email;
document.getElementById("phone").value = user.phone;
document.getElementById("city").value = user.city;

editingId = id;

submitBtn.textContent = "Update User";

window.scrollTo({
top:0,
behavior:"smooth"
});

}


function deleteUser(id){

const confirmDelete = confirm(
"Are you sure you want to delete this user?"
);

if(!confirmDelete) return;

users = users.filter(user => user.id !== id);

saveToLocalStorage();

renderUsers();

}


function saveToLocalStorage(){

localStorage.setItem(
"users",
JSON.stringify(users)
);

}

