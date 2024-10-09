import { Box } from "@mui/material";

const Spacing = ({ h, v }: { h?: string | number; v?: string | number }) => (
  <Box sx={{ paddingTop: v, paddingLeft: h }} />
);

export default Spacing;
