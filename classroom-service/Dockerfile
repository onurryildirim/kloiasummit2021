FROM adoptopenjdk/openjdk11:latest

MAINTAINER saidmengi

VOLUME /tmp
EXPOSE 8081
ADD target/classroom-service-0.0.1-SNAPSHOT.jar classroom-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/classroom-service-0.0.1-SNAPSHOT.jar"]
