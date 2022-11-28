import { exampleQueue } from "./quacks/exampleQuack.js";

import attachMetaFunctions from "./util/attachMetaFunctions.js";
attachMetaFunctions()

import logAllQueues from "./util/logAllQueues.js";
logAllQueues()

// exampleQueue.addWithMeta(req, res, 'exampleJobName', {myDataNotMeta: 32})
// exampleQueue.addBulkWithMeta(req, res, [
//   { name: 'name1', data: { paint: 'car' } },
//   { name: 'name2', data: { paint: 'house' } },
//   { name: 'name3', data: { paint: 'boat' } },
// ]);

export {
  exampleQueue
}