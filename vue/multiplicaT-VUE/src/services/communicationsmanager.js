export async function log(username, password) {
  const response = await fetch('http://localhost:3777/authorizationLogin/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          mail: username,
          password: password,
      }),
  });
  if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
  }
  const data = await response.json();
  return { ...data, username: data.name };
};

export async function getuserbymail(mail){
    const response = await fetch('http://localhost:3777/getuserbymail/',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({mail}),
    });
    const respuesta = await response.json();
    return respuesta;
};
