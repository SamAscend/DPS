# Use official NGINX image to serve static frontend files
FROM nginx:alpine

# Copy the built frontend files to NGINX's default public directory
COPY build/ /usr/share/nginx/html

# Expose port 80 to serve the app
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
