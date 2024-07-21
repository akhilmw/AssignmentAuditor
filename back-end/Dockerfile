# Build Stage
FROM amazoncorretto:17.0.12-al2-native-jdk as build

WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Install dependencies
RUN ./mvnw dependency:go-offline -B

# Copy the source code
COPY src src

# Package the application
RUN ./mvnw package -DskipTests

# Create the target/dependency directory and extract the JAR file into it
RUN mkdir -p target/dependency && \
    cd target/dependency && \
    jar -xf ../*.jar

# Runtime Stage
FROM amazoncorretto:17.0.12-al2-native-jdk

# Set the path to the extracted application files
ARG DEPENDENCY=/app/target/dependency

# Copy the application files from the build stage
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib/ app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

# Copy the wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh

# Define the command to run the application
CMD ["sh", "/wait-for-it.sh", "mysqldb:3306", "--", "java", "-cp", "app:app/lib/*", "org.akhil.assignmentauditor.AssignmentAuditorApplication"]
