const form = document.querySelector('.myForm');
const msg = document.querySelector('.msg');
const btn = document.querySelector('#submit-btn');
const container = document.querySelector(".container");

form?.addEventListener('submit', onSubmit);

document.addEventListener('DOMContentLoaded', () => {

    //GET users from crudcrud and populate the users display
    axios.get('https://crudcrud.com/api/f16610c0a5934895b1933c7b7f6bb388/userData')
        .then(res => {
            for (let user of res.data) {
                displayUsers(user);
            }
        })
        .catch(err => { console.error(err) });
});


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

        //POST users to crudcrud
        axios.post('https://crudcrud.com/api/f16610c0a5934895b1933c7b7f6bb388/userData', user)
            .then((res) => { displayUsers(res.data) })
            .catch(err => { console.error(err) });

        uname.value = '';
        email.value = '';
        ph.value = '';

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
        //features to be added in next task
    })

    let delBtn = document.createElement('button');
    delBtn.textContent = 'X'
    delBtn.className = 'btn btn-sm btn-danger float-right';
    delBtn.addEventListener('click', (e) => {
        //delete users
        axios.delete(`https://crudcrud.com/api/f16610c0a5934895b1933c7b7f6bb388/userData/${user._id}`)
            .then(res => {
                let delDiv = document.getElementById(user.email);
                delDiv.innerHTML = '';
                delDiv.style.display = 'none';
            })
            .catch(err=>{console.error(err)})
    })

    let data = document.createTextNode(user.name + ": " + user.email);
    newDiv.appendChild(data);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(editBtn);

    container.appendChild(newDiv);
}



