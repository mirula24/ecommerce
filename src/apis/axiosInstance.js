import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://10.10.103.190:3000/api/v1",
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.url.includes("login")|| config.url.includes("register")){
      return config;
    }
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken){
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  }, (error) => {
    console.log("axiosInstance.interceptors.request Error: ", error.message);
    
  }
)

// if backend not yet ready
// const axiosInstance = {
//   post: (url, body) => {
//     console.log({ url, body });

//     return {
//       data: {
//         accessToken:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imhhc2hjb2RlIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluMSIsImVtYWlsIjoic3VwZXJhZG1pbjFAZW1haWwuY29tIiwibmFtZSI6IlN1cGVyIEFkbWluIDEiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJwcm9maWxlUGljdHVyZVVybCI6Imh0dHBzOi8vaS5waW5pbWcuY29tLzczNngvMjIvOGMvYTQvMjI4Y2E0ZTlkMDk0NGMxODM4Yzk5OTcyYmRmNGU0MjguanBnIn0.st3AQlg_L4oi_0oNSzxLXwfaHi5dw_tXP5YKTW5_jM8",
//         refreshToken:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Imhhc2hjb2RlIiwidXNlcm5hbWUiOiJzdXBlcmFkbWluMSIsImVtYWlsIjoic3VwZXJhZG1pbjFAZW1haWwuY29tIiwibmFtZSI6IlN1cGVyIEFkbWluIDEiLCJyb2xlIjoiU1VQRVJfQURNSU4iLCJwcm9maWxlUGljdHVyZVVybCI6Imh0dHBzOi8vaS5waW5pbWcuY29tLzczNngvMjIvOGMvYTQvMjI4Y2E0ZTlkMDk0NGMxODM4Yzk5OTcyYmRmNGU0MjguanBnIn0.st3AQlg_L4oi_0oNSzxLXwfaHi5dw_tXP5YKTW5_jM8",
//       },
//     };
//   },
// };

export default axiosInstance;
