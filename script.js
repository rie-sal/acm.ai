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

const calendarId = 'bea3c558d615d9630b391ba92fabb971797e17114d92bbd6330111ebf1d8c8d8@group.calendar.google.com'; // Replace with public Google Calendar ID
const x = 'AIzaSyCue1NQWTFKdp6Gm8wjLwIP9BurAFoHN5Y';

// Construct URL to fetch public events from the calendar
const googleCalendarUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${x}`;

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

  // Function to format date
  function formatDateTime(date) {
    // Get the weekday, month, and day separately
    const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
    const month = date.toLocaleDateString(undefined, { month: 'long' });
    const day = date.getDate(); // Use getDate() to get the numeric day
  
    // Add the ordinal suffix to the day
    const dayWithSuffix = day + getOrdinalSuffix(day);
  
    // Format the time
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);
  
    // Combine parts into the desired format
    return `${weekday}, ${month} ${dayWithSuffix} at ${formattedTime}`;
  }
  
  // Function to get ordinal suffix
  function getOrdinalSuffix(day) {
    if (day > 3 && day < 21) return 'th'; // Covers 11th to 19th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  // Loop through the events and create a card for each
  dayEvents.forEach(event => {
    const eventCard = document.createElement('div');
    eventCard.classList.add('event-card');

    // Extract and format date and time
    const startDateTime = formatDateTime(new Date(event.startDate));
    const endDateTime = formatDateTime(new Date(event.endDate));
    
    // Add content for each field
    eventCard.innerHTML = `
      <h3>${event.title || 'Untitled Event'}</h3>
      <p>${startDateTime}</p>
      <p><strong>Location:</strong> ${event.location || 'No location provided'}</p>
    `;
    // <p><strong>Description:</strong> ${event.description || 'No description available'}</p> 

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
      const x = 'AIzaSyCue1NQWTFKdp6Gm8wjLwIP9BurAFoHN5Y'; 
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${x}`;

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
