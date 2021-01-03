import "./App.css";
var QRCode = require("qrcode.react");

const qrContent = `
BEGIN:VCARD
N:BERNARD;Simon;
VERSION:3.0
END:VCARD
`;

function App() {
  return (
    <div className="App">
      <QRCode value={qrContent} size={1024} renderAs="svg" />
    </div>
  );
}

export default App;
