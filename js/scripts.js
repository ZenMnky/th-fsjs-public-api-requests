
const randomUserURL = 'https://randomuser.me/api/?format=json&results=12&nat=us'; //RandomUserAPI with formatting to get results in JSON, for 12 users, nationality = us
const body = document.querySelector('body');
const galleryDiv = document.querySelector('div#gallery'); //Aera to populate with users
const userArray = galleryDiv.children;
const modalContainerArray = document.querySelectorAll('div.modal-container');


// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------


function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .catch( error => console.log('Looks like there was a problem', error))
}

fetchData(randomUserURL)
    .then(getUserList)
    .then(displayUsers)
    .catch(err => console.log(err));


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
    if(response.ok){
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function getUserList(response) {
    return response['results'];
}

function displayUsers(userList){

    userList.forEach(user => { 
        
        //get user data
        const profilePhoto = user.picture.large;
        const firstName = user.name.first;
        const lastName = user.name.last;
        const email = user.email;
        const city = user.location.city;
        const state = user.location.state;
        const postcode = user.location.postcode;
        const phoneNumber = user.cell;
        const streetNumber = user.location.street.number;
        const streetName = user.location.street.name;
        const birthday = new Date(user.dob.date);

        //create user display-card section
        const userSection = document.createElement('div');
        userSection.classList.add('card');

        //create display-card child and display user image
        const userSection_cardImgContainer = document.createElement('div');
        userSection_cardImgContainer.classList.add('card-img-container');
        const userImg = document.createElement('img')
        userImg.setAttribute('class', 'card-img');
        userImg.setAttribute('alt', 'profile picture');
        userImg.setAttribute('src', profilePhoto);
        userSection_cardImgContainer.appendChild(userImg);
        
        //create display-card child and display user info
        const userSection_cardInfoContainer = document.createElement('div');
        userSection_cardInfoContainer.classList.add('card-info-container');
        userSection_cardInfoContainer.innerHTML = `
            <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${city}, ${state}</p>
        `;

        userSection.addEventListener('click', () => {console.log(`user ${firstName} ${lastName} clicked`)});
        
        
        // CREATE MODAL SECTION
        // - initialized as hidden
        function generateModal() {
            const modalContainer = document.createElement('div');
            modalContainer.classList.add('modal-container');
            modalContainer.setAttribute('data-modalUser', phoneNumber );

            const modalDiv = document.createElement('div');
            modalDiv.classList.add('modal');
            modalContainer.appendChild(modalDiv);

            const modalCloseBtn = document.createElement('button');
            modalCloseBtn.type = 'button';
            modalCloseBtn.id = 'modal-close-btn';
            modalCloseBtn.className = 'modal-close-btn';
            modalCloseBtn.innerHTML = `<strong>X</strong>`;
            modalDiv.appendChild(modalCloseBtn);
            
            const modalInfoContainer = document.createElement('div');
            modalInfoContainer.classList.add('modal-info-container');

            modalInfoContainer.innerHTML = `      
                <img class="modal-img" src="${profilePhoto}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${city}</p>
                <hr>
                <p class="modal-text">${phoneNumber}</p>
                <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state} ${postcode}</p>
                <p class="modal-text">Birthday: ${birthday.getMonth()}/${birthday.getDay()}/${birthday.getFullYear()}</p> 
            `;

            body.appendChild(modalContainer);
            modalContainer.appendChild(modalDiv);
            modalDiv.appendChild(modalInfoContainer);

            modalCloseBtn.addEventListener('click', () => { 
                body.lastChild.remove();
            } );
        }
        
        //append nodes
        galleryDiv.appendChild(userSection);
        userSection.appendChild(userSection_cardImgContainer);
        userSection.appendChild(userSection_cardInfoContainer);
        
        

        userSection.addEventListener('click', () => {
            generateModal();
        });
        
        
    });
    
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

console.log('userArray: ',userArray);
console.log('modalContainerArray: ', modalContainerArray);
