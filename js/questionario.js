/* Questionario interativo de preparo para entrevistas */
(function () {
  "use strict";

  const QUESTIONS = [
    {
      prompt: "Antes de uma entrevista, voce pesquisa sobre a empresa e a vaga?",
      options: [
        { text: "Quase nunca pesquiso antes da entrevista.", score: 0 },
        { text: "Pesquiso pouco e de forma superficial.", score: 1 },
        { text: "Pesquiso os pontos principais da empresa e da vaga.", score: 2 },
        { text: "Pesquiso bem e preparo exemplos ligados a vaga.", score: 3 }
      ]
    },
    {
      prompt: "Como voce costuma se apresentar quando o entrevistador pede para falar sobre voce?",
      options: [
        { text: "Improviso e fico sem saber por onde comecar.", score: 0 },
        { text: "Falo um pouco, mas sem muita organizacao.", score: 1 },
        { text: "Tenho uma apresentacao curta e razoavelmente clara.", score: 2 },
        { text: "Tenho uma apresentacao objetiva, segura e treinada.", score: 3 }
      ]
    },
    {
      prompt: "Quando pensa em responder perguntas sobre experiencias anteriores, voce:",
      options: [
        { text: "Nao preparo exemplos com antecedencia.", score: 0 },
        { text: "Lembro de alguns exemplos, mas sem estrutura.", score: 1 },
        { text: "Separo exemplos importantes para usar na conversa.", score: 2 },
        { text: "Organizo exemplos com situacao, acao e resultado.", score: 3 }
      ]
    },
    {
      prompt: "Seu nivel de seguranca para falar sobre qualidades e pontos a melhorar e:",
      options: [
        { text: "Muito baixo, ainda me confundo nas respostas.", score: 0 },
        { text: "Baixo, consigo responder mas com inseguranca.", score: 1 },
        { text: "Bom, com algumas duvidas pontuais.", score: 2 },
        { text: "Alto, consigo responder com clareza e naturalidade.", score: 3 }
      ]
    },
    {
      prompt: "Como voce cuida da sua comunicacao nao verbal em entrevistas?",
      options: [
        { text: "Nunca penso sobre postura, tom de voz ou contato visual.", score: 0 },
        { text: "Lembro disso na hora, mas sem muito controle.", score: 1 },
        { text: "Presto atencao a postura e tento falar com calma.", score: 2 },
        { text: "Treino postura, contato visual e tom de voz com antecedencia.", score: 3 }
      ]
    },
    {
      prompt: "Se o entrevistador perguntar sobre a vaga, voce:",
      options: [
        { text: "Nao sei explicar por que quero aquela oportunidade.", score: 0 },
        { text: "Consigo falar, mas ainda de forma generica.", score: 1 },
        { text: "Relaciono meus interesses com a area da vaga.", score: 2 },
        { text: "Conecto meus objetivos, competencias e o que a empresa busca.", score: 3 }
      ]
    },
    {
      prompt: "Em relacao ao seu curriculo antes da entrevista, voce costuma:",
      options: [
        { text: "Levar o curriculo sem revisar.", score: 0 },
        { text: "Dar uma olhada rapida antes da entrevista.", score: 1 },
        { text: "Revisar os pontos principais e corrigir erros.", score: 2 },
        { text: "Revisar com cuidado e alinhar o curriculo com a vaga.", score: 3 }
      ]
    },
    {
      prompt: "Quando recebe uma pergunta dificil, sua reacao mais comum e:",
      options: [
        { text: "Travamento e perda de raciocinio.", score: 0 },
        { text: "Respondo, mas fico muito nervoso.", score: 1 },
        { text: "Penso um pouco e consigo organizar a resposta.", score: 2 },
        { text: "Respiro, ganho tempo e respondo com objetividade.", score: 3 }
      ]
    },
    {
      prompt: "Voce costuma preparar perguntas para fazer ao entrevistador?",
      options: [
        { text: "Nao preparo perguntas.", score: 0 },
        { text: "As vezes penso em uma pergunta, mas esqueço.", score: 1 },
        { text: "Normalmente preparo uma ou duas perguntas.", score: 2 },
        { text: "Sempre preparo perguntas relevantes sobre equipe, rotina e vaga.", score: 3 }
      ]
    },
    {
      prompt: "No geral, como voce avalia sua preparacao para entrevistas hoje?",
      options: [
        { text: "Ainda estou no comeco e preciso de muita orientacao.", score: 0 },
        { text: "Ja comecei a me preparar, mas ainda tenho varias lacunas.", score: 1 },
        { text: "Estou razoavelmente preparado e sei onde melhorar.", score: 2 },
        { text: "Estou bem preparado e consigo me apresentar com seguranca.", score: 3 }
      ]
    }
  ];

  const PROFILES = [
    {
      min: 0,
      max: 9,
      name: "Iniciante em entrevistas",
      description: "Voce esta dando os primeiros passos. O mais importante agora e construir uma base de preparacao simples e consistente.",
      tips: [
        "Pesquise a empresa e a vaga antes de cada entrevista.",
        "Treine uma apresentacao curta sobre quem voce e.",
        "Revise seu curriculo para nao ser pego de surpresa.",
        "Anote exemplos reais da sua vida academica, pessoal ou profissional.",
        "Pratique em voz alta para reduzir a ansiedade."
      ]
    },
    {
      min: 10,
      max: 17,
      name: "Em desenvolvimento",
      description: "Voce ja percebe pontos importantes da entrevista, mas ainda precisa de mais organizacao e constancia na preparacao.",
      tips: [
        "Monte respostas com inicio, meio e resultado.",
        "Treine perguntas classicas como pontos fortes e desafios.",
        "Prepare perguntas para fazer ao entrevistador.",
        "Ajuste sua postura, tom de voz e ritmo de fala.",
        "Alinhe o curriculo com a vaga antes de cada processo."
      ]
    },
    {
      min: 18,
      max: 24,
      name: "Preparado",
      description: "Voce ja demonstra boa base de preparacao. O proximo passo e refinar suas respostas para passar ainda mais seguranca.",
      tips: [
        "Use exemplos concretos para provar suas competencias.",
        "Evite respostas genericas e conecte sua fala com a vaga.",
        "Treine entrevistas simuladas para ganhar naturalidade.",
        "Mostre interesse genuino pelo trabalho e pela empresa.",
        "Revise detalhes de horario, local e materiais com antecedencia."
      ]
    },
    {
      min: 25,
      max: 30,
      name: "Perfil forte",
      description: "Voce apresenta um nivel alto de preparacao. Agora o foco e manter consistencia e adaptar sua comunicacao para cada oportunidade.",
      tips: [
        "Personalize seus exemplos conforme a vaga desejada.",
        "Mostre resultados concretos sempre que possivel.",
        "Equilibre seguranca com escuta ativa durante a conversa.",
        "Ajuste seu discurso para diferentes perfis de entrevistador.",
        "Mantenha curriculo, portfolio e argumentos alinhados."
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let answers = new Array(QUESTIONS.length).fill(null);

  const questionContainer = document.querySelector("#quizQuestion");
  const progressBar = document.querySelector("#progressBar");
  const progressText = document.querySelector("#progressText");
  const previousButton = document.querySelector("#btnPrev");
  const nextButton = document.querySelector("#btnNext");
  const finishButton = document.querySelector("#btnFinish");
  const errorMessage = document.querySelector("#quizError");
  const resultSection = document.querySelector("#resultSection");
  const resultScore = document.querySelector("#resultScore");
  const resultProfile = document.querySelector("#resultProfile");
  const resultDescription = document.querySelector("#resultDescription");
  const resultTips = document.querySelector("#resultTips");
  const restartButton = document.querySelector("#btnRestart");
  const form = document.querySelector("#quizForm");

  if (!questionContainer || !form) {
    return;
  }

  function getCurrentQuestion() {
    return QUESTIONS[currentQuestionIndex];
  }

  function updateProgress() {
    const percentage = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;
    progressBar.style.width = percentage + "%";
    progressText.textContent = "Pergunta " + (currentQuestionIndex + 1) + " de " + QUESTIONS.length;
  }

  function updateButtons() {
    const answered = answers[currentQuestionIndex] !== null;
    const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1;

    previousButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = !answered;
    finishButton.disabled = !answered;
    nextButton.classList.toggle("hidden", isLastQuestion);
    finishButton.classList.toggle("hidden", !isLastQuestion);
  }

  function createOption(option, optionIndex) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const input = document.createElement("input");
    const text = document.createElement("span");

    label.className = "option";

    input.type = "radio";
    input.name = "quizOption";
    input.value = String(optionIndex);
    input.checked = answers[currentQuestionIndex] === optionIndex;

    if (input.checked) {
      label.classList.add("selected");
    }

    text.textContent = option.text;

    label.appendChild(input);
    label.appendChild(text);
    item.appendChild(label);

    return item;
  }

  function renderQuestion() {
    const question = getCurrentQuestion();
    const title = document.createElement("h2");
    const optionsList = document.createElement("ul");

    questionContainer.textContent = "";
    errorMessage.textContent = "";

    title.textContent = question.prompt;
    optionsList.className = "options";

    question.options.forEach(function (option, optionIndex) {
      optionsList.appendChild(createOption(option, optionIndex));
    });

    questionContainer.appendChild(title);
    questionContainer.appendChild(optionsList);

    updateProgress();
    updateButtons();
  }

  function showSelectionState() {
    questionContainer.querySelectorAll(".option").forEach(function (optionLabel, optionIndex) {
      optionLabel.classList.toggle("selected", optionIndex === answers[currentQuestionIndex]);
    });
  }

  function getFinalScore() {
    return answers.reduce(function (total, answer, questionIndex) {
      if (answer === null) {
        return total;
      }
      return total + QUESTIONS[questionIndex].options[answer].score;
    }, 0);
  }

  function getProfile(score) {
    return PROFILES.find(function (profile) {
      return score >= profile.min && score <= profile.max;
    }) || PROFILES[0];
  }

  function renderTips(tips) {
    resultTips.textContent = "";

    tips.forEach(function (tip) {
      const item = document.createElement("li");
      item.textContent = tip;
      resultTips.appendChild(item);
    });
  }

  function showResult() {
    const score = getFinalScore();
    const profile = getProfile(score);

    resultScore.textContent = "Pontuacao final: " + score + " de 30";
    resultProfile.textContent = profile.name;
    resultDescription.textContent = profile.description;
    renderTips(profile.tips);

    form.classList.add("hidden");
    resultSection.classList.remove("hidden");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  questionContainer.addEventListener("change", function (event) {
    const target = event.target;

    if (!target || target.name !== "quizOption") {
      return;
    }

    answers[currentQuestionIndex] = Number(target.value);
    errorMessage.textContent = "";
    showSelectionState();
    updateButtons();
  });

  previousButton.addEventListener("click", function () {
    if (currentQuestionIndex === 0) {
      return;
    }

    currentQuestionIndex -= 1;
    renderQuestion();
  });

  nextButton.addEventListener("click", function () {
    if (answers[currentQuestionIndex] === null) {
      errorMessage.textContent = "Selecione uma opcao para continuar.";
      return;
    }

    currentQuestionIndex += 1;
    renderQuestion();
  });

  finishButton.addEventListener("click", function () {
    if (answers[currentQuestionIndex] === null) {
      errorMessage.textContent = "Selecione uma opcao para finalizar.";
      return;
    }

    showResult();
  });

  restartButton.addEventListener("click", function () {
    currentQuestionIndex = 0;
    answers = new Array(QUESTIONS.length).fill(null);
    form.classList.remove("hidden");
    resultSection.classList.add("hidden");
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  renderQuestion();
})();
