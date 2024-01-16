from app import app, socketio


@socketio.on('code-change')
def handle_message(data):
    print(data)
    socketio.emit('receive_message', data)


if __name__ == '__main__':
    socketio.run(app, debug=True, port=12345)
