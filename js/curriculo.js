/* Gerador de currículo — JavaScript Vanilla com live preview */
(function () {
  "use strict";

  var $form = document.getElementById("cvForm");
  if (!$form) return;

  var $expList = document.getElementById("experienciaList");
  var $formList = document.getElementById("formacaoList");
  var $addExp = document.getElementById("addExperiencia");
  var $addForm = document.getElementById("addFormacao");
  var $btnPrint = document.getElementById("btnPrint");
  var $btnClear = document.getElementById("btnClear");

  /* Preview targets */
  var $prevNome = document.getElementById("prevNome");
  var $prevCargo = document.getElementById("prevCargo");
  var $prevContato = document.getElementById("prevContato");
  var $prevResumo = document.getElementById("prevResumo");
  var $prevResumoWrap = document.getElementById("prevResumoWrap");
  var $prevExp = document.getElementById("prevExperiencia");
  var $prevExpWrap = document.getElementById("prevExperienciaWrap");
  var $prevForm = document.getElementById("prevFormacao");
  var $prevFormWrap = document.getElementById("prevFormacaoWrap");
  var $prevHab = document.getElementById("prevHabilidades");
  var $prevHabWrap = document.getElementById("prevHabilidadesWrap");
  var $prevIdi = document.getElementById("prevIdiomas");
  var $prevIdiWrap = document.getElementById("prevIdiomasWrap");

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* -------- Itens dinâmicos: experiência e formação -------- */
  function makeExperienciaItem() {
    var div = document.createElement("div");
    div.className = "dynamic-item exp-item";
    div.innerHTML =
      '<button type="button" class="remove" aria-label="Remover experiência">Remover</button>' +
      '<div class="grid-2">' +
        '<label>Cargo<input type="text" class="exp-cargo" maxlength="80" /></label>' +
        '<label>Empresa<input type="text" class="exp-empresa" maxlength="80" /></label>' +
        '<label>Início<input type="text" class="exp-inicio" placeholder="MM/AAAA" maxlength="20" /></label>' +
        '<label>Fim<input type="text" class="exp-fim" placeholder="MM/AAAA ou Atual" maxlength="20" /></label>' +
      "</div>" +
      '<label>Descrição<textarea class="exp-desc" rows="2" maxlength="400"></textarea></label>';
    return div;
  }

  function makeFormacaoItem() {
    var div = document.createElement("div");
    div.className = "dynamic-item form-item";
    div.innerHTML =
      '<button type="button" class="remove" aria-label="Remover formação">Remover</button>' +
      '<div class="grid-2">' +
        '<label>Curso<input type="text" class="form-curso" maxlength="80" /></label>' +
        '<label>Instituição<input type="text" class="form-inst" maxlength="80" /></label>' +
        '<label>Início<input type="text" class="form-inicio" placeholder="AAAA" maxlength="10" /></label>' +
        '<label>Conclusão<input type="text" class="form-fim" placeholder="AAAA ou Cursando" maxlength="20" /></label>' +
      "</div>";
    return div;
  }

  $addExp.addEventListener("click", function () {
    $expList.appendChild(makeExperienciaItem());
    renderPreview();
  });
  $addForm.addEventListener("click", function () {
    $formList.appendChild(makeFormacaoItem());
    renderPreview();
  });

  /* Delegação para remoção */
  document.addEventListener("click", function (e) {
    var target = e.target;
    if (target && target.classList && target.classList.contains("remove")) {
      var item = target.closest(".dynamic-item");
      if (item) {
        item.remove();
        renderPreview();
      }
    }
  });

  /* -------- Validações simples -------- */
  function validateEmail(v) {
    if (!v) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function validateFields() {
    var nome = document.getElementById("nome");
    var email = document.getElementById("email");
    var err = document.getElementById("errorPessoais");
    var msgs = [];

    if (!nome.value.trim()) {
      nome.classList.add("invalid");
      msgs.push("Informe seu nome.");
    } else {
      nome.classList.remove("invalid");
    }

    if (!validateEmail(email.value.trim())) {
      email.classList.add("invalid");
      msgs.push("Informe um e-mail válido.");
    } else {
      email.classList.remove("invalid");
    }

    err.textContent = msgs.join(" ");
    return msgs.length === 0;
  }

  /* -------- Coleta de dados -------- */
  function collect() {
    var get = function (id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };

    var experiencias = Array.prototype.map.call(
      $expList.querySelectorAll(".exp-item"),
      function (item) {
        return {
          cargo: item.querySelector(".exp-cargo").value.trim(),
          empresa: item.querySelector(".exp-empresa").value.trim(),
          inicio: item.querySelector(".exp-inicio").value.trim(),
          fim: item.querySelector(".exp-fim").value.trim(),
          desc: item.querySelector(".exp-desc").value.trim()
        };
      }
    );

    var formacoes = Array.prototype.map.call(
      $formList.querySelectorAll(".form-item"),
      function (item) {
        return {
          curso: item.querySelector(".form-curso").value.trim(),
          inst: item.querySelector(".form-inst").value.trim(),
          inicio: item.querySelector(".form-inicio").value.trim(),
          fim: item.querySelector(".form-fim").value.trim()
        };
      }
    );

    var listFromCsv = function (s) {
      return s
        .split(",")
        .map(function (x) { return x.trim(); })
        .filter(function (x) { return x.length > 0; });
    };

    return {
      nome: get("nome"),
      cargo: get("cargo"),
      email: get("email"),
      telefone: get("telefone"),
      cidade: get("cidade"),
      site: get("site"),
      resumo: get("resumo"),
      experiencias: experiencias,
      formacoes: formacoes,
      habilidades: listFromCsv(get("habilidades")),
      idiomas: listFromCsv(get("idiomas"))
    };
  }

  /* -------- Renderização do preview -------- */
  function renderPreview() {
    var d = collect();

    $prevNome.textContent = d.nome || "Seu nome";
    $prevCargo.textContent = d.cargo || "Cargo desejado";

    var contato = [];
    if (d.email) contato.push(d.email);
    if (d.telefone) contato.push(d.telefone);
    if (d.cidade) contato.push(d.cidade);
    if (d.site) contato.push(d.site);
    $prevContato.textContent = contato.join("  •  ");

    /* Resumo */
    if (d.resumo) {
      $prevResumo.textContent = d.resumo;
      $prevResumoWrap.hidden = false;
    } else {
      $prevResumoWrap.hidden = true;
    }

    /* Experiência */
    var expHtml = d.experiencias
      .filter(function (e) { return e.cargo || e.empresa || e.desc; })
      .map(function (e) {
        var periodo = [e.inicio, e.fim].filter(Boolean).join(" — ");
        var meta = [e.empresa, periodo].filter(Boolean).join("  •  ");
        return (
          '<div class="cv-entry">' +
            '<div class="cv-entry-title">' + escapeHtml(e.cargo || "Cargo") + "</div>" +
            (meta ? '<div class="cv-entry-meta">' + escapeHtml(meta) + "</div>" : "") +
            (e.desc ? '<p class="cv-entry-desc">' + escapeHtml(e.desc) + "</p>" : "") +
          "</div>"
        );
      })
      .join("");
    $prevExp.innerHTML = expHtml;
    $prevExpWrap.hidden = expHtml.length === 0;

    /* Formação */
    var formHtml = d.formacoes
      .filter(function (f) { return f.curso || f.inst; })
      .map(function (f) {
        var periodo = [f.inicio, f.fim].filter(Boolean).join(" — ");
        var meta = [f.inst, periodo].filter(Boolean).join("  •  ");
        return (
          '<div class="cv-entry">' +
            '<div class="cv-entry-title">' + escapeHtml(f.curso || "Curso") + "</div>" +
            (meta ? '<div class="cv-entry-meta">' + escapeHtml(meta) + "</div>" : "") +
          "</div>"
        );
      })
      .join("");
    $prevForm.innerHTML = formHtml;
    $prevFormWrap.hidden = formHtml.length === 0;

    /* Habilidades */
    $prevHab.innerHTML = d.habilidades
      .map(function (h) { return "<li>" + escapeHtml(h) + "</li>"; })
      .join("");
    $prevHabWrap.hidden = d.habilidades.length === 0;

    /* Idiomas */
    $prevIdi.innerHTML = d.idiomas
      .map(function (i) { return "<li>" + escapeHtml(i) + "</li>"; })
      .join("");
    $prevIdiWrap.hidden = d.idiomas.length === 0;
  }

  /* -------- Eventos -------- */
  $form.addEventListener("input", renderPreview);
  $form.addEventListener("change", renderPreview);

  $btnPrint.addEventListener("click", function () {
    if (!validateFields()) {
      var nome = document.getElementById("nome");
      if (nome) nome.focus();
      return;
    }
    window.print();
  });

  $btnClear.addEventListener("click", function () {
    if (!window.confirm("Tem certeza que deseja limpar todos os campos?")) return;
    $form.reset();
    $expList.innerHTML = "";
    $formList.innerHTML = "";
    renderPreview();
  });

  /* Inicialização: adiciona um item de cada para o usuário começar */
  $expList.appendChild(makeExperienciaItem());
  $formList.appendChild(makeFormacaoItem());
  renderPreview();
})();