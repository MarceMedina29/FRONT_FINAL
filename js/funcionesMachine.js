//GET, POST , PUT Y DELETE

function getMachine (){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarMachine(respuesta);
        }
    });

}

function postMachine(){

    if($("#name").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 || $("#description").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://138.2.233.157:8080/api/Machine/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la maquina");
            window.location.reload();
    
        }
    });
    }
}

function putMachine(idDesdeBoton){
    console.log(idDesdeBoton);
    if($("#name").val().length==0 || $("#brand").val().length==0 || $("#year").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    let cajas = {
        id:idDesdeBoton,
        name:$("#name").val(),
        brand:$("#brand").val(),
        year:$("#year").val(),
        description:$("#description").val(),
        category:{id: +$("#select-categoria").val()}
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Machine/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizo correctamente la correctamente la maquina");
            window.location.reload();
        }
    });
    }
}

function deleteMachine(idDesdeBoton){
   
    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Machine/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("Se borro correctamente la maquina");
            window.location.reload();
        }
    });

}

////////////////////////////////////////////////////////

function pintarMachine(json_maquinas){
    let myTable='<table class="table-auto w-full table-center text-center whitespace-w-48">';
    for(i=0;i<json_maquinas.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+json_maquinas[i].name+"</td>";
        myTable+="<td>"+json_maquinas[i].brand+"</td>";
        myTable+="<td>"+json_maquinas[i].year+"</td>";
        myTable+="<td>"+json_maquinas[i].description+"</td>";
        myTable+="<td>"+json_maquinas[i].category.name+"</td>";
        myTable+="<td> <button class='mx-auto text-white bg-blue-700 border-0 py-1 px-7 focus:outline-none hover:bg-gray-400 rounded text-lg' onclick='putMachine("+json_maquinas[i].id+") '> Actualizar</button>"
        myTable+="<td> <button class='mx-auto text-white bg-blue-700 border-0 py-1 px-7 focus:outline-none hover:bg-gray-400 rounded text-lg' onclick='deleteMachine("+json_maquinas[i].id+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultadoMachine").html(myTable);
}

function getCategoria_Machine(){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-categoria");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
}