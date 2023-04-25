$(document).ready(function () {
    const page = ['classroom', 'teacher', 'schedule', 'announcement', 'scoreboard', 'attendance'];
    for (const i of page) {
        if (location.pathname.split(i).length == 2) {
            $(`#${i}`).addClass('active');
            break;
        }
    }
    $('#ListStudentTable').DataTable({
        columnDefs: [
            {
                targets: 3,
                render: DataTable.render.datetime('Do MMM YYYY'),
            },
        ],
    });
    $('#listStudentInClass').DataTable({
        columnDefs: [
            {
                targets: 3,
                render: DataTable.render.datetime('Do MMM YYYY'),
            },
        ],
    });
    $('#listStudentFree').DataTable({
        columnDefs: [
            {
                targets: 3,
                render: DataTable.render.datetime('Do MMM YYYY'),
            },
        ],
    });
    $('#listPrincipalAnnouncement').DataTable({
        columnDefs: [
            {
                targets: 3,
                render: DataTable.render.datetime('Do MMM YYYY'),
            },
        ],
    });
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
    });
});

$(document).ready(function () {
    let table = $('#listStudentCheckAttend').DataTable({
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
                    const list = table.rows({ selected: false }).data().toArray();
                    const idList = list.map((item) => item[1]);
                    console.log(list);
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
    });
});

$('#listTeacher').DataTable({ columnDefs: [{ targets: 3, render: DataTable.render.datetime('Do MMM YYYY') }] });
