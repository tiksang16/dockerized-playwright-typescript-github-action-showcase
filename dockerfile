# Use the official Playwright image as a base
FROM mcr.microsoft.com/playwright:v1.38.0-focal

# Install AWS CLI
RUN apt-get update && apt-get install -y unzip curl && \
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && ./aws/install && \
    rm -rf awscliv2.zip aws

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your code
COPY . .

# Run Playwright tests and upload results to S3
CMD ["sh", "-c", "npx playwright test && aws s3 cp ./test-results/ s3://eks-playwright-test-results/test-results/ --recursive"]