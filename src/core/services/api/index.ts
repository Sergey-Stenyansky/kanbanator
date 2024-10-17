import { getApiBaseUrl } from "@/helpers/getApiBaseUrl";

export const getUsers = async () => {
  const res = await fetch(getApiBaseUrl() + "/api/users", {
    method: "GET",
  });
  const { data } = await res.json();
  return data;
};

export const getComments = async () => {
  const res = await fetch(getApiBaseUrl() + "/api/comments", {
    method: "GET",
  });
  const { data } = await res.json();
  return data;
};

export const getTasks = async () => {
  const res = await fetch(getApiBaseUrl() + "/api/tasks", {
    method: "GET",
  });
  const { data } = await res.json();
  return data;
};

export const getColumns = async () => {
  const res = await fetch(getApiBaseUrl() + "/api/columns", {
    method: "GET",
  });
  const { data } = await res.json();
  return data;
};
