import grpc from "k6/net/grpc";
import { check, sleep } from "k6";

const client = new grpc.Client();
client.load(["definitions"], "tasks.proto");

export default () => {
  client.connect("localhost:3001", {
    plaintext: true,
  });

  const data = { id: "66c5c667c0c0c0402f1f9df9" }; // Replace ID
  const response = client.invoke("tasks.TasksService/FindOne", data);

  check(response, {
    "status is OK": (r) => r && r.status === grpc.StatusOK,
  });

  console.log(JSON.stringify(response.message));

  client.close();
  sleep(1);
};
