from app import db

class CodeBlock(db.Model):
    __tablename__ = 'code_blocks'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    code = db.Column(db.Text, nullable=False)
    solution = db.Column(db.Text)

    def json(self):
        return {'id': self.id, 'title': self.title, 'code': self.code, 'solution': self.solution}
