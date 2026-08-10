import app from "./app.js";
import { Server } from "http";
import http from "http";
import { env } from "./config/env.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client.js";

const server: Server = http.createServer(app);

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const bootstrap = async () => {
  await prisma.$connect();
  console.log("✅ Database connected successfully");
  
  server.listen(env.PORT, () => {
    console.log(`HTTP Server is running on port ${env.PORT}`);
  });
};

bootstrap();

//----------- gracefully shutdown -----------//
// process.on("SIGINT", () => {
//   // server close when pressed ctrl+c - its for developer
//   server.close(() => {
//     console.log("Server closed by pressing ctrl+c");
//     process.exit(0);
//   });
// });

// process.on("SIGTERM", () => {
//   // no new request accepted, pending request will be completed
//   server.close(() => {
//     console.log("Server closed after completing pending requests");
//     process.exit(0);
//   });
// });

// process.on("uncaughtException", (error) => {
//   // get that sync error which is not handled by try catch
//   console.error("Sync Error:", error);
//   process.exit(1);
// });

// process.on("unhandledRejection", (error) => {
//   // get that async/promise error which is not handled by try catch
//   console.error("Async/Promise Error:", error);
//   server.close(() => {
//     process.exit(1);
//   });
// });

// reusable function for graceful shutdown
const gracefullyShutdown = (message: string, exitCode: number) => {
  console.log(message);
  server.close(() => {
    console.log(`Server closed successfully`);
    process.exit(exitCode);
  });
};

//----------- gracefully shutdown -----------//
process.on("SIGINT", () => {
  gracefullyShutdown("Server closed by pressing ctrl+c", 0);
});

process.on("SIGTERM", () => {
  gracefullyShutdown("Server closed after completing pending requests", 0);
});

process.on("uncaughtException", (error) => {
  console.error("Sync Error:", error);
  gracefullyShutdown("Sync error which is not handled by try catch", 1);
});

process.on("unhandledRejection", (error) => {
  console.error("Async/Promise Error:", error);
  gracefullyShutdown(
    "Async/Promise error which is not handled by try catch",
    1,
  );
});
