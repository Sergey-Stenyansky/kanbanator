import { KanbanTicket, KanbanTicketType, KanbanUser } from "@/core/types";
import {
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  AvatarGroup,
  Card,
} from "@mui/material";
import { flexJcStart, flexSpaceBetween } from "@/theme/commonStyles";
import Spacing from "@/primitives/Spacing";
import { BugReport, Build, Warning } from "@mui/icons-material";

const TicketCard = ({ ticket }: { ticket: KanbanTicket }) => (
  <Card>
    <CardContent>
      <TicketCardHeader title={ticket.category} />
      <Typography>{ticket.title}</Typography>
      <Spacing v={2} />
      <TicketCardFooter
        urgentItems={ticket.urgentItems}
        type={ticket.type}
        id={ticket.id}
        participants={ticket.participants}
      />
    </CardContent>
  </Card>
);

const ticketIconsTypeMap = {
  feature: <Build color="success" fontSize="small" />,
  bug: <BugReport color="error" fontSize="small" />,
};

const TicketCardFooter = ({
  type,
  id,
  participants,
  urgentItems,
}: {
  type: KanbanTicketType;
  id: number;
  participants: KanbanUser[];
  urgentItems: number;
}) => (
  <Box sx={{ ...flexSpaceBetween, alignItems: "center" }}>
    <Box sx={flexJcStart}>
      <Chip icon={ticketIconsTypeMap[type]} label={"#" + id} />
      {!!urgentItems && (
        <>
          <Spacing h={2} />
          <Chip
            icon={<Warning color="warning" fontSize="small" />}
            label={urgentItems}
          />
        </>
      )}
    </Box>
    {!!participants.length && (
      <AvatarGroup max={3}>
        {participants.map((user) => (
          <Avatar
            sx={{ maxHeight: 20, maxWidth: 20 }}
            key={user.id}
            alt={user.name}
            src={user.avatarUrl}
          />
        ))}
      </AvatarGroup>
    )}
  </Box>
);

const TicketCardHeader = ({ title }: { title: string }) => (
  <Box sx={flexJcStart}>
    <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
      {title}
    </Typography>
  </Box>
);

export default TicketCard;
