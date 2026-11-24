import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from "./index";

export const Route = createFileRoute("/customize")({
  component: WeddingInvitation,
});
