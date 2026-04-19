import { AgentAvatar } from "@/components/AgentAvatar/AgentAvatar";

export function PageHeader() {
  return (
    <div className="mb-6">
      <AgentAvatar
        name="Vera"
        tagline="I sort your documents so your books stay clean."
        avatarStyle="adventurer-feminine"
        seed="Sophia"
        size="lg"
      />
    </div>
  );
}
