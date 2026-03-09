import { useState } from "preact/hooks";
import WantToPlay from "./stages/S1WantToPlay";
import NoCards from "./stages/S2NoCards";
import S3Game from "./stages/S3Game";

const stageMap: Record<string, any> = {
  wantToPlay: WantToPlay,
  noCards: NoCards,
  s3game: S3Game,
};

const stages = Object.keys(stageMap);

export default function StageManager() {
  const [stageId, setStageId] = useState(0);
  const currentStage = stages[stageId];

  const next = () => setStageId((stageId + 1) % stages.length);
  const back = () => setStageId((stageId + stages.length - 1) % stages.length);

  const Stage = stageMap[currentStage];

  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex items-center gap-1">
        <button onClick={back}>Back</button>
        <button onClick={next}>Next</button>
        {stageId} - {currentStage}
      </div>

      <Stage next={next} />
    </div>
  );
}
