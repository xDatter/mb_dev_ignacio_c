// v0.2022.04.08 1905

function arranque(){
  $("#guardar").click(save);
}
function enlaces(){
  $(".logo").click(function(){ 
    // location.href="https://masterbase.com"; 
    window.open("https://masterbase.com"); 
    return false; 
  }); 

}

function testers(){
  console.log("holap");
  $("#control").toggleClass("nolanding");
  $(".cover").toggleClass("nolanding");    
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

  let fragCampos = document.createDocumentFragment();
  let campos = document.getElementById("formDetail");
  let tElement = document.getElementById("titulo");
  let tName = tElement.innerText;
  let urlRDS = window.location.pathname;

  let urlInput = document.createElement('input');
  let nombreWebinarInput = document.createElement('input');

  urlInput.setAttribute(`type`, `hidden`);
  nombreWebinarInput.setAttribute(`type`, `hidden`);

  urlInput.setAttribute(`name`, `url`);
  nombreWebinarInput.setAttribute(`name`, `nombreWebinar`);

  urlInput.setAttribute(`id`, `url`);
  nombreWebinarInput.setAttribute(`id`, `nombreWebinar`);

  // Modificar esta parte cuando haya cambio de dominio o similar, hacer pruebas con un console.log(urlRDS);
  urlInput.setAttribute(`value`, `https://publicsmartview.masterbase.com${urlRDS}`);
  nombreWebinarInput.setAttribute(`value`, `${tName}`);

  fragCampos.append(urlInput);
  fragCampos.append(nombreWebinarInput);

  campos.appendChild(fragCampos);
};
     
async function save(){
  let recargar = window.location.pathname;
  let formChk = document.getElementById("formDetail");
  let formData = new FormData(formChk);   
  let values = Object.fromEntries(formData.entries()); 
  try {
    let {data} = await functionOnDemand("save", {  data: values });
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  setTimeout(() => {
    console.log("1 Segundo esperado")
    location.href=`https://publicsmartview.masterbase.com${recargar}`;
  }, 3000);

}




window.onload= function(){
  arranque(); 
  loading();
  enlaces();
};

