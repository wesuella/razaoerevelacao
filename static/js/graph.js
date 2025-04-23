// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the slider, value display, and graph canvas elements
  const slider = document.getElementById("razao-slider") || document.getElementById("human-reason");
  const razaoValue = document.getElementById("razao-value") || document.getElementById("reason-value");
  const divineValue = document.getElementById("divine-value");
  const graphCanvas = document.getElementById("graph");
  const ctx = graphCanvas.getContext("2d");

  // Set canvas dimensions and make it responsive
  function resizeCanvas() {
    const container = graphCanvas.parentElement;
    graphCanvas.width = container.offsetWidth;
    graphCanvas.height = 400;
    drawGraph(parseFloat(slider.value));
  }

  // Function to draw the graph with the given human reason value
  // Variável para guardar o ID da última visualização
  let currentVisualizacaoId = null;

  // Função para registrar visualização no servidor
  function registrarVisualizacao(razao, revelacao) {
    fetch('/api/visualizacao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razao: razao,
        revelacao: revelacao
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        currentVisualizacaoId = data.id;
        
        // Atualizar o link para comentar com o ID da visualização
        const commentLink = document.getElementById("comment-link");
        if (commentLink) {
          commentLink.href = `/enviar-comentario?visualizacao_id=${currentVisualizacaoId}`;
        }
      }
    })
    .catch(error => {
      console.error('Erro ao registrar visualização:', error);
    });
  }

  // Variável para controlar o tempo desde a última atualização
  let lastUpdateTime = 0;
  const UPDATE_INTERVAL = 2000; // Intervalo mínimo entre atualizações (2 segundos)

  function drawGraph(razao) {
    // Calculate the divine revelation value
    const divineRevelation = 1 / razao;
    
    // Update text displays
    razaoValue.textContent = razao.toFixed(1);
    divineValue.textContent = divineRevelation.toFixed(4);
    
    // Registrar visualização no servidor (limitado por tempo para não sobrecarregar)
    const now = Date.now();
    if (now - lastUpdateTime > UPDATE_INTERVAL) {
      registrarVisualizacao(razao, divineRevelation);
      lastUpdateTime = now;
    }
    
    // Exibir mensagens conforme o nível da razão humana
    // 1. Ocultar todas as mensagens primeiro
    try {
      const allMessages = document.querySelectorAll(".dependency-message");
      if (allMessages && allMessages.length > 0) {
        allMessages.forEach(msg => {
          msg.style.display = "none";
        });
      }
    } catch (error) {
      console.log("Erro ao ocultar mensagens:", error);
    }
    
    // 2. Mostrar a mensagem correspondente ao nível atual
    try {
      if (razao >= 9.5) {
        // Nível 10: Razão máxima - Orgulho e autossuficiência
        const el = document.getElementById("message-level-10");
        if (el) el.style.display = "block";
      } else if (razao >= 8.5) {
        // Nível 9: Arrogância intelectual
        const el = document.getElementById("message-level-9");
        if (el) el.style.display = "block";
      } else if (razao >= 7.5) {
        // Nível 8: Confiança excessiva na razão
        const el = document.getElementById("message-level-8");
        if (el) el.style.display = "block";
      } else if (razao >= 6.5) {
        // Nível 7: Ceticismo espiritual
        const el = document.getElementById("message-level-7");
        if (el) el.style.display = "block";
      } else if (razao >= 5.5) {
        // Nível 6: Equilíbrio instável
        const el = document.getElementById("message-level-6");
        if (el) el.style.display = "block";
      } else if (razao >= 4.5) {
        // Nível 5: Primeiros sinais de rendição
        const el = document.getElementById("message-level-5");
        if (el) el.style.display = "block";
      } else if (razao >= 3.5) {
        // Nível 4: Começando a confiar em Deus
        const el = document.getElementById("message-level-4");
        if (el) el.style.display = "block";
      } else if (razao >= 2.5) {
        // Nível 3: Crescimento espiritual
        const el = document.getElementById("message-level-3");
        if (el) el.style.display = "block";
      } else if (razao >= 1.5) {
        // Nível 2: Mais dependência em Deus
        const el = document.getElementById("message-level-2");
        if (el) el.style.display = "block";
      } else if (razao >= 0.5) {
        // Nível 1: Rendição quase completa
        const el = document.getElementById("message-level-1");
        if (el) el.style.display = "block";
      } else {
        // Nível 0: Caminhando com Deus até a volta de Cristo
        const el = document.getElementById("message-level-0");
        if (el) el.style.display = "block";
      }
    } catch (error) {
      console.log("Erro ao exibir mensagem:", error);
    }
    
    // Canvas dimensions
    const width = graphCanvas.width;
    const height = graphCanvas.height;

    // Clear the previous drawing
    ctx.clearRect(0, 0, width, height);

    // Set up margins and graph dimensions
    const margin = {top: 50, right: 50, bottom: 50, left: 60};
    const graphWidth = width - margin.left - margin.right;
    const graphHeight = height - margin.top - margin.bottom;

    // Define maximum values for axes
    const maxH = 10; // Maximum human reason value
    const maxD = 1;  // Maximum divine revelation value (theoretical)

    // Set up scaling factors for converting data values to pixel positions
    const scaleX = graphWidth / maxH;
    const scaleY = graphHeight / maxD;

    // Draw background grid
    ctx.beginPath();
    ctx.strokeStyle = "rgba(200, 200, 200, 0.2)";
    ctx.lineWidth = 0.5;
    
    // Vertical grid lines
    for (let i = 0; i <= maxH; i++) {
      const x = margin.left + i * scaleX;
      ctx.moveTo(x, margin.top);
      ctx.lineTo(x, height - margin.bottom);
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= maxD * 10; i++) {
      const y = height - margin.bottom - (i / 10) * scaleY;
      ctx.moveTo(margin.left, y);
      ctx.lineTo(width - margin.right, y);
    }
    ctx.stroke();

    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    
    // Y-axis (Divine Revelation)
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, height - margin.bottom);
    
    // X-axis (Human Reason)
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.stroke();

    // Add axis labels
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.font = "14px Arial, sans-serif";
    ctx.textAlign = "center";
    
    // X-axis label
    ctx.fillText("Razão Humana (H)", width / 2, height - 10);
    
    // Y-axis label (rotated)
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText("Revelação Divina (D)", 0, 0);
    ctx.restore();

    // Add tick marks and values on axes
    ctx.font = "12px Arial, sans-serif";
    ctx.textAlign = "center";
    
    // X-axis ticks
    for (let i = 0; i <= maxH; i += 1) {
      if (i % 1 === 0) {
        const x = margin.left + i * scaleX;
        ctx.beginPath();
        ctx.moveTo(x, height - margin.bottom);
        ctx.lineTo(x, height - margin.bottom + 5);
        ctx.stroke();
        ctx.fillText(i.toString(), x, height - margin.bottom + 20);
      }
    }
    
    // Y-axis ticks
    ctx.textAlign = "right";
    for (let i = 0; i <= maxD * 10; i += 1) {
      if (i % 2 === 0) {
        const y = height - margin.bottom - (i / 10) * scaleY;
        ctx.beginPath();
        ctx.moveTo(margin.left, y);
        ctx.lineTo(margin.left - 5, y);
        ctx.stroke();
        ctx.fillText((i / 10).toFixed(1), margin.left - 10, y + 4);
      }
    }

    // Draw the hyperbola curve
    ctx.beginPath();
    ctx.strokeStyle = "rgba(13, 110, 253, 0.8)";
    ctx.lineWidth = 3;
    
    const points = [];
    // Generate more points for smoother curve
    for (let i = 0; i <= 1000; i++) {
      const h = (i / 1000) * maxH;
      if (h < 0.1) continue; // Avoid division by zero or very small numbers
      
      const d = 1 / h;
      if (d > maxD) continue; // Skip very high values
      
      const x = margin.left + h * scaleX;
      const y = height - margin.bottom - d * scaleY;
      
      points.push({x, y});
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Add smooth gradient fill under the curve
    const gradient = ctx.createLinearGradient(0, margin.top, 0, height - margin.bottom);
    gradient.addColorStop(0, "rgba(13, 110, 253, 0.7)");
    gradient.addColorStop(1, "rgba(13, 110, 253, 0.1)");
    
    ctx.beginPath();
    ctx.moveTo(margin.left, height - margin.bottom);
    
    // Add points to create the fill area
    for (const point of points) {
      ctx.lineTo(point.x, point.y);
    }
    
    // Close the path
    ctx.lineTo(width - margin.right, height - margin.bottom);
    ctx.closePath();
    
    ctx.fillStyle = gradient;
    ctx.fill();

    // Draw the current point on the curve
    const currentX = margin.left + razao * scaleX;
    const currentY = height - margin.bottom - divineRevelation * scaleY;
    
    // Draw highlight lines to axes
    ctx.beginPath();
    ctx.setLineDash([5, 3]);
    ctx.strokeStyle = "rgba(255, 193, 7, 0.6)";
    ctx.lineWidth = 1;
    
    // Vertical line to x-axis
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(currentX, height - margin.bottom);
    
    // Horizontal line to y-axis
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(margin.left, currentY);
    ctx.stroke();
    
    // Reset dash
    ctx.setLineDash([]);

    // Draw point
    ctx.beginPath();
    ctx.arc(currentX, currentY, 8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 193, 7, 0.9)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add value labels near the point
    ctx.font = "12px Arial, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    
    // Position the labels for better visibility
    const labelOffsetX = 10;
    const labelOffsetY = 15;
    
    // Adjust label position to avoid going off-screen
    let pointLabelX = currentX + labelOffsetX;
    let pointLabelY = currentY - labelOffsetY;
    
    // Ensure labels are within bounds
    if (pointLabelX > width - margin.right - 60) {
      pointLabelX = currentX - labelOffsetX - 60;
    }
    
    if (pointLabelY < margin.top + 20) {
      pointLabelY = currentY + labelOffsetY + 20;
    }
    
    // Draw point value label with background
    ctx.fillStyle = "rgba(52, 58, 64, 0.8)";
    ctx.fillRect(pointLabelX - 5, pointLabelY - 15, 70, 20);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.textAlign = "left";
    ctx.fillText(`H=${razao.toFixed(1)}, D=${divineRevelation.toFixed(3)}`, pointLabelX, pointLabelY);
  }

  // Add event listener for slider changes
  slider.addEventListener("input", function(e) {
    const razao = parseFloat(e.target.value);
    drawGraph(razao);
  });

  // Add window resize listener to keep the canvas responsive
  window.addEventListener('resize', function() {
    resizeCanvas();
  });

  // Initialize the canvas and draw the graph
  resizeCanvas();
});
