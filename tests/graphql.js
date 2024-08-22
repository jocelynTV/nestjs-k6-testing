import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 10,
  duration: "10s",
};

export default function () {
  const query = `   
    query {
      tasks {
        id
        title
        createdAt
        updatedAt
      }
    }`;

  const headers = {
    "Content-Type": "application/json",
  };
  http.post("http://localhost:3000/graphql", JSON.stringify({ query: query }), {
    headers: headers,
  });
  sleep(0.3);
}
