import Image from "next/image";

type AgentAvatarProps = {
  name: string;
  tagline: string;
  avatarStyle?: "lorelei" | "micah" | "adventurer" | "adventurer-feminine" | "adventurer-masculine";
  seed?: string;
  mouth?: string;
  size?: "sm" | "md" | "lg";
};

export function AgentAvatar({ name, tagline, avatarStyle = "lorelei", seed, mouth, size = "md" }: AgentAvatarProps) {
  const avatarSeed = seed ?? name;
  const ring  = size === "lg" ? "w-36 h-36" : size === "md" ? "w-24 h-24" : "w-14 h-14";
  const px    = size === "lg" ? 144 : size === "md" ? 96 : 56;
  const title = size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-lg";

  const avatarUrl =
    avatarStyle === "micah"
      ? `https://api.dicebear.com/9.x/micah/svg?seed=${avatarSeed}&backgroundColor=transparent&mouth=laughing,smile,smirk`
      : avatarStyle === "adventurer-feminine"
      ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}&backgroundColor=transparent&mouth=variant01,variant02,variant03,variant04&hair=long01,long02,long03,long04,long05,long06,long07,long08,long09,long10,long11,long12,long13,long14,long15,long16,long17,long18,long19,long20,long21,long22,long23,long24,long25,long26&eyebrows=variant10,variant11,variant12,variant13,variant14,variant15`
      : avatarStyle === "adventurer-masculine"
      ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}&backgroundColor=transparent&mouth=variant22&hair=short01,short02,short03,short04,short05,short06,short07,short08,short09,short10,short11,short12,short13,short14,short15,short16,short17,short18,short19&skinColor=f2d3b1`
      : avatarStyle === "adventurer"
      ? `https://api.dicebear.com/9.x/adventurer/svg?seed=${avatarSeed}&backgroundColor=transparent&mouth=${mouth ?? "variant01,variant02,variant03,variant04,variant05,variant06,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20,variant21,variant22,variant23,variant24,variant25,variant26,variant27,variant28,variant29,variant30"}`
      : `https://api.dicebear.com/9.x/lorelei/svg?seed=${avatarSeed}&backgroundColor=transparent&mouth=happy01,happy02,happy03,happy04,happy05,happy06,happy07,happy08,happy09,happy10,happy11,happy12,happy13,happy14,happy15,happy16,happy17,happy18&hair=variant01,variant02,variant03,variant04,variant05,variant06,variant07,variant08,variant09,variant10,variant11,variant12,variant13,variant14,variant15,variant16,variant17,variant18,variant19,variant20`;

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className={`${ring} flex items-center justify-center overflow-hidden`}>
        <Image src={avatarUrl} alt={name} width={px} height={px} unoptimized />
      </div>
      <div>
        <p className={`${title} font-semibold text-white`}>{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{tagline}</p>
      </div>
    </div>
  );
}
