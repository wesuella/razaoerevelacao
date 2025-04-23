from datetime import datetime
from flask import flash, jsonify, redirect, render_template, request, url_for
from app import app, db
from models import Comentario, Visualizacao

# Adicionar função para disponibilizar data e hora atual nos templates
@app.context_processor
def utility_processor():
    return {
        'now': datetime.now
    }


@app.route('/')
def index():
    """Render the main page with the interactive graph"""
    return render_template('index.html')


@app.route('/api/visualizacao', methods=['POST'])
def registrar_visualizacao():
    """API para registrar as visualizações do gráfico"""
    data = request.json
    ip = request.remote_addr
    
    # Validar dados recebidos
    if not data or 'razao' not in data or 'revelacao' not in data:
        return jsonify({'success': False, 'error': 'Dados incompletos'}), 400
    
    # Criar nova visualização
    try:
        visualizacao = Visualizacao(
            valor_razao=float(data['razao']),
            valor_revelacao=float(data['revelacao']),
            ip_usuario=ip
        )
        
        db.session.add(visualizacao)
        db.session.commit()
        
        return jsonify({
            'success': True, 
            'id': visualizacao.id,
            'message': 'Visualização registrada com sucesso'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/comentarios')
def listar_comentarios():
    """Página que lista todos os comentários aprovados"""
    comentarios = Comentario.query.filter_by(aprovado=True).order_by(Comentario.data_hora.desc()).all()
    return render_template('comentarios.html', comentarios=comentarios)


@app.route('/enviar-comentario', methods=['GET', 'POST'])
def enviar_comentario():
    """Página para enviar comentários"""
    if request.method == 'POST':
        nome = request.form.get('nome')
        email = request.form.get('email')
        texto = request.form.get('texto')
        visualizacao_id = request.form.get('visualizacao_id')
        
        # Validar dados
        if not nome or not texto:
            flash('Por favor, preencha todos os campos obrigatórios.', 'danger')
            return redirect(url_for('enviar_comentario'))
        
        # Criar novo comentário
        comentario = Comentario(
            nome=nome,
            email=email,
            texto=texto
        )
        
        # Associar à visualização, se houver
        if visualizacao_id:
            visualizacao = Visualizacao.query.get(visualizacao_id)
            if visualizacao:
                comentario.visualizacao = visualizacao
        
        try:
            db.session.add(comentario)
            db.session.commit()
            flash('Seu comentário foi enviado e está aguardando aprovação. Obrigado!', 'success')
            return redirect(url_for('listar_comentarios'))
        except Exception as e:
            db.session.rollback()
            flash(f'Erro ao enviar comentário: {str(e)}', 'danger')
    
    # Para requisições GET, apenas renderizar o formulário
    visualizacao_id = request.args.get('visualizacao_id')
    return render_template('enviar_comentario.html', visualizacao_id=visualizacao_id)