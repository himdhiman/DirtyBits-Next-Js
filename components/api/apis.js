import axios from "axios";
import Cookies from "js-cookie";

const HEADERS = {
  "Content-Type": "application/json",
  Authorization: "JWT " + Cookies.get("access"),
};

const BASE_URL = "https://db-auth.herokuapp.com/";
// const BASE_URL = "http://localhost:8000/";

const PROBLEM_URL = "https://db-code.herokuapp.com/";
// const PROBLEM_URL = "http://localhost:8000/";

const localhost = "http://localhost:8000/";

export const validateUserName = axios.create({
  baseURL: BASE_URL + "auth/" + "existUsername",
});

export const validateEmail = axios.create({
  baseURL: BASE_URL + "auth/" + "existEmail",
});

export const createUser = axios.create({
  baseURL: BASE_URL + "auth/register",
});

export const signinApi = axios.create({
  baseURL: BASE_URL + "auth/authenticate",
});

export const refreshTokenApi = axios.create({
  baseURL: BASE_URL + "auth/refresh",
});

export const googleLoginApi = axios.create({
  baseURL: BASE_URL + "auth/google",
});

export const githubLoginApi = axios.create({
  baseURL: BASE_URL + "auth/github",
});

export const changePass = axios.create({
  baseURL: BASE_URL + "auth/changepassmail",
});

export const verifyVerificationCode = axios.create({
  baseURL: BASE_URL + "auth/verifyUser",
});

export const AddProblem = axios.create({
  baseURL: PROBLEM_URL + "problems/addProblem",
  headers: HEADERS,
});

AddProblem.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          AddProblem.defaults.headers["Authorization"] = "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return AddProblem(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const uploadTestCases = axios.create({
  baseURL: PROBLEM_URL + "problems/uploadTC",
});

export const getProblemsList = axios.create({
  baseURL: PROBLEM_URL + "problems/getProblemsList",
});

export const getProblemsStatus = axios.create({
  baseURL: PROBLEM_URL + "problems/getProblemsStatus",
  headers: HEADERS,
});

getProblemsStatus.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          getProblemsStatus.defaults.headers["Authorization"] = "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return getProblemsStatus(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const getProblem = axios.create({
  baseURL: PROBLEM_URL + "problems/getProblem",
});

export const runCode = axios.create({
  baseURL: PROBLEM_URL + "core/compilecode",
  headers: HEADERS,
});

runCode.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          runCode.defaults.headers["Authorization"] = "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return runCode(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const submitCode = axios.create({
  baseURL: PROBLEM_URL + "core/runcode",
  headers: HEADERS,
});

submitCode.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          submitCode.defaults.headers["Authorization"] = "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return submitCode(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const runTestCases = axios.create({
  baseURL: PROBLEM_URL + "core/runtests",
  headers: HEADERS,
});

runTestCases.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          runTestCases.defaults.headers["Authorization"] = "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return runTestCases(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const getProblemPageDataApi = axios.create({
  baseURL: localhost + "problems/getProblemPageData",
  headers: HEADERS,
});

getProblemPageDataApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          getProblemPageDataApi.defaults.headers["Authorization"] =
            "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return getProblemPageDataApi(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const getSubmissionsList = axios.create({
  baseURL: localhost + "problems/getsubmissionslist",
  headers: HEADERS,
});

getSubmissionsList.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          getSubmissionsList.defaults.headers["Authorization"] =
            "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return getSubmissionsList(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const upAndDownVoteHandler = axios.create({
  baseURL: PROBLEM_URL + "problems/handleupvotedownvote",
  headers: HEADERS,
});

upAndDownVoteHandler.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          upAndDownVoteHandler.defaults.headers["Authorization"] =
            "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return upAndDownVoteHandler(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);

export const handleBookmark = axios.create({
  baseURL: PROBLEM_URL + "problems/handlebookmark",
  headers: HEADERS,
});

handleBookmark.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refresh_token = Cookies.get("refresh");
      return refreshTokenApi
        .post("/", {
          refresh: refresh_token,
        })
        .then((response) => {
          const { access, refresh } = response.data;
          Cookies.set("access", access);
          Cookies.set("refresh", refresh, { expires: 14 });
          handleBookmark.defaults.headers["Authorization"] = "JWT " + access;
          originalRequest.headers["Authorization"] = "JWT " + access;
          return handleBookmark(originalRequest);
        })
        .catch((err) => {
          // LOGOUT AND REDIRECT TO SIGNIN AGAIN
          console.log(err);
        });
    }
    return Promise.reject(error);
  }
);
