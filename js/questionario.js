/* Questionário de perfil — JavaScript Vanilla */
(function () {
  "use strict";

  /* Cada opção pontua um perfil:
     C = Comunicador  | A = Analítico
     L = Líder         | E = Executor */
  var QUESTIONS = [
    {
      q: "Em uma reunião nova, você normalmente:",
      options: [
        { t: "Quebra o gelo e puxa conversa", p: "C" },
        { t: "Observa e analisa antes de falar", p: "A" },
        { t: "Assume a condução da pauta", p: "L" },
        { t: "Foca em decidir o próximo passo prático", p: "E" }
      ]
    },
    {
      q: "Quando recebe uma tarefa nova, você:",
      options: [
        { t: "Conversa com colegas para entender melhor", p: "C" },
        { t: "Pesquisa e planeja antes de começar", p: "A" },
        { t: "Divide com a equipe e delega partes", p: "L" },
        { t: "Começa imediatamente e ajusta no caminho", p: "E" }
      ]
    },
    {
      q: "Sob pressão, sua reação típica é:",
      options: [
        { t: "Pedir ajuda e alinhar com o time", p: "C" },
        { t: "Mapear riscos antes de agir", p: "A" },
        { t: "Organizar todos e definir prioridades", p: "L" },
        { t: "Colocar a mão na massa para resolver", p: "E" }
      ]
    },
    {
      q: "Você se sente mais confortável:",
      options: [
        { t: "Apresentando ideias para um grupo", p: "C" },
        { t: "Estudando dados e construindo soluções", p: "A" },
        { t: "Conduzindo projetos e pessoas", p: "L" },
        { t: "Entregando resultados concretos", p: "E" }
      ]
    },
    {
      q: "Ao receber feedback negativo, você:",
      options: [
        { t: "Conversa para entender a perspectiva", p: "C" },
        { t: "Analisa o que pode melhorar com calma", p: "A" },
        { t: "Define um plano de ação claro", p: "L" },
        { t: "Aplica a mudança na próxima entrega", p: "E" }
      ]
    },
    {
      q: "Numa entrevista, sua maior força é:",
      options: [
        { t: "Conexão e empatia", p: "C" },
        { t: "Raciocínio e profundidade", p: "A" },
        { t: "Visão e liderança", p: "L" },
        { t: "Foco em resultado", p: "E" }
      ]
    },
    {
      q: "Você prefere trabalhar:",
      options: [
        { t: "Em equipes colaborativas", p: "C" },
        { t: "Com tempo para pensar profundamente", p: "A" },
        { t: "Liderando iniciativas", p: "L" },
        { t: "Com metas e prazos claros", p: "E" }
      ]
    },
    {
      q: "Ao resolver um problema, o que vem primeiro?",
      options: [
        { t: "Conversar com quem entende do tema", p: "C" },
        { t: "Levantar dados e entender o contexto", p: "A" },
        { t: "Mobilizar pessoas em torno da solução", p: "L" },
        { t: "Testar uma solução o quanto antes", p: "E" }
      ]
    },
    {
      q: "Como você se descreveria em uma palavra?",
      options: [
        { t: "Comunicativo", p: "C" },
        { t: "Analítico", p: "A" },
        { t: "Líder", p: "L" },
        { t: "Realizador", p: "E" }
      ]
    },
    {
      q: "O que você mais quer melhorar?",
      options: [
        { t: "Falar em público com mais segurança", p: "C" },
        { t: "Tomar decisões mais rápidas", p: "A" },
        { t: "Delegar e dar feedback", p: "L" },
        { t: "Planejar com mais antecedência", p: "E" }
      ]
    }
  ];

  var PROFILES = {
    C: {
      name: "Perfil Comunicador",
      description:
        "Você se conecta facilmente com as pessoas. Empresas valorizam sua empatia, escuta e capacidade de articular ideias.",
      tips: [
        "Prepare exemplos curtos (situação → ação → resultado) para mostrar impacto, não só fala.",
        "Use a técnica STAR ao responder perguntas comportamentais.",
        "Cuide do tom: evite parecer apenas simpático — mostre também execução.",
        "Pratique pausas; comunicadores tendem a falar muito sob ansiedade.",
        "Tenha uma pergunta inteligente sobre cultura ou equipe para o entrevistador."
      ]
    },
    A: {
      name: "Perfil Analítico",
      description:
        "Você pensa com profundidade, baseia decisões em dados e enxerga riscos. É forte em áreas técnicas e de planejamento.",
      tips: [
        "Traduza dados em histórias: o entrevistador precisa entender o impacto.",
        "Treine respostas mais objetivas — evite explicações longas demais.",
        "Demonstre colaboração: cite momentos em que trabalhou com outras áreas.",
        "Tenha exemplos concretos de problemas que resolveu com análise.",
        "Prepare perguntas sobre processos, ferramentas e métricas da vaga."
      ]
    },
    L: {
      name: "Perfil Líder",
      description:
        "Você toma a frente, organiza pessoas e tem visão de processo. Forte para cargos de coordenação e gestão.",
      tips: [
        "Mostre humildade: liderança real inclui escutar e errar.",
        "Tenha exemplos de quando delegou e desenvolveu alguém.",
        "Use indicadores: quantas pessoas, quais resultados, em quanto tempo.",
        "Prepare-se para perguntas sobre conflitos resolvidos.",
        "Pergunte sobre desafios atuais da equipe — demonstra interesse genuíno."
      ]
    },
    E: {
      name: "Perfil Executor",
      description:
        "Você é direto, prático e orientado a entrega. Empresas que valorizam resultado rápido amam esse perfil.",
      tips: [
        "Mostre que também planeja — não só executa.",
        "Inclua exemplos de aprendizado com erros, não só de sucesso.",
        "Cuide para não parecer impaciente nas respostas: ouça com calma.",
        "Quantifique entregas: prazos, números, percentuais.",
        "Pergunte sobre metas e prioridades dos próximos meses."
      ]
    }
  };

  /* Estado */
  var current = 0;
  var answers = new Array(QUESTIONS.length).fill(null);

  /* DOM */
  var $question = document.getElementById("quizQuestion");
  var $progressBar = document.getElementById("progressBar");
  var $progressText = document.getElementById("progressText");
  var $btnPrev = document.getElementById("btnPrev");
  var $btnNext = document.getElementById("btnNext");
  var $btnFinish = document.getElementById("btnFinish");
  var $error = document.getElementById("quizError");
  var $result = document.getElementById("resultSection");
  var $resultProfile = document.getElementById("resultProfile");
  var $resultDescription = document.getElementById("resultDescription");
  var $resultTips = document.getElementById("resultTips");
  var $btnRestart = document.getElementById("btnRestart");
  var $form = document.getElementById("quizForm");

  if (!$question || !$form) return;

  function render() {
    var q = QUESTIONS[current];
    var optsHtml = q.options
      .map(function (opt, idx) {
        var checked = answers[current] === idx ? "checked" : "";
        var selected = answers[current] === idx ? " selected" : "";
        return (
          '<li><label class="option' + selected + '">' +
          '<input type="radio" name="q" value="' + idx + '" ' + checked + " />" +
          escapeHtml(opt.t) +
          "</label></li>"
        );
      })
      .join("");

    $question.innerHTML =
      "<h2>" + escapeHtml(q.q) + "</h2><ul class=\"options\">" + optsHtml + "</ul>";

    var pct = ((current + 1) / QUESTIONS.length) * 100;
    $progressBar.style.width = pct + "%";
    $progressText.textContent = "Pergunta " + (current + 1) + " de " + QUESTIONS.length;

    $btnPrev.disabled = current === 0;
    var hasAnswer = answers[current] !== null;
    var isLast = current === QUESTIONS.length - 1;

    $btnNext.classList.toggle("hidden", isLast);
    $btnFinish.classList.toggle("hidden", !isLast);
    $btnNext.disabled = !hasAnswer;
    $btnFinish.disabled = !hasAnswer;
    $error.textContent = "";
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Eventos */
  $question.addEventListener("change", function (e) {
    var target = e.target;
    if (target && target.name === "q") {
      answers[current] = Number(target.value);
      // Atualiza visual
      var opts = $question.querySelectorAll(".option");
      opts.forEach(function (el, i) {
        el.classList.toggle("selected", i === answers[current]);
      });
      $btnNext.disabled = false;
      $btnFinish.disabled = false;
    }
  });

  $btnPrev.addEventListener("click", function () {
    if (current > 0) {
      current--;
      render();
    }
  });

  $btnNext.addEventListener("click", function () {
    if (answers[current] === null) {
      $error.textContent = "Selecione uma opção para continuar.";
      return;
    }
    if (current < QUESTIONS.length - 1) {
      current++;
      render();
    }
  });

  $btnFinish.addEventListener("click", function () {
    if (answers[current] === null) {
      $error.textContent = "Selecione uma opção para finalizar.";
      return;
    }
    showResult();
  });

  $btnRestart.addEventListener("click", function () {
    current = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    $result.classList.add("hidden");
    $form.classList.remove("hidden");
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function showResult() {
    var scores = { C: 0, A: 0, L: 0, E: 0 };
    answers.forEach(function (a, i) {
      if (a === null) return;
      var key = QUESTIONS[i].options[a].p;
      scores[key]++;
    });
    var top = Object.keys(scores).reduce(function (best, k) {
      return scores[k] > scores[best] ? k : best;
    }, "C");
    var profile = PROFILES[top];

    $resultProfile.textContent = profile.name;
    $resultDescription.textContent = profile.description;
    $resultTips.innerHTML = profile.tips
      .map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; })
      .join("");

    $form.classList.add("hidden");
    $result.classList.remove("hidden");
    $result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  render();
})();