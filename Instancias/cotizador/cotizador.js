window.onload=function(){
    $(".registro").click(sumar);
    $("#vistas").click(r1Limpiar);

}

function sumar(){
    let suma =0;
    let r1 = document.getElementById("r1");
    for(var cont = 1; cont < 7 ; cont++){
        let lorem = (document.getElementById(`lorem${cont}`));
        let valor = Number((document.getElementById(`pr${cont}`)).value);
        let cantidad = Number((document.getElementById(`ct${cont}`)).value);
        let calculo = valor * cantidad;
        suma+=calculo;
        lorem.innerHTML = `$${calculo} CLP`
    }
    r1.innerHTML= `$ ${suma}  CLP`;
}

function r1Limpiar(){
    let r1 = document.getElementById("r1");
    for(var cont = 1; cont < 7 ; cont++){
        let lorem = (document.getElementById(`lorem${cont}`));
        let valor = (document.getElementById(`pr${cont}`));
        let cantidad = (document.getElementById(`ct${cont}`));
        lorem.innerHTML = `---`
        valor.value="";
        cantidad.value="";
    }
    r1.innerHTML= `-><-`;
}