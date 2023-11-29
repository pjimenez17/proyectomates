import { useAppStore } from "@/store/app";

export async function log(username, password) {
  const response = await fetch("http://localhost:3777/authorizationLogin/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mail: username,
      password: password,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Error en la solicitud: ${response.status} - ${response.statusText}`
    );
  }
  const data = await response.json();
  console.log(data);
  return { ...data, username: data.name };
}

export async function fetchQuestions() {
    try {
      const response = await fetch('http://localhost:3777/getQuestions');
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();

      const store = useAppStore()
      store.setQuestions(data)

      console.log('Preguntas obtenidas:', data.questions);

    } catch (error) {
      console.error('Error obteniendo preguntas:', error);
      // Manejar el error según sea necesario
    }
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
