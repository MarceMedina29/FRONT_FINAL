//GET, POST , PUT Y DELETE

function getCategoria (){
    $.ajax({
        url:"http://138.2.233.157:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
            pintarCategoria(respuesta);
        }
    });

}

function postCategoria(){

    if($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Category/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se creo correctamente la categoria");
            window.location.reload();
    
            }
        });
    }
}

function putCategoria(idDesdeBoton){
    console.log(idDesdeBoton);
    if($("#name").val().length==0 || $("#description").val().length==0 ){
        alert("Todos los campos son obligatorios");
    }else{
    
    let cajas = {
        id:idDesdeBoton,
        name:$("#name").val(),
        description:$("#description").val()
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Category/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se actualizo correctamente la informacion de la categoria");
            window.location.reload();
    
            }
        });
    }
    

}

function deleteCategoria(idDesdeBoton){
  
    let myData={
        id:idDesdeBoton
    };
    $.ajax({
        url:"http://138.2.233.157:8080/api/Category/"+idDesdeBoton,
        type:"DELETE",
        datatype:"JSON",
        data: JSON.stringify(myData),
        contentType:"application/json",
        success:function(respuesta){
            alert("Se borro correctamente la categoria");
            window.location.reload();
        }
    });

}

////////////////////////////////////////////

function pintarCategoria(respuesta){
    //console.log(respuesta);
    let myTable='<table class="table-auto w-full table-center text-center whitespace-w-48">';
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td> <button class='mx-auto text-white bg-blue-700 border-0 py-1 px-7 focus:outline-none hover:bg-gray-400 rounded text-lg' onclick='putCategoria("+respuesta[i].id+") '> Actualizar</button>"
        myTable+="<td> <button class='mx-auto text-white bg-blue-700 border-0 py-1 px-7 focus:outline-none hover:bg-gray-400 rounded text-lg' onclick='deleteCategoria("+respuesta[i].id+")'> Borrar</button>"
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);


}