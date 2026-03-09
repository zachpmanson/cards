import { useState } from "preact/hooks";
import Card, { CardDetails } from "../Card";

export default function S3Game() {
  const [myHand, setMyHand] = useState<CardDetails[]>([]);
  const [enemyHand, setEnemyHand] = useState<CardDetails[]>([]);
  return (
    <div className="w-full flex flex-col h-full justify-between">
      <div>// enemy hand</div>
      <div className="flex gap-2">
        {enemyHand.map((card, i) => (
          <Card key={i} suit={card.suite} number={card.number} />
        ))}
      </div>
    </div>
  );
}
