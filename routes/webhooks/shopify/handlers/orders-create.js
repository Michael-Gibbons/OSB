import { exampleQueue } from "../../../../redis/queues/index.js";

const ordersCreateHandler = async (topic, shop, body) => {
  const payload = JSON.parse(body);
  exampleQueue.add("exampleJob", { payload });
};

export { ordersCreateHandler };
