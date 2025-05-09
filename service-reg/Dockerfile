FROM maven:3.8.4-openjdk-17-slim AS build

WORKDIR /app
COPY . .

RUN unset MAVEN_CONFIG && ./mvnw clean package -DskipTests

RUN cp /app/target/service-reg-1.0.0.jar app.jar

FROM azul/zulu-openjdk-alpine:17.0.0

WORKDIR /app

COPY --from=build /app/app.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]

