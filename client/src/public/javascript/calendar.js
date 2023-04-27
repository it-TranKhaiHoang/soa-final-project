document.addEventListener('DOMContentLoaded', function () {
    initStudentCalendar();
});
function initStudentCalendar() {
    var calendarEl = document.getElementById('calendar');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'timeGridWeek',
        initialDate: formattedDate,
        navLinks: true, // can click day/week names to navigate views
        nowIndicator: true,

        weekNumbers: true,
        weekNumberCalculation: 'ISO',

        editable: true,
        selectable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
            // {
            //     title: 'All Day Event',
            //     start: '2023-04-04',
            // },
            // {
            //     title: 'Chào cờ',
            //     daysOfWeek: [1],
            //     startTime: '07:00:00',
            //     endTime: '08:00:00',
            //     startRecur: '2023-04-24T01:00:00',
            //     endRecur: '2023-08-20T09:00:00',
            //     id: '1123123123',
            // },
            // {
            //     title: 'Toán',
            //     daysOfWeek: [1],
            //     startTime: '08:00:00',
            //     endTime: '09:00:00',
            //     startRecur: '2023-04-24T01:00:00',
            //     endRecur: '2023-08-20T09:00:00',
            //     id: '1123123123',
            // },
            // {
            //     title: 'Tập đọc',
            //     daysOfWeek: [1],
            //     startTime: '09:30:00',
            //     endTime: '10:30:00',
            //     startRecur: '2023-04-24T01:00:00',
            //     endRecur: '2023-08-20T09:00:00',
            //     id: '1123123123',
            // },
            // {
            //     title: 'Thể dục',
            //     daysOfWeek: [1],
            //     startTime: '11:00:00',
            //     endTime: '11:30:00',
            //     startRecur: '2023-04-24T01:00:00',
            //     endRecur: '2023-08-20T09:00:00',
            //     id: '1123123123',
            // },
        ],
        eventClick: function (info) {
            // alert('Event: ' + info.event.id);
            // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
            // alert('View: ' + info.view.type);
            // // change the border color just for fun
            // info.el.style.borderColor = 'red';
        },
    });
    const classID = $('#ClassID').val();
    calendar.render();
    $.ajax({
        url: `http://localhost:8080/api/schedule/${classID}`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            if (!data) {
                console.log('err');
            } else {
                console.log(data);
                data.map((p) => {
                    const subject = p.subject;
                    calendar.addEvent({
                        title: subject.name,
                        daysOfWeek: [`${p.dayOfWeek}`],
                        startTime: `${p.startTime}:00`,
                        endTime: `${p.endTime}:00`,
                        startRecur: p.startAt,
                        endRecur: p.endAt,
                        id: p._id,
                    });
                });
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log('Error in Operation');
        },
    });
}

function initPrincipleCalendar() {
    var calendarEl = document.getElementById('calendar1');
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10);
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        },
        initialView: 'timeGridWeek',
        initialDate: formattedDate,
        navLinks: true, // can click day/week names to navigate views
        nowIndicator: true,

        weekNumbers: true,
        weekNumberCalculation: 'ISO',

        editable: true,
        selectable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2023-04-04',
            },
            {
                title: 'Long Event',
                start: '2023-04-07',
                end: '2023-04-10',
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2023-04-09T16:00:00',
            },
            {
                groupId: 999,
                title: 'Repeating Event',
                start: '2023-04-16T16:00:00',
            },
            {
                title: 'Conference',
                start: '2023-04-11',
                end: '2023-04-13',
            },
            {
                title: 'Meeting',
                start: '2023-04-12T10:30:00',
                end: '2023-04-12T12:30:00',
            },
            {
                title: 'Lunch',
                start: '2023-04-12T12:00:00',
            },
            {
                title: 'Meeting',
                start: '2023-04-12T14:30:00',
            },
            {
                title: 'Meeting',
                start: '2023-04-12T14:30:00',
            },
            {
                title: 'Happy Hour',
                start: '2023-04-12T17:30:00',
            },
            {
                title: 'Dinner',
                start: '2023-04-12T20:00:00',
            },
            {
                title: 'Birthday Party',
                start: '2023-04-13T07:00:00',
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2023-04-28',
            },
        ],
    });

    calendar.render();
}
