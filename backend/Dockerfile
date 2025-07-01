FROM python:3.10-slim

# Set workdir
WORKDIR /app

# Copy requirements & install dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy seluruh source code ke container
COPY . .

# Expose port 5000 (sama seperti yang digunakan Flask)
EXPOSE 5000

# Jalankan aplikasi menggunakan socketio + eventlet
CMD ["python", "app.py"]
