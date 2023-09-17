// this is for debugging purposes
console.log('DOMContentLoaded, () => {...}');
const superman = document.querySelector('.superman');
const container = document.querySelector('.backdrop');
// adds an event listener for movement of the mouse
container.addEventListener('mousemove', (event) => {
   // this is for debugging purposes
   console.log('mousemove, (event) => {...}');
   // grabs the speed attribute from superman object
   const speed = superman.getAttribute('data-speed');
   // calculates the x and y coordinates using the speed
   const x = (window.innerWidth - event.pageX * speed) / 100;
   const y = (window.innerHeight - event.pageY * speed) / 100;
   // applies a translate method for the x and y coordinates
   superman.style.transform = `translateX(${x}px) translateY(${y}px)`;
});
