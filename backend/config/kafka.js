const { Kafka } = require("kafkajs");
const path = require("path");
const fs = require("fs");


const kafka = new Kafka({
  clientId: `backend`,
  brokers: [process.env.KAFKA_BROKER],
  ssl: {
    ca: [fs.readFileSync(path.join(__dirname, "/../kafka.pem"), "utf-8")],
  },
  sasl: {
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD,
    mechanism: "plain",
  },
});

const consumer = kafka.consumer({ groupId: "backend-health-info-consumer" });

module.exports = consumer;