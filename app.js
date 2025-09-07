const perguntas = document.querySelectorAll(".pergunta");
const botoes = document.querySelectorAll(".pergunta-btn");
const pesquisaInput = document.getElementById("pesquisaFAQ");

// Função para atualizar o contador
function atualizarContador() {
  const perguntasAbertas = document.querySelectorAll(".mostrar-texto").length;
  const total = document.querySelectorAll(".pergunta").length;
  const contadorElement = document.getElementById("contador");
  contadorElement.textContent = `${perguntasAbertas} de ${total} perguntas abertas`;
}

// Função para expandir/recolher todas as perguntas
function toggleTodasPerguntas(expandir = true) {
  perguntas.forEach(pergunta => {
    if(expandir) {
      pergunta.classList.add("mostrar-texto");
    } else {
      pergunta.classList.remove("mostrar-texto");
    }
  });
  atualizarContador();
}

// Função para filtrar perguntas
function filtrarPerguntas(termo) {
  perguntas.forEach(pergunta => {
    const texto = pergunta.textContent.toLowerCase();
    const busca = termo.toLowerCase();
    pergunta.style.display = texto.includes(busca) ? "block" : "none";
  });
}

// Função para registrar feedback
function registrarFeedback(btn, util) {
  const feedback = btn.closest(".feedback");
  feedback.innerHTML = `<p>Obrigado pelo seu feedback!</p>`;
  setTimeout(() => {
    feedback.style.display = "none";
  }, 2000);
}

// Adicionar feedback para cada pergunta
perguntas.forEach(pergunta => {
  const feedbackHTML = `
    <div class="feedback">
      <p>Esta resposta foi útil?</p>
      <button class="feedback-btn" onclick="registrarFeedback(this, true)">👍</button>
      <button class="feedback-btn" onclick="registrarFeedback(this, false)">👎</button>
    </div>
  `;
  pergunta.querySelector(".pergunta-texto").insertAdjacentHTML("beforeend", feedbackHTML);
});

// Event listeners
botoes.forEach(function (botao) {
  botao.addEventListener("click", function (e) {
    const pergunta = e.currentTarget.parentElement.parentElement;
    pergunta.classList.toggle("mostrar-texto");
    pergunta.scrollIntoView({ behavior: 'smooth', block: 'center' });
    atualizarContador();
  });
});

pesquisaInput.addEventListener("input", (e) => {
  filtrarPerguntas(e.target.value);
});

// Inicializar contador
atualizarContador();
