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
    const response = await fetch("http://localhost:3777/getQuestions/");

    if (!response.ok) {
      throw new Error(
        `Error en la solicitud: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();

    const store = useAppStore();
    store.setQuestions(data);

    console.log("Preguntas obtenidas:", data.questions);
  } catch (error) {
    console.error("Error obteniendo preguntas:", error);
    // Manejar el error según sea necesario
  }
}

export async function getuserbymail(mail) {
  const response = await fetch("http://localhost:3777/getuserbymail/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mail }),
  });
  const respuesta = await response.json();
  return respuesta;
}

export async function createGame(requiredPoints, maxPlayers) {
  try {
    const response = await fetch("http://localhost:3777/insertGame/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        required_points: requiredPoints,
        max_players: maxPlayers,
      }),
    });
    console.log(response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
}

export async function updateGameID(game_id) {
  try {
    const store = useAppStore();
    const userEmail = store.getMail();

    const response = await fetch(
      `http://localhost:3777/changeGameId/${game_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mail: userEmail,
          // Puedes agregar más datos aquí si es necesario
        }),
      }
    );

    const data = await response.json();
    // Maneja la respuesta del servidor si es necesario
    console.log(data);

    // Si deseas hacer algo con la respuesta en tu componente Vue, puedes retornarla
    return data;
  } catch (error) {
    // Maneja los errores si es necesario
    console.error("Error al realizar la solicitud:", error);
    throw error; // Puedes lanzar el error nuevamente si es necesario
  }
}

export async function getGameData(id) {
  try {
    const response = await fetch("http://localhost:3777/getGameData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ game_id: id }),
    });
    const respuesta = await response.json();
    return respuesta;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    throw error;
  }
}

export async function joinGame(password) {
  try {
    const store = useAppStore();
    const userEmail = store.getMail();

    const response = await fetch(`http://localhost:3777/joinGame/${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: userEmail,
      }),
    });

    const data = await response.json();
    // Maneja la respuesta del servidor si es necesario
    console.log(data);

    // Si deseas hacer algo con la respuesta en tu componente Vue, puedes retornarla
    return data;
  } catch (error) {
    // Maneja los errores si es necesario
    console.error("Error al realizar la solicitud:", error);
    throw error; // Puedes lanzar el error nuevamente si es necesario
  }
}
export async function updateGameStatus(status, game_id) {
  try {
    const response = await fetch("http://localhost:3777/changeStatusGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        game_id,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al cambiar el estado del juego:", error);
    throw error;
  }
}

export async function updateUser(name,mail,profile_pic,oldmail){
  const response = await fetch('http://localhost:3777/updateUserVue/',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({name,mail,profile_pic,oldmail}),
  });
  const respuesta = await response.json();
  return respuesta;
};

export async function getQuestions() {
  try {
    const response = await fetch('http://localhost:3777/getQuestions');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
}

