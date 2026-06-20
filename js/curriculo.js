/* Gerador de curriculo com preview em tempo real */
(function () {
  "use strict";

  const form = document.querySelector("#cvForm");
  if (!form) {
    return;
  }

  const experienceList = document.querySelector("#experienciaList");
  const educationList = document.querySelector("#formacaoList");
  const addExperienceButton = document.querySelector("#addExperiencia");
  const addEducationButton = document.querySelector("#addFormacao");
  const printButton = document.querySelector("#btnPrint");
  const clearButton = document.querySelector("#btnClear");
  const personalError = document.querySelector("#errorPessoais");
  const expandAllButton = document.querySelector("#expandAllSections");
  const collapseAllButton = document.querySelector("#collapseAllSections");
  const formSections = Array.from(form.querySelectorAll(".form-section"));

  const preview = {
    name: document.querySelector("#prevNome"),
    role: document.querySelector("#prevCargo"),
    contact: document.querySelector("#prevContato"),
    objective: document.querySelector("#prevObjetivo"),
    objectiveWrap: document.querySelector("#prevObjetivoWrap"),
    summary: document.querySelector("#prevResumo"),
    summaryWrap: document.querySelector("#prevResumoWrap"),
    experience: document.querySelector("#prevExperiencia"),
    experienceWrap: document.querySelector("#prevExperienciaWrap"),
    education: document.querySelector("#prevFormacao"),
    educationWrap: document.querySelector("#prevFormacaoWrap"),
    projects: document.querySelector("#prevProjetos"),
    projectsWrap: document.querySelector("#prevProjetosWrap"),
    skills: document.querySelector("#prevHabilidades"),
    skillsWrap: document.querySelector("#prevHabilidadesWrap"),
    languages: document.querySelector("#prevIdiomas"),
    languagesWrap: document.querySelector("#prevIdiomasWrap"),
    courses: document.querySelector("#prevCursos"),
    coursesWrap: document.querySelector("#prevCursosWrap")
  };

  function createLabeledInput(text, className, placeholder, maxLength) {
    const label = document.createElement("label");
    const input = document.createElement("input");

    label.className = "field";
    label.textContent = text;
    input.type = "text";
    input.className = className;

    if (placeholder) {
      input.placeholder = placeholder;
    }

    if (maxLength) {
      input.maxLength = maxLength;
    }

    label.appendChild(input);
    return label;
  }

  function createLabeledTextarea(text, className, rows, maxLength) {
    const label = document.createElement("label");
    const textarea = document.createElement("textarea");

    label.className = "field";
    label.textContent = text;
    textarea.className = className;
    textarea.rows = rows;
    textarea.maxLength = maxLength;

    label.appendChild(textarea);
    return label;
  }

  function createGrid(children) {
    const grid = document.createElement("div");
    grid.className = "grid-2";

    children.forEach(function (child) {
      grid.appendChild(child);
    });

    return grid;
  }

  function createRemoveButton(label) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "dynamic-remove";
    button.setAttribute("data-remove-item", "true");
    button.setAttribute("aria-label", label);
    button.textContent = "Remover";

    return button;
  }

  function createExperienceItem() {
    const wrapper = document.createElement("div");

    wrapper.className = "dynamic-item exp-item";
    wrapper.appendChild(createRemoveButton("Remover experiencia"));
    wrapper.appendChild(
      createGrid([
        createLabeledInput("Cargo", "exp-cargo", "", 80),
        createLabeledInput("Empresa", "exp-empresa", "", 80),
        createLabeledInput("Inicio", "exp-inicio", "MM/AAAA", 20),
        createLabeledInput("Fim", "exp-fim", "MM/AAAA ou atual", 20)
      ])
    );
    wrapper.appendChild(createLabeledTextarea("Descricao", "exp-desc", 3, 400));

    return wrapper;
  }

  function createEducationItem() {
    const wrapper = document.createElement("div");

    wrapper.className = "dynamic-item form-item";
    wrapper.appendChild(createRemoveButton("Remover formacao"));
    wrapper.appendChild(
      createGrid([
        createLabeledInput("Curso", "form-curso", "", 80),
        createLabeledInput("Instituicao", "form-inst", "", 80),
        createLabeledInput("Inicio", "form-inicio", "AAAA", 10),
        createLabeledInput("Conclusao", "form-fim", "AAAA ou cursando", 20)
      ])
    );

    return wrapper;
  }

  function getValue(id) {
    const field = document.querySelector("#" + id);
    return field ? field.value.trim() : "";
  }

  function splitCsv(value) {
    return value
      .split(",")
      .map(function (item) {
        return item.trim();
      })
      .filter(function (item) {
        return item.length > 0;
      });
  }

  function splitLines(value) {
    return value
      .split("\n")
      .map(function (item) {
        return item.trim();
      })
      .filter(function (item) {
        return item.length > 0;
      });
  }

  function collectDynamicExperience() {
    return Array.prototype.map.call(experienceList.querySelectorAll(".exp-item"), function (item) {
      return {
        role: item.querySelector(".exp-cargo").value.trim(),
        company: item.querySelector(".exp-empresa").value.trim(),
        start: item.querySelector(".exp-inicio").value.trim(),
        end: item.querySelector(".exp-fim").value.trim(),
        description: item.querySelector(".exp-desc").value.trim()
      };
    });
  }

  function collectDynamicEducation() {
    return Array.prototype.map.call(educationList.querySelectorAll(".form-item"), function (item) {
      return {
        course: item.querySelector(".form-curso").value.trim(),
        institution: item.querySelector(".form-inst").value.trim(),
        start: item.querySelector(".form-inicio").value.trim(),
        end: item.querySelector(".form-fim").value.trim()
      };
    });
  }

  function collectData() {
    return {
      name: getValue("nome"),
      role: getValue("cargo"),
      email: getValue("email"),
      phone: getValue("telefone"),
      city: getValue("cidade"),
      site: getValue("site"),
      objective: getValue("objetivo"),
      summary: getValue("resumo"),
      experience: collectDynamicExperience(),
      education: collectDynamicEducation(),
      projects: splitLines(getValue("projetos")),
      skills: splitCsv(getValue("habilidades")),
      languages: splitCsv(getValue("idiomas")),
      courses: splitLines(getValue("cursos"))
    };
  }

  function clearElement(element) {
    element.textContent = "";
  }

  function toggleSection(section, shouldShow) {
    section.hidden = !shouldShow;
  }

  function renderList(container, items) {
    clearElement(container);

    items.forEach(function (itemText) {
      const item = document.createElement("li");
      item.textContent = itemText;
      container.appendChild(item);
    });
  }

  function renderChipList(container, items) {
    clearElement(container);

    items.forEach(function (itemText) {
      const item = document.createElement("li");
      item.textContent = itemText;
      container.appendChild(item);
    });
  }

  function createEntry(titleText, metaText, descriptionText) {
    const wrapper = document.createElement("div");
    const title = document.createElement("div");

    wrapper.className = "cv-entry";
    title.className = "cv-entry-title";
    title.textContent = titleText;
    wrapper.appendChild(title);

    if (metaText) {
      const meta = document.createElement("div");
      meta.className = "cv-entry-meta";
      meta.textContent = metaText;
      wrapper.appendChild(meta);
    }

    if (descriptionText) {
      const description = document.createElement("p");
      description.className = "cv-entry-desc";
      description.textContent = descriptionText;
      wrapper.appendChild(description);
    }

    return wrapper;
  }

  function renderExperience(items) {
    clearElement(preview.experience);

    items
      .filter(function (item) {
        return item.role || item.company || item.description;
      })
      .forEach(function (item) {
        const period = [item.start, item.end].filter(Boolean).join(" - ");
        const meta = [item.company, period].filter(Boolean).join(" | ");

        preview.experience.appendChild(
          createEntry(item.role || "Cargo", meta, item.description)
        );
      });

    toggleSection(preview.experienceWrap, preview.experience.childElementCount > 0);
  }

  function renderEducation(items) {
    clearElement(preview.education);

    items
      .filter(function (item) {
        return item.course || item.institution;
      })
      .forEach(function (item) {
        const period = [item.start, item.end].filter(Boolean).join(" - ");
        const meta = [item.institution, period].filter(Boolean).join(" | ");

        preview.education.appendChild(
          createEntry(item.course || "Curso", meta, "")
        );
      });

    toggleSection(preview.educationWrap, preview.education.childElementCount > 0);
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function getSectionByKey(key) {
    return form.querySelector('[data-section-key="' + key + '"]');
  }

  function setSectionOpen(section, shouldOpen) {
    if (section) {
      section.open = shouldOpen;
    }
  }

  function openSectionByKey(key) {
    setSectionOpen(getSectionByKey(key), true);
  }

  function openSectionForElement(element) {
    if (!element) {
      return;
    }

    const section = element.closest(".form-section");
    if (!section) {
      return;
    }

    section.open = true;
    section.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function countCompletedItems(items, keys) {
    return items.filter(function (item) {
      return keys.some(function (key) {
        return Boolean(item[key]);
      });
    }).length;
  }

  function formatCountLabel(count, singularLabel, pluralLabel, emptyLabel) {
    if (count === 0) {
      return emptyLabel;
    }

    if (count === 1) {
      return "1 " + singularLabel;
    }

    return String(count) + " " + pluralLabel;
  }

  function getSectionStatus(section, data) {
    const key = section.dataset.sectionKey;
    const hasError = section.querySelector(".invalid") || (key === "personal" && personalError.textContent.trim());
    const personalFilledCount = [data.name, data.role, data.email, data.phone, data.city, data.site].filter(Boolean).length;
    const experienceCount = countCompletedItems(data.experience, ["role", "company", "description"]);
    const educationCount = countCompletedItems(data.education, ["course", "institution"]);

    if (hasError) {
      return { label: "Com erro", className: "has-error" };
    }

    switch (key) {
      case "personal":
        if (data.name && validateEmail(data.email)) {
          return { label: "Preenchida", className: "is-filled" };
        }
        if (personalFilledCount > 0) {
          return { label: "Em preenchimento", className: "is-partial" };
        }
        return { label: "Obrigatorio", className: "is-empty" };
      case "objective":
        return data.objective
          ? { label: "Preenchida", className: "is-filled" }
          : { label: "Vazia", className: "is-empty" };
      case "summary":
        return data.summary
          ? { label: "Preenchida", className: "is-filled" }
          : { label: "Vazia", className: "is-empty" };
      case "experience":
        return {
          label: formatCountLabel(experienceCount, "experiencia", "experiencias", "Nenhuma"),
          className: experienceCount > 0 ? "is-filled" : "is-empty"
        };
      case "education":
        return {
          label: formatCountLabel(educationCount, "formacao", "formacoes", "Nenhuma"),
          className: educationCount > 0 ? "is-filled" : "is-empty"
        };
      case "projects":
        return {
          label: formatCountLabel(data.projects.length, "projeto", "projetos", "Nenhum"),
          className: data.projects.length > 0 ? "is-filled" : "is-empty"
        };
      case "skills":
        return {
          label: formatCountLabel(data.skills.length, "habilidade", "habilidades", "Nenhuma"),
          className: data.skills.length > 0 ? "is-filled" : "is-empty"
        };
      case "languages":
        return {
          label: formatCountLabel(data.languages.length, "idioma", "idiomas", "Nenhum"),
          className: data.languages.length > 0 ? "is-filled" : "is-empty"
        };
      case "courses":
        return {
          label: formatCountLabel(data.courses.length, "curso", "cursos", "Nenhum"),
          className: data.courses.length > 0 ? "is-filled" : "is-empty"
        };
      default:
        return { label: "Vazia", className: "is-empty" };
    }
  }

  function updateSectionStates() {
    const data = collectData();

    formSections.forEach(function (section) {
      const statusElement = section.querySelector("[data-section-status]");
      const status = getSectionStatus(section, data);

      section.classList.remove("is-empty", "is-filled", "is-partial", "has-error");
      section.classList.add(status.className);

      if (statusElement) {
        statusElement.textContent = status.label;
      }
    });
  }

  function renderPreview() {
    const data = collectData();
    const contactParts = [];

    preview.name.textContent = data.name || "Seu nome";
    preview.role.textContent = data.role || "Cargo de interesse";

    if (data.email) {
      contactParts.push(data.email);
    }
    if (data.phone) {
      contactParts.push(data.phone);
    }
    if (data.city) {
      contactParts.push(data.city);
    }
    if (data.site) {
      contactParts.push(data.site);
    }

    preview.contact.textContent = contactParts.join(" | ");
    preview.objective.textContent = data.objective;
    preview.summary.textContent = data.summary;

    toggleSection(preview.objectiveWrap, Boolean(data.objective));
    toggleSection(preview.summaryWrap, Boolean(data.summary));

    renderExperience(data.experience);
    renderEducation(data.education);
    renderList(preview.projects, data.projects);
    renderChipList(preview.skills, data.skills);
    renderChipList(preview.languages, data.languages);
    renderList(preview.courses, data.courses);

    toggleSection(preview.projectsWrap, data.projects.length > 0);
    toggleSection(preview.skillsWrap, data.skills.length > 0);
    toggleSection(preview.languagesWrap, data.languages.length > 0);
    toggleSection(preview.coursesWrap, data.courses.length > 0);
    updateSectionStates();
  }

  function clearValidation() {
    personalError.textContent = "";
    form.querySelectorAll(".invalid").forEach(function (field) {
      field.classList.remove("invalid");
    });
    updateSectionStates();
  }

  function validateMainFields() {
    const nameField = document.querySelector("#nome");
    const emailField = document.querySelector("#email");
    const messages = [];

    clearValidation();

    if (!nameField.value.trim()) {
      nameField.classList.add("invalid");
      messages.push("Informe seu nome.");
    }

    if (!validateEmail(emailField.value.trim())) {
      emailField.classList.add("invalid");
      messages.push("Informe um e-mail valido.");
    }

    personalError.textContent = messages.join(" ");
    updateSectionStates();
    return messages.length === 0;
  }

  function resetDynamicSections() {
    clearElement(experienceList);
    clearElement(educationList);
    experienceList.appendChild(createExperienceItem());
    educationList.appendChild(createEducationItem());
  }

  addExperienceButton.addEventListener("click", function () {
    experienceList.appendChild(createExperienceItem());
    openSectionByKey("experience");
    renderPreview();
  });

  addEducationButton.addEventListener("click", function () {
    educationList.appendChild(createEducationItem());
    openSectionByKey("education");
    renderPreview();
  });

  if (expandAllButton) {
    expandAllButton.addEventListener("click", function () {
      formSections.forEach(function (section) {
        setSectionOpen(section, true);
      });
    });
  }

  if (collapseAllButton) {
    collapseAllButton.addEventListener("click", function () {
      formSections.forEach(function (section) {
        setSectionOpen(section, false);
      });
    });
  }

  form.addEventListener("click", function (event) {
    const target = event.target;

    if (!target.matches("[data-remove-item]")) {
      return;
    }

    const item = target.closest(".dynamic-item");
    if (!item) {
      return;
    }

    item.remove();
    renderPreview();
  });

  form.addEventListener("input", function (event) {
    renderPreview();

    if (event.target.id === "nome" || event.target.id === "email") {
      if (personalError.textContent.trim() || event.target.classList.contains("invalid")) {
        validateMainFields();
      }
    }
  });

  form.addEventListener("change", renderPreview);

  printButton.addEventListener("click", function () {
    if (!validateMainFields()) {
      const firstInvalidField = form.querySelector(".invalid");
      openSectionForElement(firstInvalidField);

      if (firstInvalidField) {
        firstInvalidField.focus();
      }
      return;
    }

    window.print();
  });

  clearButton.addEventListener("click", function () {
    if (!window.confirm("Tem certeza que deseja limpar todos os campos?")) {
      return;
    }

    form.reset();
    clearValidation();
    resetDynamicSections();
    formSections.forEach(function (section) {
      setSectionOpen(section, section.dataset.sectionKey === "personal");
    });
    renderPreview();
  });

  resetDynamicSections();
  renderPreview();
})();
