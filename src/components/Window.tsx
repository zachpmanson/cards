type WindowProps = {
  title?: string;
  body?: preact.ComponentChildren;
};

export default function Window({ title, body }: WindowProps) {
  return (
    <div className="window" style={{ width: 300 }}>
      <div className="title-bar">
        <div className="title-bar-text">{title}</div>
        <div className="title-bar-controls">
          <button aria-label="Minimize" />
          <button aria-label="Maximize" />
          <button aria-label="Close" />
        </div>
      </div>
      <div className="window-body">{body}</div>
    </div>
  );
}
