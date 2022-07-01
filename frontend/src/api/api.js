import Cookies from "js-cookie";
import ky from "ky";
import { useDispatch } from "react-redux";
import { setCheckLoginParams } from "../pages/slice/sliceUsers";

/**
 * Настройки для ky
 * (https://github.com/sindresorhus/ky)
 */
const api = ky.create({
  prefixUrl: "/api/",
  throwHttpErrors: false,
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-CSRFTOKEN", Cookies.get("csrftoken"));
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status >= 500) {
          const obj = {
            errors: [
              {
                message: "Сервер не доступен",
                code: "error",
              },
            ],
          };
          const blob = new Blob([JSON.stringify(obj, null, 2)], {
            type: "application/json",
          });
          const init = {
            status: response.status,
          };
          return new Response(blob, init);
        }
        if (response.ok) {
          return response;
        }
        return response;
      },
    ],
  },
});

export default api;
