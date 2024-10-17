import { comments } from "@/mocks/comments";

export async function GET() {
  return Response.json({
    code: 200,
    status: "success",
    data: comments,
  });
}
