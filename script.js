// script.js

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
      title: item.summary || 'Untitled Event',
      description: item.description || 'No description available',
      startDate: startDate,
      endDate: endDate,
      location: item.location || 'No location provided', // Safeguard for missing location
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
  
  // Determine the first day of the month and number of days in the month
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Add blank cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const blankCell = document.createElement('div');
    blankCell.classList.add('day-cell', 'blank-cell');
    calendarGrid.appendChild(blankCell);
  }
  
  // Add cells for each day of the month
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
  eventList.innerHTML = ''; // Clear the event list

  // Get events for the specified day
  const dayEvents = getEventsForDay(day, month, year);

  // Loop through the events and create a card for each
  dayEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.classList.add('event-card');

      // Extract date and time
      const startDateTime = event.startDate.toLocaleString();
      const endDateTime = event.endDate.toLocaleString();
      
      // Add content for each field
      eventCard.innerHTML = `
          <h3>${event.title || 'Untitled Event'}</h3>
          <p><strong>Date:</strong> ${startDateTime} - ${endDateTime}</p>
          <p><strong>Location:</strong> ${event.location || 'No location provided'}</p>
          <p><strong>Description:</strong> ${event.description || 'No description available'}</p>
      `;

      // Append the event card to the event list container
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
      const sheetId = '1tWv937PlgSXhMgkpQQYb-U9NJl4X73Pnzl7PyNbLREQ';
      const range = 'Sheet1!A:E';
      const apiKey = 'AIzaSyCue1NQWTFKdp6Gm8wjLwIP9BurAFoHN5Y'; 
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const rows = data.values || [];
      const messagesContainer = document.getElementById('messagesContainer');
      messagesContainer.innerHTML = '';

      if (rows.length <= 1) {
          messagesContainer.innerHTML = `<p>No messages available.</p>`;
          return;
      }

      rows.slice(1).forEach(row => {
          const [messageContent = 'No content', messageSender = 'Anonymous', messageSendTime = '', messageSendDate = '', senderIcon = 'default-icon.png'] = row;
          const timestamp = messageSendDate && messageSendTime 
              ? new Date(`${messageSendDate} ${messageSendTime}`).toLocaleString() 
              : 'Invalid date/time';

          const messageRow = document.createElement('div');
          messageRow.classList.add('message-row');

          messageRow.innerHTML = `
              <div class="sender-icon">
                  <img src="${senderIcon}" alt="${messageSender}'s Icon" />
              </div>
              <div class="message-details">
                  <h3>${messageSender}</h3>
                  <small>${timestamp}</small>
                  <p>${messageContent}</p>
              </div>
          `;

          messagesContainer.appendChild(messageRow);
      });
  } catch (error) {
      console.error('Error fetching messages from Google Sheets:', error);
  }
}