#!/bin/bash

echo "Iniciando aplicação Razão Humana vs Revelação Divina..."
echo ""

# Verifica se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "Python 3 não foi encontrado! Por favor, instale o Python 3.6 ou superior."
    echo "Visite: https://www.python.org/downloads/"
    exit 1
fi

# Configurar variável de ambiente para SQLite
export DATABASE_URL="sqlite:///razao_revelacao.db"

# Executar a aplicação
echo "Iniciando o servidor local..."
python3 run.py