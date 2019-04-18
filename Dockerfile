FROM node:9.4

# Create app directory
WORKDIR /usr/src/app

# Expose port for service
EXPOSE 3000

# Install and configure `serve`.
# RUN npm install -g serve

# Copy source code to image
COPY ./build /usr/src/app/build

# CMD serve -s build
CMD ["npm","start"]
