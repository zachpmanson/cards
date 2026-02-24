import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import WantToPlay from "../stages/WantToPlay.js";

const stageMap = {
  wantToPlay: WantToPlay,
  winnerHires: null,
  noCards: null,
  info1: null,
  card1: null,
  info2: null,
  card2: null,
  info3: null,
  card3: null,
  stillInterested: null,
  info4: null,
  card4: null,
  emailMe: null,
};

const stages = Object.keys(stageMap);

export default function StageManager() {
  const [stageId, setStageId] = useState(0);
  const currentStage = stages[stageId];

  const next = () => {
    setStageId((stageId + 1) % stages.length);
  };

  return html`<div>
    ${currentStage} ${stageId}
    ${stageMap[currentStage]?.({
      next,
    })}
  </div>`;
}
