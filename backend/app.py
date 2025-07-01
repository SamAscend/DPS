import eventlet
eventlet.monkey_patch()


from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

notes = []

@app.route('/notes', methods=['GET'])
def get_notes():
    return jsonify(notes)

@app.route('/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    text = data.get('text', '')
    if not text:
        return jsonify({"error": "Text cannot be empty"}), 400

    new_note = {
        "id": len(notes) + 1,
        "text": text
    }
    notes.append(new_note)
    socketio.emit('note_added', new_note)  # Real-time update
    return jsonify(new_note), 201

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
