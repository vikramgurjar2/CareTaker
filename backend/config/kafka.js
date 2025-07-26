const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: `backend`,
  brokers: [process.env.KAFKA_BROKER],
  // Removed SSL and SASL for local Docker setup
});

const consumer = kafka.consumer({ groupId: "backend-health-info-consumer" });

module.exports = consumer;
