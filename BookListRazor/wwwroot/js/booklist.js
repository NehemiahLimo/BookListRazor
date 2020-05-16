var dataTables;
$(document).ready(function () {
    loadDataTable();
})

function loadDataTable() {
    dataTables = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class = "text-center">
                    <a href="/BookList/Upsert?id=${data}" class='btn btn-success text-white' style='cursor: pointer; width:100px;'>
                    Edit </a>
                    &nbsp;
                     <a  class='btn btn-danger text-white' 
                       onClick=Delete('/api/book?id='+${data})         style='cursor: pointer; width:100px;'>
                    Delete </a>
                    
                    </div >`;
                }, "width": "30%"
            }
        ],
        "language": {
            "emptyTable": "no data found"
        },
        "width": "100%"
    });
}

function Delete(url) {
    swal({
        title: "Are you Sure?",
        text: "Once deleted, Can not be retrieved",
        icon: "warning",
        buttons: true,
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTables.ajax.reload();
                    }
                    else {
                        toastr.error(data.message);
                    }
                    
                }
                
            })
        }
    })
}
