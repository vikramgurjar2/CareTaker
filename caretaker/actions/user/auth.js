import axios from "axios";

const base_url = "http://localhost:4000";

const config = {
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const API = axios.create({ baseURL: base_url, withCredentials: true });

API.interceptors.request.use((req) => {
  const item = localStorage.getItem("user_info");
  if (item) {
    const userInfo = JSON.parse(item);
    req.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return req;
});

export const signInGoogle = async (accessToken) => {
  try {
    const { data } = await API.post("/api/v1/login", {
      googleAccessToken: accessToken,
    });
    return { result: data.success, user: data.user, message: "Login success" };
  } catch (error) {
    console.log(error);
    return { result: false, message: "Login Failed" };
  }
};

export const signUpGoogle = async (accessToken) => {
  try {
    const { data } = await API.post("/api/v1/register", {
      googleAccessToken: accessToken,
    });
    return {
      result: data.success,
      user: data.user,
      message: "Registration success",
    };
  } catch (error) {
    console.log(error);
    return {
      result: false,
      message:
        "Registration Failed, account already exist with the given email",
    };
  }
};

export async function register(user) {
  try {
    const { data } = await axios.post(
      `${base_url}/api/v1/register`,
      user,
      config
    );
    return {
      result: data.success,
      user: data.user,
      message: "Registration Success ",
    };
  } catch (error) {
    console.log(error);
    return {
      result: false,
      message:
        "Registration Failed, account already exist with the given email ",
    };
  }
}

export async function login(user) {
  try {
    const { data } = await axios.post(`${base_url}/api/v1/login`, user, config);
    console.log("user", user);
    return { result: data.success, user: data.user, message: "Login Success " };
  } catch (error) {
    console.log(error);
    return { result: false, message: "Login Failed" };
  }
}

export async function logout() {
  try {
    const { data } = await axios.get(`${base_url}/api/v1/logout`, config);
    return data.success;
  } catch (error) {
    console.log(error);
  }
}

export async function updateDocuments(url) {
  try {
    console.log(url);
    const { data } = await axios.patch(
      `${base_url}/api/v1/documents`,
      { url },
      config
    );
    return { result: data.success, message: "Document added" };
  } catch (error) {
    console.log(error);
    return {
      result: false,
    };
  }
}

export async function getDocuments() {
  try {
    const { data } = await axios.get(`${base_url}/api/v1/documents`, config);
    return {
      result: data.success,
      documents: data.documents,
      message: "Document added",
    };
  } catch (error) {
    console.log(error);
    return {
      result: false,
    };
  }
}

export async function getUser() {
  try {
    const { data } = await axios.get(`${base_url}/api/v1/user`, config);
    return {
      result: data.success,
      user: data.user,
    };
  } catch (error) {
    console.log(error);
    return {
      result: false,
    };
  }
}
