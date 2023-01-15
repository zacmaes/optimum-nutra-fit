let user_data;

const formEl = document.querySelector('.form');
    formEl.addEventListener('submit', event => {
      event.preventDefault();
      const formData = new FormData(formEl);
      const data = Object.fromEntries(formData);
      
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        res.json()
      }).then((data) => {
        user_data = data
        console.log(user_data)
      }).then((res) => { 
        // this don't work
        window.location.replace("/home");
      }).catch(function (err) {
        console.info(err);
    });
    });
