import subprocess
import sys
import os

def install_dependencies():
    """Instala as dependências necessárias para o projeto"""
    print("Instalando dependências necessárias para a aplicação Razão vs Revelação...")
    
    dependencies = [
        "flask==2.3.3",
        "flask-sqlalchemy==3.1.1",
        "flask-login==0.6.3",
        "psycopg2-binary==2.9.9",
        "email-validator==2.1.0",
        "sqlalchemy==2.0.23"
    ]
    
    # Tenta instalar cada dependência
    for dependency in dependencies:
        print(f"Instalando {dependency}...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", dependency])
            print(f"✓ {dependency} instalado com sucesso!")
        except Exception as e:
            print(f"✗ Erro ao instalar {dependency}: {str(e)}")
    
    print("\nInstalação concluída!")
    print("Agora você pode executar a aplicação com: python run.py")

if __name__ == "__main__":
    install_dependencies()