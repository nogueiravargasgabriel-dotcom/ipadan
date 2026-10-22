"use strict";

const STORAGE_KEY = "corpo-em-movimento-danca";
const state = { notes: {}, answers: {}, quizFinished: false };

const questions = [
  {
    id: 1,
    title: "Registros antigos da dança",
    support: "Os primeiros registros citados no texto datam de aproximadamente 9 000 a.C. a 8 000 a.C. e foram encontrados em paredes e rochas de cavernas. Algumas imagens mostram pessoas dançando ao redor de animais.",
    command: "Com base nessas informações, é possível relacionar esses registros",
    options: {
      A: "à criação do balé clássico nas cortes europeias.",
      B: "a possíveis práticas ritualísticas de grupos humanos.",
      C: "à dança contemporânea e à liberdade técnica.",
      D: "a apresentações teatrais destinadas exclusivamente à nobreza.",
      E: "à existência de coreografias escritas e padronizadas."
    },
    answer: "B",
    explanation: "O texto afirma que as cenas de pessoas dançando ao redor de animais podem estar ligadas à formação de danças ritualísticas."
  },
  {
    id: 2,
    title: "Corpo, ritual e identidade",
    support: "As expressões corporais criam uma linguagem simbólica por meio dos gestos. Por meio deles, o ritual pode concretizar e narrar mitos e transmitir tradições entre gerações.",
    command: "Nessa perspectiva, o corpo na dança ritualística atua como",
    options: {
      A: "um elemento sem relação com a identidade cultural.",
      B: "um meio de expressão, memória e transmissão cultural.",
      C: "uma ferramenta voltada apenas ao entretenimento individual.",
      D: "um obstáculo à manutenção das tradições coletivas.",
      E: "um recurso que elimina os significados simbólicos do ritual."
    },
    answer: "B",
    explanation: "O texto apresenta o corpo como portador de tradição, identidade cultural e pertencimento, além de meio de expressão simbólica."
  },
  {
    id: 3,
    title: "Dança e poder nas cortes",
    support: "Entre os séculos XIII e XIV, danças populares e folclóricas foram levadas aos palácios e adaptadas ao gosto aristocrático, que buscava ostentar riqueza e poder.",
    command: "A transformação descrita revela que a dança",
    options: {
      A: "permaneceu isolada das mudanças sociais e das relações de poder.",
      B: "foi adaptada a um novo contexto social e às preferências da nobreza.",
      C: "deixou de ser apresentada em espaços de corte.",
      D: "abandonou completamente qualquer forma de apresentação cênica.",
      E: "foi criada apenas como prática ritual religiosa."
    },
    answer: "B",
    explanation: "O texto descreve a adaptação de danças populares ao ambiente aristocrático e relaciona essa mudança à ostentação de riqueza e poder."
  },
  {
    id: 4,
    title: "Coreografia e organização do movimento",
    support: "Da dança simbólica dos rituais à dança de entretenimento, os passos deixaram de ser improvisados e passaram a seguir uma coreografia.",
    command: "A mudança descrita corresponde à",
    options: {
      A: "organização de sequências de movimentos por padrões e normas.",
      B: "eliminação de qualquer sequência de movimentos.",
      C: "substituição da dança por apresentações musicais.",
      D: "impossibilidade de transmitir danças entre gerações.",
      E: "retirada da dança dos espaços de entretenimento."
    },
    answer: "A",
    explanation: "Coreografia é definida no texto como uma sequência de movimentos orientada por padrões e normas."
  },
  {
    id: 5,
    title: "Ruptura com o balé clássico",
    support: "Isadora Duncan dançava descalça ou com sandálias e explorava movimentos naturais como andar, correr, saltar e respirar, inspirada também pelas figuras representadas em vasos gregos.",
    command: "As escolhas de Duncan expressam",
    options: {
      A: "a tentativa de reforçar exclusivamente os passos técnicos do balé clássico.",
      B: "a busca por movimentos naturais e por novas formas de expressão.",
      C: "a rejeição do movimento corporal como recurso artístico.",
      D: "a defesa de coreografias sem qualquer expressividade.",
      E: "a intenção de limitar a dança às apresentações ritualísticas."
    },
    answer: "B",
    explanation: "Duncan rompeu com convenções do balé clássico e valorizou gestos naturais e expressivos."
  },
  {
    id: 6,
    title: "Pesquisa do movimento",
    support: "Rudolf Laban pesquisou o movimento humano e explorou as diversas possibilidades de movimento oferecidas pelo corpo.",
    command: "A pesquisa de Laban evidencia uma concepção de dança voltada para",
    options: {
      A: "a investigação das possibilidades corporais.",
      B: "a reprodução obrigatória de uma única técnica.",
      C: "a eliminação de novos movimentos.",
      D: "a recusa do corpo como elemento expressivo.",
      E: "a manutenção inalterada das regras do balé clássico."
    },
    answer: "A",
    explanation: "O trabalho de Laban investigou o movimento humano e as possibilidades oferecidas pelo corpo."
  },
  {
    id: 7,
    title: "Cotidiano e dança contemporânea",
    support: "Pina Bausch incorporou gestos, temas e figurinos do cotidiano à dança, estabelecendo diálogos com o teatro. Suas coreografias provocavam o público e buscavam fazê-lo refletir sobre sua relação com o mundo.",
    command: "A proposta descrita mostra que a dança pode",
    options: {
      A: "restringir-se à reprodução de passos técnicos tradicionais.",
      B: "transformar ações cotidianas em material expressivo e reflexão.",
      C: "evitar qualquer diálogo com outras linguagens artísticas.",
      D: "separar completamente o palco das experiências humanas.",
      E: "existir apenas como entretenimento sem significado."
    },
    answer: "B",
    explanation: "Pina Bausch usou elementos cotidianos como material cênico e provocou reflexão sobre a experiência humana."
  }
];

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  loadState();
  setupMenu();
  setupNotes();
  setupButtons();
  renderQuiz();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return;

    state.notes = saved.notes || {};
    state.answers = saved.answers || {};
    state.quizFinished = Boolean(saved.quizFinished);

    document.querySelectorAll(".note-field").forEach((field) => {
      const id = field.dataset.noteId;
      if (id && state.notes[id]) field.value = state.notes[id];
    });
  } catch (error) {
    console.warn("Não foi possível carregar os dados salvos.", error);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Não foi possível salvar os dados.", error);
  }
}

function setupMenu() {
  const button = document.querySelector("#menu-button");
  const navigation = document.querySelector("#main-navigation");
  if (!button || !navigation) return;

  button.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    navigation.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
  });
}

function setupNotes() {
  document.querySelectorAll(".note-field").forEach((field) => {
    field.addEventListener("input", () => {
      state.notes[field.dataset.noteId] = field.value;
      saveState();
      updateSaveStatus(field);
    });
  });
}

function updateSaveStatus(field) {
  let status = field.id === "general-notes"
    ? document.querySelector("#general-save-status")
    : field.parentElement.querySelector(".save-status");

  if (!status && field.id !== "general-notes") {
    status = document.createElement("p");
    status.className = "save-status";
    field.insertAdjacentElement("afterend", status);
  }

  if (!status) return;
  status.textContent = "Anotação salva neste navegador.";
  clearTimeout(field.saveTimer);
  field.saveTimer = setTimeout(() => {
    status.textContent = "Alterações salvas automaticamente.";
  }, 1400);
}

function renderQuiz() {
  const container = document.querySelector("#quiz-container");
  if (!container) return;

  container.innerHTML = questions.map((question) => {
    const options = Object.entries(question.options).map(([letter, text]) => `
      <li>
        <label class="option-label">
          <input type="radio" name="question-${question.id}"
            value="${letter}" data-question="${question.id}"
            ${state.answers[question.id] === letter ? "checked" : ""}>
          <span><strong>${letter})</strong> ${escapeHtml(text)}</span>
        </label>
      </li>
    `).join("");

    return `
      <article class="question-card" id="question-card-${question.id}">
        <h3>Questão ${question.id}: ${escapeHtml(question.title)}</h3>
        <div class="question-support">
          <strong>Texto de apoio</strong>
          <p>${escapeHtml(question.support)}</p>
        </div>
        <div class="question-command">
          <strong>Comando</strong>
          <p>${escapeHtml(question.command)}</p>
        </div>
        <ul class="options-list">${options}</ul>
        <div class="question-feedback" id="feedback-${question.id}" hidden></div>
      </article>
    `;
  }).join("");

  container.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", () => {
      state.answers[input.dataset.question] = input.value;
      state.quizFinished = false;
      saveState();
    });
  });

  if (state.quizFinished) showCorrections();
}

function setupButtons() {
  document.querySelector("#finish-quiz")?.addEventListener("click", finishQuiz);
  document.querySelector("#reset-quiz")?.addEventListener("click", resetQuiz);
  document.querySelector("#generate-summary")?.addEventListener("click", renderSummary);
  document.querySelector("#copy-notes")?.addEventListener("click", copySummary);
  document.querySelector("#print-page")?.addEventListener("click", () => window.print());
}

function finishQuiz() {
  state.quizFinished = true;
  saveState();
  showCorrections();
}

function showCorrections() {
  let score = 0;

  questions.forEach((question) => {
    const card = document.querySelector(`#question-card-${question.id}`);
    const feedback = document.querySelector(`#feedback-${question.id}`);
    if (!card || !feedback) return;

    const selected = state.answers[question.id];
    const isCorrect = selected === question.answer;

    card.classList.remove("is-correct", "is-wrong");
    card.classList.add(isCorrect ? "is-correct" : "is-wrong");
    if (isCorrect) score++;

    feedback.hidden = false;
    feedback.innerHTML = selected
      ? `<strong>${isCorrect ? "Resposta correta!" : "Resposta para revisar."}</strong>
         <p>Você marcou <strong>${escapeHtml(selected)}</strong>. A alternativa correta é <strong>${question.answer}</strong>.</p>
         <p>${escapeHtml(question.explanation)}</p>`
      : `<strong>Questão não respondida.</strong>
         <p>A alternativa correta é <strong>${question.answer}</strong>.</p>
         <p>${escapeHtml(question.explanation)}</p>`;
  });

  const result = document.querySelector("#quiz-result");
  if (result) {
    result.hidden = false;
    result.textContent = `Resultado: ${score} de ${questions.length} questões corretas.`;
  }
}

function resetQuiz() {
  if (!window.confirm("Deseja limpar todas as respostas do desafio?")) return;

  state.answers = {};
  state.quizFinished = false;
  saveState();
  renderQuiz();

  const result = document.querySelector("#quiz-result");
  if (result) {
    result.hidden = true;
    result.textContent = "";
  }
}

function getScore() {
  return questions.reduce((score, question) =>
    score + (state.answers[question.id] === question.answer ? 1 : 0), 0);
}

function getFilledNotes() {
  return Object.entries(state.notes).filter(([, text]) =>
    typeof text === "string" && text.trim().length > 0
  );
}

function renderSummary() {
  const target = document.querySelector("#summary-content");
  if (!target) return;

  const score = getScore();
  const incorrect = questions.filter((question) =>
    state.answers[question.id] && state.answers[question.id] !== question.answer
  );
  const unanswered = questions.filter((question) => !state.answers[question.id]);
  const notes = getFilledNotes();

  target.innerHTML = `
    <div class="summary-item">
      <strong>Desempenho: ${score} de ${questions.length} questões corretas.</strong>
      <p>${score === questions.length
        ? "Você acertou todas as questões."
        : "Use os comentários das questões para revisar os temas que apresentaram dificuldade."}</p>
    </div>
    <div class="summary-item">
      <strong>Questões para revisar:</strong>
      <p>${incorrect.length
        ? incorrect.map((question) => `Questão ${question.id}: ${escapeHtml(question.title)}`).join("<br>")
        : "Nenhuma resposta incorreta registrada."}</p>
    </div>
    <div class="summary-item">
      <strong>Questões sem resposta:</strong>
      <p>${unanswered.length
        ? unanswered.map((question) => `Questão ${question.id}: ${escapeHtml(question.title)}`).join("<br>")
        : "Todas as questões foram respondidas."}</p>
    </div>
    <div class="summary-item">
      <strong>Anotações salvas:</strong>
      <p>${notes.length ? notes.map(([id, text]) =>
        `<b>${escapeHtml(noteTitle(id))}:</b> ${escapeHtml(text)}`
      ).join("<br><br>") : "Nenhuma anotação preenchida."}</p>
    </div>
    <div class="summary-item">
      <strong>Síntese:</strong>
      <p>A dança está presente em muitas culturas e pode atuar como ritual, linguagem simbólica, transmissão de tradições e entretenimento. Com o desenvolvimento da dança cênica e do balé, passos passaram a seguir coreografias. A dança moderna e contemporânea ampliou a pesquisa do movimento, a expressão corporal, o improviso e o diálogo com ações do cotidiano.</p>
    </div>
  `;
  document.querySelector("#revisao")?.scrollIntoView({ behavior: "smooth" });
}

function noteTitle(id) {
  const titles = {
    geral: "Anotações gerais",
    origens: "Origens",
    ritual: "Ritual e corpo",
    cenica: "Dança cênica",
    corte: "Corte e coreografia",
    moderna: "Dança moderna",
    contemporanea: "Dança contemporânea",
    sintese: "Síntese"
  };
  return titles[id] || id;
}

function createPlainTextSummary() {
  const notes = getFilledNotes();
  const notesText = notes.length
    ? notes.map(([id, text]) => `${noteTitle(id)}:\n${text}`).join("\n\n")
    : "Nenhuma anotação preenchida.";

  return `CORPO EM MOVIMENTO — REVISÃO DE DANÇA

Desempenho: ${getScore()} de ${questions.length} questões corretas.

ANOTAÇÕES
${notesText}

SÍNTESE
A dança pode atuar como ritual, linguagem simbólica, transmissão de tradições e entretenimento. Da dança cênica e do balé às rupturas da dança moderna e contemporânea, o corpo tornou-se espaço de expressão, investigação do movimento e reflexão sobre a vida cotidiana.`;
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(createPlainTextSummary());
    window.alert("Síntese copiada para a área de transferência.");
  } catch {
    window.alert("Não foi possível copiar automaticamente. Você pode selecionar e copiar o texto da revisão.");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}