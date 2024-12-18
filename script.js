/* document.querySelectorAll('section').forEach(section => {
  section.addEventListener('click', function() {
    alert(`You clicked on the ${section.querySelector('h2').innerText} section!`);
  });
}); */ 

window.onload = function() {
  getMessages();
};

const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode'); // Toggle dark mode class on body
  toggleButton.classList.toggle('active'); // Add/remove active class for animation
  console.log(toggleButton.classList); // Check classes in the console
});

const events = []; // Global events array
const calendarGrid = document.querySelector('.calendar-grid');
const eventList = document.getElementById('event-list');
const monthYearDisplay = document.getElementById('month-year');

// Fetch and parse the .ics file
fetch('calendar.ics')
  .then(response => response.text())
  .then(data => parseICSFile(data))
  .catch(error => console.error('Error fetching calendar:', error));

function parseICSFile(data) {
  const jcalData = ICAL.parse(data); // Parse the .ics file into ICAL format
  const comp = new ICAL.Component(jcalData); // Create a new ICAL component
  const vevents = comp.getAllSubcomponents('vevent'); // Get all events from the .ics file
  
  events.length = 0; // Clear the global array
  vevents.forEach(event => {
    const eventDetails = new ICAL.Event(event); // Create an event object
    events.push({
      title: eventDetails.summary,
      description: eventDetails.description,
      startDate: eventDetails.startDate.toJSDate(), // Convert to JavaScript Date
      endDate: eventDetails.endDate.toJSDate(),
    });
  });

  console.log(events); // array of event objects
  populateCalendar(events);
}

// Check if a specific day has any event
function hasEventForDate(day, month, year) {
  return events.some(event => {
    const eventDate = event.startDate;
    return eventDate.getDate() === day &&
           eventDate.getMonth() === month &&
           eventDate.getFullYear() === year;
  });
}

// Get all events for a specific day
function getEventsForDay(day, month, year) {
  return events.filter(event => {
    const eventDate = event.startDate;
    return eventDate.getDate() === day &&
           eventDate.getMonth() === month &&
           eventDate.getFullYear() === year;
  });
}

// Generate the calendar for the specified month and year
function generateCalendar(month, year) {
  // Set the month and year in the header
  monthYearDisplay.textContent = `${getMonthName(month)} ${year}`;

  // Clear any existing cells
  calendarGrid.innerHTML = '';

  // Generate the days for the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day-cell');
    dayCell.textContent = day;

    // Check if this day has an event and add a dot
    const hasEvent = events.some(event => 
      event.startDate.getDate() === day &&
      event.startDate.getMonth() === month &&
      event.startDate.getFullYear() === year
    );
    if (hasEvent) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dayCell.appendChild(dot);
    }

    dayCell.addEventListener('click', () => showDayEvents(day, month, year));
    calendarGrid.appendChild(dayCell);
  }
}

// Show events for the selected day
function showDayEvents(day, month, year) {
  eventList.innerHTML = ''; // Clear previous events

  // Get the events for the selected day
  const dayEvents = getEventsForDay(day, month, year);
  
  dayEvents.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.textContent = event.title; // Add your event details here
    eventList.appendChild(eventCard);
  });
}

// Get month name from index
function getMonthName(monthIndex) {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames[monthIndex];
}

// Initialize the calendar for the current month
const today = new Date();
generateCalendar(today.getMonth(), today.getFullYear());




async function getMessages() {
  try {
      const response = await fetch('http://localhost:3000/api/messages');
      
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const messages = await response.json();

      // Clear the messages display areas
      const messagesContainer = document.getElementById('messagesContainer');
      messagesContainer.innerHTML = ''; // Clear previous messages
      
      // Update the messagesContainer with formatted cards
      messages.forEach(message => {
          // For messagesContainer (as formatted cards)
          const messageCard = document.createElement('div');
          messageCard.classList.add('message-card'); // Add a class for styling

          // Add content to the card
          messageCard.innerHTML = `
              <h3>${message.username}</h3>
              <p>${message.content}</p>
              <small>${new Date(message.timestamp).toLocaleString()}</small>
          `;
          messagesContainer.appendChild(messageCard);
      });
  } catch (error) {
      console.error('Error fetching messages from backend:', error);
  }
}

