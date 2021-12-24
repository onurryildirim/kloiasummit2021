FROM adoptopenjdk/openjdk11:latest

MAINTAINER saidmengi

VOLUME /tmp
EXPOSE 8080
ADD target/student-service-0.0.1-SNAPSHOT.jar student-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","/student-service-0.0.1-SNAPSHOT.jar"]
