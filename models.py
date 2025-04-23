from datetime import datetime
from app import db


class Visualizacao(db.Model):
    """Model para armazenar informações sobre cada visualização do gráfico"""
    id = db.Column(db.Integer, primary_key=True)
    data_hora = db.Column(db.DateTime, default=datetime.utcnow)
    valor_razao = db.Column(db.Float, nullable=False)
    valor_revelacao = db.Column(db.Float, nullable=False)
    ip_usuario = db.Column(db.String(45), nullable=True)
    
    # Relacionamento com os comentários
    comentarios = db.relationship('Comentario', backref='visualizacao', lazy=True)
    
    def __repr__(self):
        return f'<Visualizacao id={self.id}, razao={self.valor_razao}, revelacao={self.valor_revelacao}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'data_hora': self.data_hora.isoformat(),
            'valor_razao': self.valor_razao,
            'valor_revelacao': self.valor_revelacao
        }


class Comentario(db.Model):
    """Model para armazenar comentários dos usuários sobre o gráfico"""
    id = db.Column(db.Integer, primary_key=True)
    data_hora = db.Column(db.DateTime, default=datetime.utcnow)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), nullable=True)
    texto = db.Column(db.Text, nullable=False)
    aprovado = db.Column(db.Boolean, default=False)
    
    # Relacionamento com a visualização (opcional)
    visualizacao_id = db.Column(db.Integer, db.ForeignKey('visualizacao.id'), nullable=True)
    
    def __repr__(self):
        return f'<Comentario id={self.id}, nome={self.nome}, aprovado={self.aprovado}>'