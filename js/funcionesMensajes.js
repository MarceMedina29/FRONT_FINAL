//GET, POST , PUT Y DELETE

function getMensajes (){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarMensajes(respuesta);
        }
    });
}

function postMensajes(){

    if($("#messageText").val().length==0 || $("#select-client").val().length==0 || $("#select-machine").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        messageText:$("#messageText").val(),
        client:{idClient: +$("#select-client").val()},
        machine:{id: +$("#select-machine").val()}
        
    };
    console.log(cajas);
    $.ajax({
        url:"http://138.2.233.157:8080/api/Message/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se creo correctamente el mensaje");
            //window.location.reload();
    
        }
    });
    }
}

function putMensajes(idDesdeBoton){
    console.log(idDesdeBoton)
    if($("#messageText").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{

    let cajas = {
        messageText:$("#messageText").val(),
       
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Message/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizo correctamente el mensaje");
            window.location.reload();
    
        }
    });
    }

}

function deleteMensajes(idDesdeBoton){

    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Message/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("Se borro correctamente el mensaje");
            window.location.reload();
        }
    });
    
}


////////////////////////////////////////////

function pintarMensajes(respuesta){
   
    let myTable='<table class="table-auto w-50 table-left text-center whitespace-w-80">';
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td> <button class='mx-20 text-white bg-blue-700 border-0 py-1 px-7 focus:outline-none hover:bg-gray-400 rounded text-lg' onclick='putMensajes("+respuesta[i].idMessage+") '> Actualizar</button>"
        myTable+="<td> <button class='mx-20 text-white bg-blue-700 border-0 py-1 px-7 focus:outline-none hover:bg-gray-400 rounded text-lg' onclick='deleteMensajes("+respuesta[i].idMessage+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);


}

function getMachine_Message(){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Machine/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-machine");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.id+'>'+name.name+'</option>' )
            })
        }
    });
}

function getClient_Message(){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-client");
            $.each(respuesta, function(id, name){
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>' )
            })
        }
    });
}