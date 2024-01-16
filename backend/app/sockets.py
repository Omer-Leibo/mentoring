from flask_socketio import SocketIO, emit
from app import socketio, db 

@socketio.on('connect')
def handle_connect(): # This function distincts mentor from student
    global users_counter
    users_counter = 0

    from app.models import CodeBlock  # This import is here to avoid circular imports
    code_block = CodeBlock.query.get(block_id)
    code_block.code = new_code
    db.session.commit()

    # For simplicity, I'm emitting the code change back to all clients
    emit('code-change', {'block_id': block_id, 'new_code': new_code}, broadcast=True)
