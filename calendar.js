window.onload = function () {
    console.log("Page loaded"); // Debugging line
    populateDropdown();
};

document.getElementById("calendar-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("calendar-id").value.trim();
    const name = document.getElementById("calendar-name").value.trim();

    if (!id || !name) return;

    let calendars = JSON.parse(localStorage.getItem("savedCalendars")) || [];
    calendars.push({ id, name });
    localStorage.setItem("savedCalendars", JSON.stringify(calendars));

    document.getElementById("calendar-id").value = '';
    document.getElementById("calendar-name").value = '';

    populateDropdown();
});

function populateDropdown() {
    const select = document.getElementById("saved-calendars");
    select.innerHTML = '<option selected disabled>Select a calendar</option>';

    let calendars = JSON.parse(localStorage.getItem("savedCalendars")) || [];

    calendars.forEach(cal => {
        const option = document.createElement("option");
        option.value = cal.id;
        option.textContent = cal.name;
        select.appendChild(option);
    });

    if (calendars.length > 0) {
        select.selectedIndex = 1;
    }

    loadCalendar();
}

function loadCalendar() {
    const select = document.getElementById("saved-calendars");
    let selectedCalendar = select.options[select.selectedIndex].value;

    const calendar_iframe = document.getElementById("calendar-iframe");

    const deleteBtn = document.getElementById("delete-calendar");


    if (select.selectedIndex === 0) {
        deleteBtn.disabled = true;

        calendar_iframe.src = "";
    } else {
        deleteBtn.disabled = false;

        selectedCalendar.replace(/@/g, "%40");
        calendar_iframe.src = `https://calendar.google.com/calendar/embed?src=${selectedCalendar}&ctz=America/New_York`;
    }
}

function deleteCalendar() {
    const select = document.getElementById("saved-calendars");
    let selectedCalendar = select.options[select.selectedIndex].value;
    let selectedCalendarName = select.options[select.selectedIndex].textContent;

    let confirmed = confirm(`Are you sure you want to delete the follow ing calendar: ${selectedCalendarName}?`);

    if (confirmed) {
        let calendars = JSON.parse(localStorage.getItem("savedCalendars")) || [];
        calendars = calendars.filter(cal => cal.id !== selectedCalendar);

        localStorage.setItem("savedCalendars", JSON.stringify(calendars));
        populateDropdown(); // Refresh dropdown after deletion
    }
}


