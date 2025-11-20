export default function FileViewer({ url }) {
  return (
    <iframe
      src={`https://docs.google.com/gview?url=${url}&embedded=true`}
      style={{ width: "100%", height: "100vh", border: "none" }}
    ></iframe>
  );
}
