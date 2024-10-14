import { KanbanTaskCommentItem } from "@/core/types";
import { Card, CardContent, CardHeader, Avatar } from "@mui/material";
import { memo } from "react";

const KanbanTaskCommentCard = ({ item }: { item: KanbanTaskCommentItem }) => {
  return (
    <Card key={item.id} sx={{ flexShrink: 0 }}>
      <CardHeader
        avatar={<Avatar src={item.author.avatarUrl} />}
        title={item.author.name}
        subheader={item.createdAt}
      />
      <CardContent>{item.content}</CardContent>
    </Card>
  );
};

export default memo(KanbanTaskCommentCard);
