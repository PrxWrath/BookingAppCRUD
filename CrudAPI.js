const form = document.querySelector('.myForm');
const msg = document.querySelector('.msg');
const btn = document.querySelector('#submit-btn');
const container = document.querySelector(".container");
let updateCheck = false;
let currentUser = {};
form?.addEventListener('submit', onSubmit);

document.addEventListener('DOMContentLoaded', () => {

    //GET users from crudcrud and populate the users display
    axios.get('https://crudcrud.com/api/61294ec7c33440aeae0cb46796c10825/userData')
        .then(res => {
            for (let user of res.data) {
                displayUsers(user);
            }
        })
        .catch(err => { console.log(err) });
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

        if (!updateCheck) {
            //POST users to crudcrud
            axios.post('https://crudcrud.com/api/61294ec7c33440aeae0cb46796c10825/userData', user)
                .then((res) => { displayUsers(res.data) })
                .catch(err => { console.log(err) });
        }
        else {
            //update users if edit event is triggered

            axios.put(`https://crudcrud.com/api/61294ec7c33440aeae0cb46796c10825/userData/${currentUser._id}`,user)
                .then(()=>{displayUsers(user)})
                .catch(err => { console.log(err) });
            currentUser = {};
            updateCheck = false;
        }
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
        
        //remove contents from display
        let delDiv = document.getElementById(user.email);
        delDiv.innerHTML = '';
        delDiv.style.display = 'none';

        //populate registration form
        uname.value = user.name;
        email.value = user.email;
        ph.value = user.phone;

        //edit users details after submit
        updateCheck = true;
        currentUser = user;

    })

    let delBtn = document.createElement('button');
    delBtn.textContent = 'X'
    delBtn.className = 'btn btn-sm btn-danger float-right';
    
    delBtn.addEventListener('click', (e) => {
        
        //delete users
        axios.delete(`https://crudcrud.com/api/61294ec7c33440aeae0cb46796c10825/userData/${user._id}`)
            .then(res => {
                let delDiv = document.getElementById(user.email);
                delDiv.innerHTML = '';
                delDiv.style.display = 'none';
            })
            .catch(err => { console.log(err) })
    })

    let data = document.createTextNode(user.name + ": " + user.email);
    newDiv.appendChild(data);
    newDiv.appendChild(delBtn);
    newDiv.appendChild(editBtn);

    container.appendChild(newDiv);
}



