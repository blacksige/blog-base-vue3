import requests from "./request"; //引入二次封装的axios
export const login = (params: any): any =>
  requests({ url: "/study/login", method: "post", data: params });
