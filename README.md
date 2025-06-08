# Caretakr
This web application allow users to monitor their important health parameters in real time. Intuitive user dashboard, with video consulting and document management make it a one stop solution for all of our health realted problems. 

## Features
- Monitor important parameters like glucose, blood pressure, and many more in real time.
- Video consultation factility - real time video call with availabe doctors
- Document store - users can store their health related documents at one place
- Chatbot - helps users to clarify their small doubts
- User can login and register in both ways - password or google
- History management
- Secure the documents
- 

## Architecture
The project contains the following folders and services
- ```caretaker```: Frontend developed using Next.js
- ```backend```: Node.js HTTP API server for REST API's, handling auth and consumer for Kafka
- ```fit-band-server```: Node.js server generating health parameters every 15 seconds and act as producer for kafka

  
**Tech used to make scalable architecture -**
- **Next.js** - Next.js provide modern framework to develop frontend with easy integration of tailwind css (utility-first CSS framework) and shadcn ui (collection of customizable react components)
- **Node.js** - Node.js is scalable and can handle a large number of concurrent connections due to its asynchronous, non-blocking I/O model.
- **Kafka** - Kafka provides real-time streaming data pipelines for the different health parameters generated every 15 minutes (Publisher - fit-band-server) and backend act as the consumer for the health data.
- **ClickHouse** - ClickHouse uses a column oriented structure and is highle performant. ClickHouse works best with immutable data and is great for analytics. ClickHouse is used to store health data of the users.
- **PostgreSQL** - PostgreSQL provides reliability, robust feature set, and strong support for complex queries and transactions, ensuring data integrity and scalability. It is used to store users and their history data.
- **WebRTC** - WebRTC is used for video calling facility, it enables real-time, peer-to-peer communication, offering seamless, secure, and high-quality video conferencing experiences over the internet.

![final](https://github.com/SayantanBong007/Caretakr/assets/94526347/44e6ab98-3ab2-46bd-bd01-0c021c00783c)

## Setup Guide
1. Run ```npm install``` in all 3 services i.e. caretaker, backend, and fit-band-server.
2. Make .env file in all 3 services and include all the environment variables.
    - ```caretaker``` OPENAI_API_KEY, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, OAUTH_CLIENT_ID

    - ```backend``` PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRE, COOKIE_EXPIRE, KAFKA_BROKER, KAFKA_USERNAME, KAFKA_PASSWORD, CLICKHOUSE_HOST, CLICKHOUSE_DATABASE, CLICKHOUSE_USERNAME, CLICKHOUSE_PASSWORD

    - ```fit-band-server``` KAFKA_BROKER, KAFKA_USERNAME, KAFKA_PASSWORD

3. Include *kafka.pem* file in backend and fit-band-server.
4. make sure to install the required dependencies
6. Run ```npm run dev``` in all 3 services i.e. caretaker, backend, and fit-band-server (make sure to have nodmeon in both backend and fit-band-server - ```npm install --save-dev nodemon```)

At this point following service would be up and running: 
|Service|PORT|
|------|------|
|caretaker|:3000|
|backend|:4000|
|fit-band-server|-|

## Demo Video and Presentation
[Watch the demo video and ppt of Caretakr](https://drive.google.com/drive/folders/1FYEoZ9-sR0QeXFEyHyLDOCkgJj-Np3Qg) 

