const vsn = "// v1.2022.4.11"
// ---------async functions---------------

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
      nuevoLi.innerHTML = `<img src="https://cdn2.hubspot.net/hubfs/37780/check-5.png" alt=""><p>${item[1].aprenda}</p>` 
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
  let urlToRDS = window.location.pathname;

  let urlInput = document.createElement('input');
  let nombreWebinarInput = document.createElement('input');

  urlInput.setAttribute(`type`, `hidden`);
  nombreWebinarInput.setAttribute(`type`, `hidden`);

  urlInput.setAttribute(`name`, `url`);
  nombreWebinarInput.setAttribute(`name`, `nombreWebinar`);

  urlInput.setAttribute(`id`, `url`);
  nombreWebinarInput.setAttribute(`id`, `nombreWebinar`);

  // Modificar esta parte cuando haya cambio de dominio o similar, hacer pruebas con un console.log(urlToRDS);
  // verificar igualmente la ln 109 de redirigir
  urlInput.setAttribute(`value`, `https://publicsmartview.masterbase.com${urlToRDS}`);
  nombreWebinarInput.setAttribute(`value`, `${tName}`);

  fragCampos.append(urlInput);
  fragCampos.append(nombreWebinarInput);

  campos.appendChild(fragCampos);
};
     
async function save(){
  let formChk = document.getElementById("formDetail");
  let formData = new FormData(formChk);   
  let values = Object.fromEntries(formData.entries()); 
  try {
    let {data} = await functionOnDemand("save", {  data: values });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

// ---------functions---------------

function arranque(){
  $("#guardar").click(function(event){
    event.preventDefault();
  });
  $("#guardar").click(verificar);
  $(".tituloCo").html("MasterBase<br>un lugar para aprender"); //Aquí se puede modificar a gusto el slogan a utilizar
}

function verificar(){
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let pais = document.getElementById("pais");
  let email = document.getElementById("email");
  let empresa = document.getElementById("empresa");
  let proximacompra = document.getElementById("proximacompra");
  let control = document.getElementById("control");
  let redirigir = window.location.pathname; // pueden cambiar este valor por otro url para redireccionar
  // se debe cambiar el location.href del setTimeout ln 109 
  
  if (!(email.value && nombre.value && apellido.value && pais.value && empresa.value && proximacompra.value)){
    alert("Por favor complete el formulario");
  }else{
    save()
    control.classList.toggle("saving");
    setTimeout(() => {
        location.href=`https://publicsmartview.masterbase.com${redirigir}`;
    }, 3500);
  }
}

function enlaces(){
  $(".logo").click(function(){ 
    window.open("https://masterbase.com"); 
    return false; 
  }); 
}

// ---------onload---------------

window.onload= function(){
  arranque(); 
  loading();
  enlaces();
  console.log(vsn);
};

