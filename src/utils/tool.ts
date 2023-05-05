import dist from "./dist";
export const findCityInfo = (key: string): unknown => {
  console.log(key, "key");
  return key
    ? (function filter(arr: any): unknown {
        const array = Object.keys(arr);

        for (let index = 0; index < array.length; index++) {
          let city = arr[array[index]];
          const children = city.children || {};
          const adcode = city.adcode;
          const cityKey = array[index];

          if (key === adcode || key === cityKey) {
            return city;
          }
          if (children && Object.keys(children).length > 0) {
            city = filter(children);
            if (city) {
              return city;
            }
          }
        }
        return null;
      })(dist)
    : null;
};
