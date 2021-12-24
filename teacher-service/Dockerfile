FROM adoptopenjdk/openjdk11:latest

MAINTAINER saidmengi

VOLUME /tmp
EXPOSE 8082
ADD target/teacher-service-0.0.1-SNAPSHOT.jar teacher-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/teacher-service-0.0.1-SNAPSHOT.jar"]
