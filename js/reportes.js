function traerReporteStatus(){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Reservation/report-status",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarStatus(respuesta);
        }
    });
}

function pintarStatus(json_maquinas){
    
    let myTable = '<table class="table-auto w-full table-center text-center whitespace-w-48">';

        myTable += "<tr>";
        myTable += "<td>" + "Reservas completa: " + json_maquinas.completed + "</td>";
        myTable += "</tr>";
        myTable += "<tr>";
        myTable += "<td>" + "Reservas cancelada: " + json_maquinas.cancelled + "</td>";
        myTable += "</tr>";
     
    myTable += "</table>";
    $("#resultado1").html(myTable);
}

function traerReportesFechas(){
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();

    console.log(startDate, endDate)

    $.ajax({
        url:`http://138.2.233.157:8080/api/Reservation/report-dates/${startDate}/${endDate}`,
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarFechas(respuesta);
        }
    });
}


function pintarFechas(respuesta){

    let completadas = 0;
    let canceladas = 0;

    for(let i = 0; i < respuesta.length; i++){
        if(respuesta[i].status == "cancelled"){
            canceladas++;
            console.log(`Reservas canceladas: ${canceladas}`)
        }else if(respuesta[i].status == "completed"){
            completadas++;
            console.log(`Reservas completas: ${completadas}`)
        }
    }

    let myTable = '<table class="table-auto w-full table-center text-center whitespace-w-48">';

        myTable += "<tr>";
        myTable += "<td>" + "Reservas completas: " + completadas + "</td>";
        myTable += "</tr>";
        myTable += "<tr>";
        myTable += "<td>" + "Reservas canceladas: " + canceladas + "</td>";
        myTable += "</tr>";
    
        
    myTable += "</table>";
    $("#resultado2").html(myTable);
}

function traerReportesClientes(){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Reservation/report-clients",
        type: "GET",
        datatype: "JSON",
        success:function(respuesta){
            console.log(respuesta)
            pintarClientes(respuesta);
        }
    });
}

function pintarClientes(respuesta){

    let myTable = '<table class="table-auto w-full table-center text-center whitespace-w-48">';
    for(let i = 0; i < respuesta.length; i++){
        myTable += "<tr>";
        myTable += `<td>ID: +${respuesta[i].idClient}+ </td>`
        myTable += "<tr>"
        myTable += `<td>Nombre:+${respuesta[i].name}+ </td>`
        myTable += "<tr>"
        myTable += `<td>Email:+${respuesta[i].email}+ </td>`
        myTable += "<tr>"
        myTable += `<td>Contraseña: +${respuesta[i].password}+ </td>`
        myTable += "<tr>"
        myTable += `<td>Edad: +${respuesta[i].age}, </td>`
        myTable += "<tr>"
        myTable += `<td>Reservas totales: +${respuesta[i].total}+</td>`
        myTable += "</tr>";
    } 
    myTable += "</table>";
    $("#resultado3").html(myTable);

}