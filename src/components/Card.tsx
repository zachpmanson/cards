// reference sprite in the legacy folder so it works in-dev without copying files
const sprite = "/assets/card-sprite.png";
const width = 71;
const height = 96;

export type CardProps = {
  suit: number;
  number: number;
  faceDown?: boolean;
  group?: string | number;
  onClick?: (suit: number, number: number, group?: string | number) => void;
  disabled?: boolean;
};

export type CardDetails = {
  number: number;
  suite: number;
};

export default function Card({ suit, number, faceDown, group, onClick, disabled }: CardProps) {
  const actualSuit = faceDown ? 5 : suit;
  const actualNumber = faceDown ? 1 : number;

  const offsetX = (Math.floor(actualNumber - 1) % 14) * width;
  const offsetY = (Math.floor(actualSuit - 1) % 6) * height;

  const id = cardId({ suit, number, group });

  return (
    <div
      id={id}
      onClick={() => {
        if (disabled) return;
        onClick?.(suit, number, group);
      }}
      style={{
        height: `${height}px`,
        width: `${width}px`,
        borderRadius: "3.5px",
        viewTransitionName: id,
        viewTransitionGroup: "card-move",
        position: "relative",
        backgroundImage: `url(${sprite})`,
        backgroundPosition: `${-offsetX}px ${-offsetY}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export function cardId({ suit, number, group }: { suit?: number; number?: number; group?: any }) {
  return `card-${String(group ?? "0").replace(".", "")}-${suit ?? 0}-${number ?? 0}`;
}
