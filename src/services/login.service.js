let url = "https://productosappnu.firebaseio.com/usuarios.json";
let response;

export function getUsuarios() {
  return fetch(url).then(res => {
    res.json().then(function(data) {
      response= data;
    });
  });
}

function convertObjToArrUsuarios() {
  let usuarios: any[] = [];
  for (let key in response) {
    usuarios.push(response[key]);
  }
  return usuarios;
}

export function validUsuario(email: string, pass: string) {
  let permitido:boolean = false;
  for (let usuario of convertObjToArrUsuarios()) {
    permitido=usuario != null && usuario.email === email && usuario.pass === pass;
    if(permitido){
      break;
    }
  }
  return permitido;
}
