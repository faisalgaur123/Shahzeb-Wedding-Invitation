import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "./index";

export const Route = createFileRoute("/edit")({
  component: WeddingInvitation,
});
