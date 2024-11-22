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

const calendarId = 'bea3c558d615d9630b391ba92fabb971797e17114d92bbd6330111ebf1d8c8d8@group.calendar.google.com'; // Replace with your public Google Calendar ID
const apiKey = 'AIzaSyCue1NQWTFKdp6Gm8wjLwIP9BurAFoHN5Y';

// Construct URL to fetch public events from the calendar
const googleCalendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}`;

fetch(googleCalendarUrl)
  .then(response => response.json())
  .then(data => parseGoogleCalendarEvents(data))
  .catch(error => console.error('Error fetching Google Calendar events:', error));

// Parse Google Calendar events into your events array
function parseGoogleCalendarEvents(data) {
  events.length = 0; // Clear the global array

  data.items.forEach(item => {
    const startDate = new Date(item.start.dateTime || item.start.date);
    const endDate = new Date(item.end.dateTime || item.end.date);

    events.push({
      title: item.summary,
      description: item.description,
      startDate: startDate,
      endDate: endDate,
    });
  });

  console.log(events); // Array of event objects
  populateCalendar(events); // Now this function will work
}

// Populate the calendar grid with events
function populateCalendar(events) {
  const today = new Date();
  generateCalendar(today.getMonth(), today.getFullYear());
}

// Check if a specific day has any event
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
  monthYearDisplay.textContent = `${getMonthName(month)} ${year}`;

  calendarGrid.innerHTML = '';

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('day-cell');
    dayCell.textContent = day;

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
  eventList.innerHTML = '';

  const dayEvents = getEventsForDay(day, month, year);
  
  dayEvents.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');
    eventCard.textContent = event.title;
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