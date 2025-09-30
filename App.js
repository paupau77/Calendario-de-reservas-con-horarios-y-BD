const monthYearEl = document.getElementById('month-year');
const daysEl = document.getElementById('days');
const prevBtn = document.getElementById('prev-month');
const nextBtn = document.getElementById('next-month');
const reserveBtn = document.getElementById('reserve-btn');
const hoursSection = document.getElementById('hours-section');
const hoursList = document.getElementById('hours-list');
const selectedDateDisplay = document.getElementById('selected-date-display');
let currentDate = new Date();
let selectedDate = null;
let selectedHour = null;
// Horas disponibles para reservar
const availableHours = [];
for(let h = 0; h < 24; h++) {
  availableHours.push(h.toString().padStart(2,'0') + ":00");
}
let reservedSlots = [
  { date: '2025-10-05', hour: '09:00' },
  { date: '2025-10-12', hour: '14:00' },
  { date: '2025-10-18', hour: '11:00' },
  { date: '2025-10-25', hour: '16:00' }
];
// Fechas reservadas para bloquear días completos
const reservedDates = [
  '2025-10-05',
  '2025-10-12',
  '2025-10-18',
  '2025-10-25'
];
function renderCalendar(date) {
  daysEl.innerHTML = '';
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  monthYearEl.textContent = `${monthNames[month]} ${year}`;
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 7 : startDay;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i < startDay; i++) {
    const emptyDiv = document.createElement('div');
    daysEl.appendChild(emptyDiv);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    const fullDateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    dayDiv.textContent = day;
    // Bloquear día si está totalmente reservado
    if (reservedDates.includes(fullDateStr)) {
      dayDiv.classList.add('reserved');
    } else {
      dayDiv.addEventListener('click', () => {
        document.querySelectorAll('.day.selected').forEach(el => el.classList.remove('selected'));
        dayDiv.classList.add('selected');
        selectedDate = fullDateStr;
        selectedHour = null;
        reserveBtn.disabled = true;
        selectedDateDisplay.textContent = fullDateStr;
        renderHours(fullDateStr);
        hoursSection.style.display = 'block';
      });
    }
    daysEl.appendChild(dayDiv);
  }
  selectedDate = null;
  selectedHour = null;
  reserveBtn.disabled = true;
  hoursSection.style.display = 'none';
  hoursList.innerHTML = '';
}
function renderHours(date) {
  hoursList.innerHTML = '';
  availableHours.forEach(hour => {
    const hourDiv = document.createElement('div');
    hourDiv.classList.add('hour');
    hourDiv.textContent = hour;
    // Bloquear hora si ya reservada para esa fecha
    if (reservedSlots.some(slot => slot.date === date && slot.hour === hour)) {
      hourDiv.classList.add('reserved');
    } else {
      hourDiv.addEventListener('click', () => {
        document.querySelectorAll('.hour.selected').forEach(el => el.classList.remove('selected'));
        hourDiv.classList.add('selected');
        selectedHour = hour;
        reserveBtn.disabled = false;
      });
    }
    hoursList.appendChild(hourDiv);
  });
}
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});
nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});
reserveBtn.addEventListener('click', async () => {
  if (selectedDate && selectedHour) {
    try {
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: selectedDate, hour: selectedHour })
      });
      if (response.ok) {
        alert(`Reserva exitosa para ${selectedDate} a las ${selectedHour}`);
        reservedSlots.push({ date: selectedDate, hour: selectedHour });
        // bloquear el día si todas las horas están reservadas
        const hoursReservadasEnDia = reservedSlots.filter(s => s.date === selectedDate).length;
        if (hoursReservadasEnDia >= availableHours.length) {
          reservedDates.push(selectedDate);
        }
        renderCalendar(currentDate);
        hoursSection.style.display = 'none';
        reserveBtn.disabled = true;
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      alert('Error conectando con el servidor.');
      console.error(error);
    }
  }
});
renderCalendar(currentDate);
