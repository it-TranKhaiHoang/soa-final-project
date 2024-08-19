$(document).ready(function () {
    const page = ['classroom', 'teacher', 'schedule', 'announcement', 'scoreboard', 'attendance','student','subject'];
    for (const i of page) {
        if (location.pathname.split(i).length == 2) {
            $(`#${i}`).addClass('active');
            break;
        }
    }
    // $('#ListStudentTable').DataTable({
    //     columnDefs: [
    //         {
    //             targets: 3,
    //             render: DataTable.render.datetime('Do MMM YYYY'),
    //         },
    //     ],
    //     scrollX: true,
    // });
    // $('#listStudentInClass').DataTable({
    //     columnDefs: [
    //         {
    //             targets: 3,
    //             render: DataTable.render.datetime('Do MMM YYYY'),
    //         },
    //     ],
    //     scrollX: true,
    // });
    // $('#listStudentFree').DataTable({
    //     columnDefs: [
    //         {
    //             targets: 3,
    //             render: DataTable.render.datetime('Do MMM YYYY'),
    //         },
    //     ],
    //     scrollX: true,
    // });
    // $('#listPrincipalAnnouncement').DataTable({
    //     columnDefs: [
    //         {
    //             targets: 3,
    //             render: DataTable.render.datetime('Do MMM YYYY'),
    //         },
    //     ],
    //     scrollX: true,
    // });
    let table = $('#listTeacherSent').DataTable({
        dom: 'Bfrtip',
        select: true,
        buttons: [
            {
                text: 'Select all',
                action: function () {
                    table.rows().select();
                },
            },
            {
                text: 'Select none',
                action: function () {
                    table.rows().deselect();
                },
            },
            {
                text: 'Save data',
                action: function () {
                    let listParent = table.rows({ selected: true }).data().toArray();
                    let arrayID = [];
                    listParent.forEach((item) => {
                        arrayID.push(item[4]);
                    });
                    let stringID = arrayID.join(',');
                    console.log(stringID);
                    $('#sendTo').val(stringID);
                },
            },
        ],
        columnDefs: [
            {
                orderable: false,
                className: 'select-checkbox',
                targets: 0,
            },
        ],
        select: {
            style: 'os',
            selector: 'td:first-child',
        },
        order: [[1, 'asc']],
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
        scrollX: true,
    });
});

$(document).ready(function () {
    let table = $('#listParentSent').DataTable({
        dom: 'Bfrtip',
        select: true,
        buttons: [
            {
                text: 'Select all',
                action: function () {
                    table.rows().select();
                },
            },
            {
                text: 'Select none',
                action: function () {
                    table.rows().deselect();
                },
            },
            {
                text: 'Save data',
                action: function () {
                    let listParent = table.rows({ selected: true }).data().toArray();
                    let arrayID = [];
                    listParent.forEach((item) => {
                        arrayID.push(item[5]);
                    });
                    let stringID = arrayID.join(',');
                    $('#sendTo').val(stringID);
                    console.log(stringID);
                },
            },
        ],
        columnDefs: [
            {
                orderable: true,
                className: 'select-checkbox',
                targets: 0,
            },
        ],
        select: {
            style: 'os',
            selector: 'td:first-child',
        },
        order: [[1, 'asc']],
        lengthMenu: [5, 10, 20, 50, 100, 200, 500],
        scrollX: true,
    });

    table = $('#listStudentCheckAttend').DataTable({
        dom: 'Bfrtip',
        select: true,
        buttons: [
            {
                text: 'Select all',
                action: function () {
                    table.rows().select();
                },
            },
            {
                text: 'Select none',
                action: function () {
                    table.rows().deselect();
                },
            },
            {
                text: 'Save data',
                action: function () {
                    const list = table.rows({ selected: true }).data().toArray();
                    const idList = list.map((item) => item[1]);

                    fetch('http://localhost:8080/api/attend/create', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            classid: $('#class-id').html(),
                        },
                        body: JSON.stringify({
                            students: idList,
                            description: $('#note-inp').val(),
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => location.reload())
                        .catch((error) => console.error(error));
                },
            },
        ],
        columnDefs: [
            {
                orderable: false,
                className: 'select-checkbox',
                targets: 0,
            },
        ],
        select: {
            style: 'os',
            selector: 'td:first-child',
        },
        order: [[1, 'asc']],
        scrollX: true,
    });
    table.rows($('.item-selected')).select();
    $('.dt-button').addClass('btn btn-primary mb-2');
    $('.dt-button').removeClass('dt-button');
});

$('#listTeacher').DataTable({ columnDefs: [{ targets: 3, render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#subject-grade1st').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#subject-grade2nd').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#subject-grade3rd').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#subject-grade4th').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#subject-grade5th').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });

$('#student-grade1st').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#student-grade2nd').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#student-grade3rd').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#student-grade4th').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });
$('#student-grade5th').DataTable({ columnDefs: [{ render: DataTable.render.datetime('Do MMM YYYY') }] });