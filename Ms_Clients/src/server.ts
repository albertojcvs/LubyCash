import { app } from "./app";
import { Consumer } from "./kafka/Consumer";
const PORT = 3000;

const consumer = new Consumer({ groupId: "ms_clients" });

consumer.consume();

app.listen(PORT, async () => {
  console.log("Server is running");
});
