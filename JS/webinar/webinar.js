function estamosaqui(){
    console.log("estamos aquí 4")
    console.log("Config Webinar 2022 para masterbase")
    $("#hola").click(testers);
    $("#guardar").click(save);

}

function testers(){
    
    console.log("holap");
    $("#control").toggleClass("nolanding");
    $(".cover").toggleClass("nolanding"); 
    
}

function enlace(){
  console.log("abrir enlace");
  $(".logo").click(function(){ 
    // location.href="https://masterbase.com"; 
    window.open("https://masterbase.com"); 
    return false; 
  }); 
}

async function loading(){
  try {
    let url = window.location.pathname;
    let appId = url.split('/');
    let pathname = appId[appId.length - 1]
    // let urlTyp = document.getElementById("urlTyp");
    // urlTyp.value = url;
    // console.log(urlTyp);


    let docName= document.getElementById("docName");
    let tName = document.getElementById("titulo");
    let parrCont = document.getElementById("parr-cont");
    let listaAprenda1 = document.getElementById("aprenda");

    let parrafoFinal= document.createDocumentFragment();
    let razonesFinal= document.createDocumentFragment();
    // el detail es la funcion que esta en el ondemand ojo! importante
    let { data } = await functionOnDemand("detail", { pathname });
    console.log(pathname);
    console.log(data);

    docName.innerText = data.info.titulo;
    tName.innerText = data.info.titulo;

    Object.entries(data.info.parrafos).forEach(item => {
      let nuevoP = document.createElement('p');
      nuevoP.append(item[1].parrafo);
      parrafoFinal.append(nuevoP);
    });

    Object.entries(data.info.aprenda).forEach(item => {
      let nuevoLi = document.createElement('li');
      nuevoLi.innerHTML = `<img src="https://cdn2.hubspot.net/hubfs/37780/check-5.png" alt=""> ${item[1].aprenda}` 
      razonesFinal.append(nuevoLi);
    });

    parrCont.append(parrafoFinal);
    listaAprenda1.append(razonesFinal);
    


  } catch (error) {
    console.log(error);
  }
};
     
async function save(){
  let formChk = document.getElementById("formDetail");
  let urlTyp = document.getElementById("urlTyp");

  let formData = new FormData(formChk);   
  let values = Object.fromEntries(formData.entries()); 

  console.log(formData);
  console.log(values);

  try {
    let {data} = await functionOnDemand("save", {  data: values });
    // let typ = window.location.href = "https://publicsmartview.masterbase.com/v1/620324fe39671200181f9d8a/" + urlTyp.value;
    console.log("values", values, data);
   


  } catch (error) {
    console.log(error);
  }
}


// ---------------------------
async function save2() {
  const emailChk = document.getElementById("email");
  const nombreChk = document.getElementById("nombre");
  const apellidoChk = document.getElementById("apellido");
  const paisChk = document.getElementById("pais");
  const empresaChk = document.getElementById("empresa");
  const proximacompraChk = document.getElementById("proximacompra");
  const formChk = document.getElementById("formDetail");

  // campo oculto por settear
  const urlTyp = document.getElementById("urlTyp");

    // campo privacidad valor "on"    deb haber un off
    // campo formName valor "webinar"
    // campo nombreEbook adaptar a nombreWebinar igual al titulo
    
    // campo IDmail se genera solo por el aod
    // campo Estado valor estadoFue se genera en el aod


    // idear forma de validar datos con el mismo aod o desde js, algun condicional o switch

  if (!formChk.checkValidity()) {
    document.getElementById("email-validate").innerHTML = emailChk.validationMessage;
    document.getElementById("nombre-validate").innerHTML = nombreChk.validationMessage;
    document.getElementById("apellido-validate").innerHTML = apellidoChk.validationMessage;
    document.getElementById("pais-validate").innerHTML = paisChk.validationMessage;
    document.getElementById("empresa-validate").innerHTML = empresaChk.validationMessage;
    document.getElementById("proximacompra-validate").innerHTML = proximacompraChk.validationMessage;
  } else {
    try {
      // Se crea un objecto FormData en base a el formulario de detalle
      const formData = new FormData(document.getElementById("formDetail")); // Se obtienes todas las entradas(campos del formulario) desde el objeto formData y se convierten a una objecto key/value.

      const values = Object.fromEntries(formData.entries()); // Se llama a la función AOD "save" y se le pasa el objecto con los valores.

      const {data} = await functionOnDemand("save", {  data: values    });
      const typ = window.location.href = "https://publicsmartview.masterbase.com/v1/620324fe39671200181f9d8a/" + urlTyp.value;
      console.log("values", values, data);
    } 
    
    catch (error) {
      console.error(error);
    }
  }
}



window.onload= function(){
  estamosaqui(); 
  loading();
  enlace();
};