const form = document.querySelector('form');
const loadingevent = document.querySelector('.loading');
loadingevent.style.display = 'none';
form.addEventListener('submit',(event) =>{

    event.preventDefault();
    const formData = new FormData(form);//in built variable to get form data
    const name = formData.get('name');
    const content = formData.get('content');

    const Post = {
        name,
        content
    };

    console.log(Post);
    form.style.display='none';
    loadingevent.style.display='';
})