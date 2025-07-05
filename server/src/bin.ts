import cluster from "cluster";
import os from "os";
import { app } from ".";

const PORT: number = Number(process.env.PORT) || 3000;

const numberOfCPUs: number = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  // Fork a worker process for each CPU core
  for (let i = 0; i < numberOfCPUs; i++) {
    cluster.fork();
  }

  // Listening for dying workers and replace them
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died.`);
    // fork new worker
    cluster.fork();
  });
} else {
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
