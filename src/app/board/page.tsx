import { Stack } from "@mui/material";
import BoardContent from "./elements/BoardContent";
import { createDefaultFlow } from "@/core/helpers/flow";

const flow = createDefaultFlow();

export default function Board() {
  return (
    <Stack>
      <BoardContent flow={flow} />
    </Stack>
  );
}
