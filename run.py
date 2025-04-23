import os
import webbrowser
import threading
import time
from app import app, db
import routes  # noqa: F401

def open_browser():
    """Abre o navegador após 1.5 segundos"""
    time.sleep(1.5)
    webbrowser.open('http://localhost:5000/')

if __name__ == '__main__':
    print("Iniciando o servidor...")
    print("Verificando banco de dados...")
    
    # Criar tabelas se não existirem
    with app.app_context():
        db.create_all()
        print("Banco de dados pronto!")

    # Inicie um thread para abrir o navegador
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    # Inicie o servidor
    print("Iniciando aplicação em http://localhost:5000/")
    print("Pressione Ctrl+C para encerrar o servidor")
    app.run(host='0.0.0.0', port=5000, debug=False)