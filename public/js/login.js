/*
const login = async function (event) {
   event.preventDefault();

   // Collect values from the login form
   const name = document.querySelector('#username-row').value.trim();
   const password = document.querySelector('#password-row').value.trim();
   console.log(name, password);
   if (name && password) {
      try {
         // uses the login module to handle login
         const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ name, password }), // hand off
            headers: { 'Content-Type': 'application/json' },
         });

         const data = await response.json();

         console.log('data:', data);

         if (response.ok) {
            // redirects the browser to the homepage
            document.location.replace('/');
         }
      } catch (error) {
         console.log(error);
      }
   }
};
*/

const register = async (event) => {
   event.preventDefault();

   const name = document.querySelector('#username-row').value.trim();
   const email = document.querySelector('#email-row').value.trim();
   const password = document.querySelector('#password-row').value.trim();

   if (name && email && password) {
      try {
         // uses the login module to handle login
         const response = await fetch('/api/user/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }), // hand off
            headers: { 'Content-Type': 'application/json' },
         });
         // Use the login module to handle signup
         // await response.json(name, email, password);
         // this is for debugging purposes
         console.log(response);
         // Redirect the browser to the homepage
         document.location.replace('/');
      } catch (error) {
         console.log(error);
      }
   }
};

if (window.location.pathname === '/login') {
   document.querySelector('.login-form').addEventListener('submit', login);
} else if (window.location.pathname === '/register') {
   document
      .querySelector('.register-form')
      .addEventListener('submit', register);
}
