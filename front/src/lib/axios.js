import axios from "axios";

// axios.defaults.baseURL = "http://localhost:4000/api/";

// if (localStorage.getItem("AuthToken")) {
//     axios.defaults.headers.common["Authorization"] =
//         localStorage.getItem("AuthToken");
// }

export default function () {
    const authToken = localStorage.getItem("AuthToken");
    const axiosInstance = axios.create({
        baseURL: "http://localhost:4000/api/",
        headers: {
            Authorization: authToken ? `Bearer ${authToken}` : undefined,
        },
    });

    axiosInstance.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        function (error) {
            if (
                error.response.status == 401 &&
                window.location.pathname !== "/auth"
            ) {
                window.location.href = "/auth";
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}
