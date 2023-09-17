const logout = async function (event) {
   event.preventDefault();
   try {
      // uses the logout module to handle logout
      const response = await fetch('/api/user/logout', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
         // redirects the browser to the homepage
         document.location.replace('/');
      }
   } catch (error) {
      console.log(error);
   }
};

document.querySelector('.logout-btn').addEventListener('submit', logout);
