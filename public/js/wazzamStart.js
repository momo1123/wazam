// this is for debugging purposes
console.log('DOMContentLoaded, () => {...}');
const superman =
   document.querySelector('.superman') ||
   document.querySelector('.batman') ||
   document.querySelector('.deadshot');
const container =
   document.querySelector('.backdrop-01') ||
   document.querySelector('.backdrop-02') ||
   document.querySelector('.backdrop-03');
let delayListener;
// adds an event listener for movement of the mouse
const attachListener = () => {
   container.addEventListener('mousemove', (event) => {
      // this is for debugging purposes
      console.log('mousemove, (event) => {...}');
      // grabs the speed attribute from superman object
      const speed = superman.getAttribute('data-speed');
      // important: do not change the decimal value
      // calculates the x and y coordinates using the speed
      const x = ((window.innerWidth / 2 - event.clientX * 0.95) * speed) / 100;
      const y = ((window.innerHeight / 2 - event.clientY * 0.95) * speed) / 100;
      // applies a translate method for the x and y coordinates
      superman.style.transform = `translateX(${x}px) translateY(${y}px)`;
   });
};
// starts a delay when the page loads
const startDelay = () => {
   delayListener = setTimeout(() => {
      attachListener();
   }, 200);
};

startDelay();
