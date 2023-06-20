FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the source code from the host to the working directory
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Set the PORT environment variable
ENV PORT=3000

# Start the application
CMD ["npm","run", "start:prod"]
