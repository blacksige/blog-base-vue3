import requests from "./request"; //引入二次封装的axios

export const getUserInfo = (params: any): any => {
  return requests({
    url: "/study/getUserInfo",
    method: "get",
    params,
  });
};
