function arranque(){
    $("#guardar").click(camposRDS);

}

function testers(){
    
    console.log("holap");
    $("#control").toggleClass("nolanding");
    $(".cover").toggleClass("nolanding"); 
    
}

function enlaces(){
  $(".logo").click(function(){ 
    // location.href="https://masterbase.com"; 
    window.open("https://masterbase.com"); 
    return false; 
  }); 

}

function camposRDS(){
  let fragCampos = document.createDocumentFragment();
  let campos = document.getElementById("formDetail");
  let tName = document.getElementById("titulo");
  let url = window.location.pathname;


  let urlInput = document.createElement('input');
  let nombreWebinarInput = document.createElement('input');


  urlInput.setAttribute(`type`, `hidden`);
  nombreWebinarInput.setAttribute(`type`, `hidden`);

  urlInput.setAttribute(`value`, `${url}`);
  nombreWebinarInput.setAttribute(`value`, `${tName}`);

  fragCampos.append(urlInput);
  fragCampos.append(nombreWebinarInput);

  campos.appendChild(fragCampos);


  save();

}

async function loading(){
  try {
    let url = window.location.pathname;
    let appId = url.split('/');
    let pathname = appId[appId.length - 1]

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
  // Estos campos colocarlos en inputs dentro del formulario para que se capturen con el resto
  let urlTyp = document.getElementById("urlTyp");

  let formChk = document.getElementById("formDetail");

  let formData = new FormData(formChk);   
  let values = Object.fromEntries(formData.entries()); 

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
async function replicar() {
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


      const typ = window.location.href = "https://publicsmartview.masterbase.com/v1/620324fe39671200181f9d8a/" + urlTyp.value;
      console.log("values", values, data);
    

  
}

async function flujo(){
  let { data1 } = await functionOnDemand("detail", { pathname });
  // let { data2 } = await functionOnDemand("save", {  data: values });
  let { data2 } = await functionOnDemand("save", { data });

  console.log(data1);
  console.log(data2);

}
flujo();

window.onload= function(){
  arranque(); 
  loading();
  enlaces();
};

