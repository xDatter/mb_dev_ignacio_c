function estamosaqui(){
    console.log("estamos aquí")
    console.log("Config Webinar 2022 para masterbase")
    $("#hola").click(testers);

}

function testers(){
    
    console.log("holap");
    $("#control").toggleClass("nolanding");
    $(".cover").toggleClass("nolanding");
    
}





// Por lógica, esta función se debe ejecutar después de que se settea el url, ya que se inicia separando las partes del url en arreglos
async function cargar() {

    const url = window.location.pathname;
    console.log(url);
    const appId = url.split('/');
    const pathname = appId[appId.length - 1]
    console.log(pathname);
    const { data } = await functionOnDemand("detail", { pathname });
         
    const strong = document.createElement('strong');
    strong.innerText = data.titulo
    document.getElementById("titulo").append(strong);
    
    Object.entries(data.parrafos).forEach(item => {
        console.log(item[1].parrafo);

        const parrCont = document.getElementById("parr-cont");
        const parrDiv = document.createElement('div');
        parrDiv.setAttribute("class", "col-sm-6");
        const parrP = document.createElement('p');
        parrP.setAttribute("class", "text-justify home-section-text");
        parrP.append(item[1].parrafo);
        parrDiv.append(parrP);
        parrCont.append(parrDiv);
    });

    Object.entries(data.aprenda).forEach(item => {
        console.log(item[1]);

        const listaAprenda1 = document.getElementById("aprenda");
        const listaAprenda1Item = document.createElement('li');
        listaAprenda1Item.append(item[1].aprenda);
        listaAprenda1.append(listaAprenda1Item);
    });
    
    document.getElementById("icon").src = data.imagen; 
    const input = document.createElement("input");

    input.setAttribute("type", "hidden");
    input.setAttribute("id", "nombreWebinar");
    input.setAttribute("name", "nombreWebinar" );
    input.setAttribute("value", data.titulo);
    document.getElementById("formDetail").appendChild(input);
    const input2 = document.createElement("input");
    input2.setAttribute("type", "hidden");
    input2.setAttribute("id", "urlTyp");
    input2.setAttribute("name", "urlTyp" );
    input2.setAttribute("value", data.url);
    document.getElementById("formDetail").appendChild(input2);
  }

  async function loading(){
    try {
      let url = window.location.pathname;
      let appId = url.split('/');
      let pathname = appId[appId.length - 1]

      const tName = document.getElementById("titulo");
      const parrCont = document.getElementById("parr-cont");
      const listaAprenda1 = document.getElementById("aprenda");

      let parrafoFinal= document.createDocumentFragment();
      let razonesFinal= document.createDocumentFragment();
      // el detail es la funcion que esta en el ondemand ojo! importante
      const { data } = await functionOnDemand("detail", { pathname });
      
      tName.innerText = data.titulo;

      Object.entries(data.parrafos).forEach(item => {
        let nuevoP = document.createElement('p');
        nuevoP.append(item[1].parrafo);
        parrafoFinal.append(nuevoP);
      });

      Object.entries(data.aprenda).forEach(item => {
        let nuevoLi = document.createElement('li');
        nuevoLi.innerHTML = `<img src="https://cdn2.hubspot.net/hubfs/37780/check-5.png" alt="" ${item[1].aprenda} >` 
        razonesFinal.append(nuevoLi);
      });

      parrCont.append(parrafoFinal);
      listaAprenda1.append(razonesFinal);

    } catch (error) {
      console.log(error);
    }
  }
    // ()
    ;
          
async function save() {
  const emailChk = document.getElementById("email");
  const nombreChk = document.getElementById("nombre");
  const apellidoChk = document.getElementById("apellido");
  const paisChk = document.getElementById("pais");
  const empresaChk = document.getElementById("empresa");
  const proximacompraChk = document.getElementById("proximacompra");
  const formChk = document.getElementById("formDetail");
  const urlTyp = document.getElementById("urlTyp");

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
    } catch (error) {
      console.error(error);
    }
  }
}



window.onload= function(){
  estamosaqui();
  loading();
};