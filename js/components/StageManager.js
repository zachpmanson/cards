import { html, useState } from "https://unpkg.com/htm/preact/standalone.module.js";
import NoCards from "../stages/NoCards.js";
import WantToPlay from "../stages/WantToPlay.js";

const stageMap = {
  wantToPlay: WantToPlay,
  // winnerHires: null,
  noCards: NoCards,
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

  const back = () => {
    setStageId((stageId + stages.length - 1) % stages.length);
  };

  return html`<div className="flex flex-col justify-start">
    <div className="flex items-center gap-1">
      <button onClick=${back}>Back</button>
      <button onClick=${next}>Next</button>
      ${stageId} - ${currentStage}
    </div>

    <${stageMap[currentStage]} next=${next} />
  </div>`;
}
