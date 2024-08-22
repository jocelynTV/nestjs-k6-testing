import ws from "k6/ws";
import {check} from "k6";

export default function () {
  const url = "ws://localhost:3000/socket.io/?EIO=4&transport=websocket";
  const params = {tags: {my_tag: "websocket_test"}};

  const res = ws.connect(url, params, function (socket) {
    socket.on("open", function open() {
      console.log("connected");

      socket.setInterval(function timeout() {
        socket.ping();

        console.log("Pinging every 1sec (setInterval test)");
      }, 1000);
    });

    socket.on("ping", () => console.log("PING!"));

    socket.on("pong", () => console.log("PONG!"));

    socket.on("close", () => console.log("disconnected"));

    socket.setTimeout(function () {
      console.log("2 seconds passed, closing the socket");

      socket.close();
    }, 2000);

    socket.on("error", function (e) {
      if (e.error() != "websocket: close sent") {
        console.log("An unexpected error occured: ", e.error());
      }
    });
  });

  check(res, {"status is 101": (r) => r && r.status === 101});
}
