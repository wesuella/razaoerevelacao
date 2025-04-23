@echo off
echo Iniciando aplicacao Razao Humana vs Revelacao Divina...
echo.

rem Verifica se Python esta instalado
where python >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Python nao foi encontrado! Por favor, instale o Python 3.6 ou superior.
    echo Visite: https://www.python.org/downloads/
    pause
    exit /b
)

rem Configurar variavel de ambiente para SQLite
set DATABASE_URL=sqlite:///razao_revelacao.db

rem Executar a aplicacao
echo Iniciando o servidor local...
python run.py

pause