const form = document.querySelector('form');
const loadingevent = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');
const API_URL = 'http://localhost:5000/mews'


loadingevent.style.display = '';


listAllMews();





form.addEventListener('submit',(event) =>{

    event.preventDefault();
    const formData = new FormData(form);//in built variable to get form data
    const name = formData.get('name');
    const content = formData.get('content');

    const mew = {
        name,
        content
    };

    
    form.style.display='none';
    loadingevent.style.display='';


    fetch(API_URL,{
        method: 'POST',
        body : JSON.stringify(mew),
        headers:{
            'content-type': 'application/json'
        }
    }).then(response => response.json()).then(createdMew => {
            console.log(createdMew);
            form.reset();
            form.style.display='';
             loadingevent.style.display='none';
        });
    });

    function listAllMews(){
        fetch(API_URL)
        .then(response => response.json())
        .then(mews => {
            console.log(mews);
            mews.reverse();
            mews.forEach(mew => {
                const div = document.createElement('div');

                const header = document.createElement('h3');

                header.textContent = mew.name;

                const contents = document.createElement('p');
                contents.textContent   = mew.content;

                const date = document.createElement('small');
                date.textContent   =  new Date(mew.created);

                div.appendChild(header);
                div.appendChild(contents);
                div.appendChild(date);

                mewsElement.appendChild(div);
                
            });
            loadingevent.style.display='';
        });
    }