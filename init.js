import app from "./app";

const PORT = 8080;

const HandleListening = () => console.log(`listening on : http://localhost:${PORT}`);

app.listen(PORT, HandleListening);