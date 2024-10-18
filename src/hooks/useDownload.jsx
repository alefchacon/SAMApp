import { useCallback } from "react";

export default function useDownload() {
  const download = useCallback((file, type, filename) => {
    const blob = new Blob([file], { type: type });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  return download;
}
