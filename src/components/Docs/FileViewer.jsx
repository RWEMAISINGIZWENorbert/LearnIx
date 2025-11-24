export default function FileViewer({ url }) {
const isImage = url.match(/\.(jpeg|jpg|png|gif|webp)$/i);

  return isImage ? (
    <img 
      src={url} 
      alt="Preview" 
      style={{ width: "100%", height: "auto", objectFit: "contain" }} 
    />
  ) : (
    <iframe
      src={`https://docs.google.com/gview?url=${url}&embedded=true`}
      style={{ width: "100%", height: "100vh", border: "none" }}
    />
  );
}
