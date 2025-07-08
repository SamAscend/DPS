FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Copy dependencies and install them
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application source code
COPY . .

# Expose the port Flask app will run on
EXPOSE 5000

# Run the Flask-SocketIO app with eventlet
CMD ["python", "app.py"]
