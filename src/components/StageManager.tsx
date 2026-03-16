import { signal } from "@preact/signals";
import WantToPlay from "./stages/S1WantToPlay";
import S3Game from "./stages/S3Game";

const stageMap: Record<string, any> = {
  s3game: S3Game,
  wantToPlay: WantToPlay,
};

const stages = Object.keys(stageMap);

const stageId = signal(0);
export default function StageManager() {
  const currentStage = stages[stageId.value];

  const next = () => (stageId.value = (stageId.value + 1) % stages.length);
  const back = () => (stageId.value = (stageId.value + stages.length - 1) % stages.length);

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
