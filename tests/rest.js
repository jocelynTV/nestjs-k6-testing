import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
   vus: 5,
   duration: "5s",
 };

export default function () {
   const data = { title: "Create task" };
   const url = "http://localhost:3000/tasks";
   const payload = JSON.stringify(data);

   const params = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   let res = http.post(url, payload, params);

   check(res, { "Create task": (r) => r.status === 201 });

   sleep(0.3);
}
