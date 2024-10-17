import { columns } from "@/mocks/columns";

export async function GET() {
  return Response.json({
    code: 200,
    status: "success",
    data: columns,
  });
}
