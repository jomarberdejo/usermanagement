function save(event) {
  var id = document.getElementById('inputUserId').value;
  var fullName = document.getElementById('inputFullName').value;
  var username = document.getElementById('inputUsername').value;
  var email = document.getElementById('inputEmail').value;
  var phone = document.getElementById('inputPhone').value;
  var role = document.getElementById('inputRole').value;
  var logins = document.getElementById('inputLogins').value;
  var dateCreated = document.getElementById('inputDateCreated').value;

  var userList = JSON.parse(localStorage.getItem('userList')) || [];
  if (fullName === "" || username === "" || email === "" || phone === "" || role === "" || logins === "" || dateCreated === "") {
    alert("Please fill out the form");
    return;
  }
  if (id) {
    // Update existing user
    userList.forEach((user) => {
      if (user.id == id) {
        user.fullName = fullName;
        user.username = username;
        user.email = email;
        user.phone = phone;
        user.role = role;
        user.logins = logins;
        user.dateCreated = dateCreated;
      }
    });
    document.getElementById('inputUserId').value = '';
  } else {
    // Add new user
    var user = {
      id: userList.length > 0 ? userList[userList.length - 1].id + 1 : 1,
      fullName: fullName,
      username: username,
      email: email,
      phone: phone,
      role: role,
      logins: logins,
      dateCreated: dateCreated,
    };
    userList.push(user);
  }

  localStorage.setItem('userList', JSON.stringify(userList));
  allData();
  document.getElementById('form').reset();
}

function allData() {
  var table = document.getElementById('table');
  table.innerHTML = '';

  var userList = JSON.parse(localStorage.getItem('userList')) || [];

  userList.forEach(function (user, index) {
    table.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.fullName}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.role}</td>
        <td>${user.logins}</td>
        <td>${user.dateCreated}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="find(${user.id})">
            <i class="fa fa-edit"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="removeData(${user.id})">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </tr>`;
  });
}

function removeData(id) {
  var userList = JSON.parse(localStorage.getItem('userList')) || [];
  userList = userList.filter(function (user) {
    return user.id != id;
  });
  localStorage.setItem('userList', JSON.stringify(userList));
  allData();
}

function find(id) {
  var userList = JSON.parse(localStorage.getItem('userList')) || [];
  userList.forEach(function (user) {
    if (user.id == id) {
      document.getElementById('inputUserId').value = user.id;
      document.getElementById('inputFullName').value = user.fullName;
      document.getElementById('inputUsername').value = user.username;
      document.getElementById('inputEmail').value = user.email;
      document.getElementById('inputPhone').value = user.phone;
      document.getElementById('inputRole').value = user.role;
      document.getElementById('inputLogins').value = user.logins;
      document.getElementById('inputDateCreated').value = user.dateCreated;
    }
  });
}

allData();
