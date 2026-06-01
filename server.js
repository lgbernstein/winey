import { createServer } from "./src/server.js";

const port = Number(process.env.PORT || 3000);
const { app } = createServer();

app.listen(port, () => {
  console.log(`Winey is listening on http://localhost:${port}`);
});
