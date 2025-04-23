import os
import sqlite3
from app import app, db
from models import Visualizacao, Comentario

def configure_local_db():
    """Configura o banco de dados local SQLite para a aplicação"""
    print("Configurando banco de dados local para a aplicação Razão vs Revelação...")
    
    # Configura a variável de ambiente para usar SQLite
    os.environ["DATABASE_URL"] = "sqlite:///razao_revelacao.db"
    
    # Cria as tabelas no banco de dados
    try:
        with app.app_context():
            print("Criando tabelas no banco de dados...")
            db.create_all()
            print("✓ Tabelas criadas com sucesso!")
            
            # Verifica se já existem registros
            visualizacoes_count = Visualizacao.query.count()
            comentarios_count = Comentario.query.count()
            
            print(f"Banco de dados inicializado com:")
            print(f"- {visualizacoes_count} visualizações")
            print(f"- {comentarios_count} comentários")
            
    except Exception as e:
        print(f"✗ Erro ao configurar banco de dados: {str(e)}")
    
    print("\nConfiguração concluída!")
    print("Agora você pode executar a aplicação com: python run.py")

if __name__ == "__main__":
    configure_local_db()