import {
  getColumns,
  getComments,
  getTasks,
  getUsers,
} from "@/core/services/api/";
import BoardWrapper from "./elements/BoardWrapper";

const getData = async () => {
  const [users, tasks, columns, comments] = await Promise.all([
    getUsers(),
    getTasks(),
    getColumns(),
    getComments(),
  ]);

  return { users, tasks, columns, comments };
};

export default async function Board() {
  const data = await getData();
  return <BoardWrapper data={data} />;
}
