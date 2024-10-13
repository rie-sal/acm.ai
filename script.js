document.querySelectorAll('section').forEach(section => {
  section.addEventListener('click', function() {
    alert(`You clicked on the ${section.querySelector('h2').innerText} section!`);
  });
});

const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
  toggleButton.classList.toggle('active'); // Add/remove active class for animation
  console.log(toggleButton.classList); // Check classes in the console
});
