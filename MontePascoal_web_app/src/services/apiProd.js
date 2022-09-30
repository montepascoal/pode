import axios from "axios";

const baseUrl = "https://app-mp-dev.herokuapp.com";

const apiProd = axios.create({
  baseURL: baseUrl,
});

apiProd.interceptors.request.use(
  async (req) => {
    const token = apiProd.defaults.headers.common["Authorization"];

    if (!token) {
      const { data } = await axios.post(`${baseUrl}/auth/login`, {
        useNickname: "dev-master",
        usePassword: "123456",
      });

      req.headers.Authorization = `Bearer ${data.resData.useToken}`;

      apiProd.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.resData.useToken}`;
    }

    return req;
  },
  (error) => {}
);

export default apiProd;
