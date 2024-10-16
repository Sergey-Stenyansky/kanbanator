import { getUsers } from "@/core/services/getUsers";
import BoardWrapper from "./elements/BoardWrapper";

export default async function Board() {
  const users = await getUsers();
  return <BoardWrapper users={users} />;
}
