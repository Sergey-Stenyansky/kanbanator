import { users } from "@/mocks/users";

export async function GET() {
  return Response.json({
    code: 200,
    status: "success",
    data: users,
  });
}
