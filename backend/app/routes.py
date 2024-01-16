from app import app, db
from flask import jsonify, request, make_response
from app.models import CodeBlock

users_counter = [0,0,0,0] # 4 code block ids

@app.route('/api/v1/code_blocks', methods=['GET']) # Get all code blocks
def get_all_code_blocks():
    code_blocks = CodeBlock.query.all()
    return jsonify([{'id': code_block.id, 'title': code_block.title, 'code': code_block.code} for code_block in code_blocks])

@app.route('/api/v1/blocks/<int:block_id>', methods=['GET']) # Get a specific code block by id
def get_code_block(block_id):
    code_block = CodeBlock.query.get(block_id)
    return jsonify({'title': code_block.title, 'code': code_block.code})

@app.route('/api/v1/is_mentor', methods=['GET']) # Check if user is mentor
def is_mentor():
    global users_counter 
    code_block_id = request.args.get("block_id")
    block_id = int(code_block_id)
    if users_counter[block_id] == 0:
        is_mentor = True
    else:
        is_mentor = False
    users_counter[block_id] += 1
    return jsonify({'block_id': block_id, 'is_mentor': is_mentor})


@app.route('/post', methods=['POST']) # Post a new code block
def post_code_to_db():
    data = request.get_json()
    new_data = CodeBlock(id= data['id'], title=data['title'], code=data['code'], solution=data['solution'])
    db.session.add(new_data)
    db.session.commit()
    return make_response(jsonify({'message': new_data.json()}), 201)

@app.route('/delete/<int:block_id>', methods=['DELETE']) # Delete a code block
def delete_code_block(block_id):
    code_block = CodeBlock.query.get(block_id)
    db.session.delete(code_block)
    db.session.commit()
    return make_response(jsonify({'message': 'Deleted'}), 201)