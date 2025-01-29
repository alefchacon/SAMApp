export default function FileInfo({ fileName, fileType }) {
  return (
    <div className="ellipsis">
      {fileName}
      <div className="caption ellipsis">{fileType}</div>
    </div>
  );
}
