import { BASE_API_URL } from "./constants";

export const getImageLink = (
  imageLink: string | undefined,
  type: string = "jounal"
) => {
  return imageLink ? BASE_API_URL + imageLink : `/default-${type}.webp`;
};
