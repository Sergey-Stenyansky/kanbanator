import { tasks } from "@/mocks/tasks";

export async function GET() {
  return Response.json({
    code: 200,
    status: "success",
    data: tasks,
  });
}
