const form = document.querySelector('.myForm');
const msg = document.querySelector('.msg');
const btn = document.querySelector('#submit-btn');

const container = document.querySelector(".container");

form?.addEventListener('submit', onSubmit);

//display users in local storage when document is loaded
//document.addEventListener('DOMContentLoaded', displayUsers(0));

//add new users
function onSubmit(e) {

    e.preventDefault();
    const uname = document.querySelector('#name');
    const email = document.querySelector('#email');
    const ph = document.querySelector('#phone')
    if (uname.value === '' || email.value === '') {
        msg.classList.add('bg-danger')
        msg.classList.add('text-light')
        msg.innerHTML = 'Please enter values in all fields.'
        setTimeout(() => msg.remove(), 3000);
    }
    else {
        let user = {
            name: uname.value,
            email: email.value,
            phone: ph.value
        }

        axios.post('https://crudcrud.com/api/650b16b3c5bf41c591b834bf5296be0d/userData', user)
            .then(res=>{console.log(res)})
            .catch(err=>{console.error(err)});

        uname.value = '';
        email.value = '';
        ph.value = '' ;

    }

}


//display existing users   
function displayUsers(user) {

    let uname = document.querySelector('#name');
    let email = document.querySelector('#email');
    let ph = document.querySelector('#phone')


        let newDiv = document.createElement('div');
        newDiv.className = 'list-group-item m-auto bg-dark text-light w-75';
        newDiv.setAttribute('id', user.email);

        let editBtn = document.createElement('button');
        editBtn.className = 'btn btn-sm btn-primary mr-2 float-right';
        editBtn.textContent = 'Edit'
        editBtn.addEventListener('click', (e) => {
            uname.value = user.name;
            email.value = user.email;
            ph.value = user.phone;
            newDiv.remove();
            localStorage.removeItem(`User${user.email}`)
        })

        let delBtn = document.createElement('button');
        delBtn.textContent = 'X'
        delBtn.className = 'btn btn-sm btn-danger float-right';
        delBtn.addEventListener('click', (e) => {
            newDiv.remove();
            localStorage.removeItem(`User${user.email}`)
        })

        let data = document.createTextNode(user.name + ": " + user.email);
        newDiv.appendChild(data);
        newDiv.appendChild(delBtn);
        newDiv.appendChild(editBtn);

        container.appendChild(newDiv);
    
}



