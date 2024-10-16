import { getApiBaseUrl } from "@/helpers/getApiBaseUrl";

export const getUsers = async () => {
  const res = await fetch(getApiBaseUrl() + "/api/users", { method: "GET" });
  const { data } = await res.json();
  return data;
};
