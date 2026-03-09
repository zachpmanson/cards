import { Popover } from "../../components/Popup";
import StageManager from "../../components/StageManager";

export default function Game() {
  return (
    <div className="h-screen w-screen flex items-stretch">
      <Popover />

      <StageManager />
    </div>
  );
}
