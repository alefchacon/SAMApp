export default function FileInfo({ fileName, fileType }) {
  return (
    <div className="ellipsis" style={{ margin: "0 15px" }}>
      {fileName}
      <div className="caption ellipsis">{fileType}</div>
    </div>
  );
}
