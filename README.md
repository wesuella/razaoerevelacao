# Aplicação Razão Humana vs Revelação Divina

Esta aplicação interativa visualiza a relação inversa entre a Razão Humana e a Revelação Divina, mostrando como a dependência em Deus aumenta conforme diminuímos a confiança em nossa própria razão.

## Recursos

- Gráfico interativo mostrando a relação inversa entre Razão e Revelação
- 11 níveis de mensagens teológicas com citações bíblicas
- Sistema de comentários para compartilhar reflexões
- Banco de dados para armazenar visualizações e comentários

## Requisitos

- Python 3.6 ou superior
- Bibliotecas Python: Flask, SQLAlchemy, Flask-Login, psycopg2-binary (ou sqlite3 para desenvolvimento local)

## Instruções para Execução Local

1. Clone este repositório para sua máquina local

2. Crie um ambiente virtual (opcional, mas recomendado):
   ```
   python -m venv venv
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. Instale as dependências:
   ```
   pip install flask flask-sqlalchemy flask-login psycopg2-binary
   ```

4. Configure a variável de ambiente para o banco de dados (opcional, padrão usa SQLite):
   ```
   # Linux/Mac
   export DATABASE_URL="sqlite:///razao_revelacao.db"
   
   # Windows (cmd)
   set DATABASE_URL=sqlite:///razao_revelacao.db
   
   # Windows (PowerShell)
   $env:DATABASE_URL="sqlite:///razao_revelacao.db"
   ```

5. Execute a aplicação:
   ```
   python run.py
   ```

O servidor será iniciado em `http://localhost:5000/` e seu navegador abrirá automaticamente.

## Desenvolvimento

Para desenvolver e estender esta aplicação:

- Os modelos de banco de dados estão em `models.py`
- As rotas e controladores estão em `routes.py`
- A lógica do gráfico interativo está em `static/js/graph.js`
- Os templates HTML estão na pasta `templates/`

## Conceito Teológico

A aplicação visualiza o conceito teológico da relação inversa entre a confiança na razão humana e a abertura à revelação divina. Quanto mais confiamos em nossa própria sabedoria, menos espaço temos para receber a revelação de Deus, e vice-versa.

As mensagens exibidas em cada nível representam diferentes estágios da jornada espiritual, partindo de um estado de orgulho e autossuficiência até a completa dependência e comunhão com Deus, aguardando a volta de Cristo.