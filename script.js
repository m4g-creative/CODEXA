/* =====================================================
   CODEXA — JAVASCRIPT PART 1/3
   ELEMENTS + TOAST + CONFIRM + PREVIEW + SAVE + CLEAR
   ===================================================== */


/* =====================================================
   ELEMENTS
   ===================================================== */

const htmlCode =
    document.getElementById("htmlCode");

const cssCode =
    document.getElementById("cssCode");

const jsCode =
    document.getElementById("jsCode");

const preview =
    document.getElementById("preview");

const runBtn =
    document.getElementById("runBtn");

const clearBtn =
    document.getElementById("clearBtn");

const saveBtn =
    document.getElementById("saveBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");

const savedProjectsBtn =
    document.getElementById("savedProjectsBtn");

const backToCompilerBtn =
    document.getElementById("backToCompilerBtn");

const backToSavedProjectsFromCompiler =
    document.getElementById(
        "backToSavedProjectsFromCompiler"
    );

const compilerPage =
    document.getElementById("compilerPage");

const savedProjectsPage =
    document.getElementById("savedProjectsPage");

const projectsGrid =
    document.getElementById("projectsGrid");

const toastContainer =
    document.getElementById("toastContainer");

const projectNameInput =
    document.getElementById(
        "projectNameInput"
    );

const openedProjectBar =
    document.getElementById(
        "openedProjectBar"
    );

const openedProjectText =
    document.getElementById(
        "openedProjectText"
    );


/* =====================================================
   CONFIRM ELEMENTS
   ===================================================== */

const confirmOverlay =
    document.getElementById(
        "confirmOverlay"
    );

const confirmTitle =
    document.getElementById(
        "confirmTitle"
    );

const confirmMessage =
    document.getElementById(
        "confirmMessage"
    );

const confirmCancel =
    document.getElementById(
        "confirmCancel"
    );

const confirmAction =
    document.getElementById(
        "confirmAction"
    );


/* =====================================================
   STORAGE
   ===================================================== */

const STORAGE_KEY =
    "codexaProjects";


/* =====================================================
   HOME CODE
   ===================================================== */

const homeCode = {

    html:
        htmlCode.value,

    css:
        cssCode.value,

    js:
        jsCode.value

};


let activeProjectId =
    null;

let previewTimer =
    null;

let confirmCallback =
    null;


/* =====================================================
   BUTTON BLUR
   ===================================================== */

function blurButton(
    button
) {

    if (
        button &&
        typeof button.blur === "function"
    ) {

        button.blur();

    }

}


/* =====================================================
   TOAST
   ===================================================== */

function showToast(
    title,
    message,
    icon = "✓",
    duration = 2200
) {

    if (!toastContainer) {
        return;
    }


    const toast =
        document.createElement("div");


    toast.className =
        "toast";


    toast.innerHTML = `

        <div class="toast-icon">
            ${icon}
        </div>

        <div class="toast-content">

            <div class="toast-title"></div>

            <div class="toast-message"></div>

        </div>

        <button
            class="toast-close"
            type="button"
            aria-label="Close"
        >
            ×
        </button>

    `;


    toast.querySelector(
        ".toast-title"
    ).textContent =
        title;


    toast.querySelector(
        ".toast-message"
    ).textContent =
        message;


    toastContainer.appendChild(
        toast
    );


    const closeToast =
        function () {

            if (
                !toast.isConnected
            ) {
                return;
            }


            toast.classList.add(
                "removing"
            );


            setTimeout(
                function () {

                    if (
                        toast.isConnected
                    ) {

                        toast.remove();

                    }

                },
                250
            );

        };


    toast.querySelector(
        ".toast-close"
    ).addEventListener(
        "click",
        function () {

            blurButton(
                this
            );

            closeToast();

        }
    );


    if (
        duration > 0
    ) {

        setTimeout(
            closeToast,
            duration
        );

    }

}


/* =====================================================
   IN-PAGE CONFIRMATION
   ===================================================== */

function showConfirm(
    title,
    message,
    actionText,
    callback
) {

    if (
        !confirmOverlay
    ) {
        return;
    }


    confirmTitle.textContent =
        title;


    confirmMessage.textContent =
        message;


    confirmAction.textContent =
        actionText || "Continue";


    confirmCallback =
        typeof callback === "function"
            ? callback
            : null;


    confirmOverlay.classList.add(
        "active"
    );


    confirmOverlay.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    setTimeout(
        function () {

            if (
                confirmCancel
            ) {

                confirmCancel.focus();

            }

        },
        0
    );

}


function closeConfirm() {

    if (
        !confirmOverlay
    ) {
        return;
    }


    confirmOverlay.classList.remove(
        "active"
    );


    confirmOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";


    confirmCallback =
        null;

}


confirmCancel.addEventListener(
    "click",
    function () {

        blurButton(
            this
        );

        closeConfirm();

    }
);


confirmAction.addEventListener(
    "click",
    function () {

        blurButton(
            this
        );


        const callback =
            confirmCallback;


        closeConfirm();


        if (
            typeof callback === "function"
        ) {

            callback();

        }

    }
);


confirmOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            confirmOverlay
        ) {

            closeConfirm();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            confirmOverlay.classList.contains(
                "active"
            )
        ) {

            closeConfirm();

        }

    }
);


/* =====================================================
   STORAGE FUNCTIONS
   ===================================================== */

function getProjects() {

    try {

        const data =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (!data) {

            return [];

        }


        const projects =
            JSON.parse(data);


        return Array.isArray(
            projects
        )
            ? projects
            : [];


    } catch (error) {

        console.error(
            "Storage read error:",
            error
        );


        return [];

    }

}


function writeProjects(
    projects
) {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(projects)
        );


        return true;


    } catch (error) {

        console.error(
            "Storage write error:",
            error
        );


        return false;

    }

}


/* =====================================================
   PREVIEW
   ===================================================== */

function buildPreview() {

    const safeJavaScript =
        jsCode.value.replace(
            /<\/script/gi,
            "<\\/script"
        );


    const page =
`<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<style>

${cssCode.value}

</style>

</head>

<body>

${htmlCode.value}

<script>

try {

${safeJavaScript}

} catch (error) {

document.body.insertAdjacentHTML(
    "beforeend",
    '<pre style="color:red;padding:15px;font-family:monospace;white-space:pre-wrap;">' +
    error.message +
    '</pre>'
);

}

<\/script>

</body>

</html>`;


    preview.srcdoc =
        page;

}


/* =====================================================
   RUN
   ===================================================== */

runBtn.addEventListener(
    "click",
    function () {

        blurButton(
            this
        );

        buildPreview();

    }
);


/* =====================================================
   LIVE PREVIEW
   ===================================================== */

function schedulePreview() {

    clearTimeout(
        previewTimer
    );


    previewTimer =
        setTimeout(
            function () {

                buildPreview();

            },
            350
        );

}


htmlCode.addEventListener(
    "input",
    schedulePreview
);


cssCode.addEventListener(
    "input",
    schedulePreview
);


jsCode.addEventListener(
    "input",
    schedulePreview
);


/* =====================================================
   SAVE PROJECT
   ===================================================== */

saveBtn.addEventListener(
    "click",
    function () {

        blurButton(
            this
        );


        const projectName =
            projectNameInput.value.trim();


        saveCurrentProject(
            projectName
        );

    }
);


/* =====================================================
   SAVE CURRENT PROJECT
   ===================================================== */

function saveCurrentProject(
    projectName
) {

    const cleanName =
        String(
            projectName || ""
        ).trim();


    if (!cleanName) {

        showToast(
            "Name Required",
            "Please enter a project name first.",
            "!",
            2500
        );

        projectNameInput.focus();

        return;

    }


    const projects =
        getProjects();


    const duplicate =
        projects.some(
            function (project) {

                return (
                    String(
                        project.name || ""
                    )
                    .trim()
                    .toLowerCase() ===
                    cleanName.toLowerCase()
                );

            }
        );


    if (duplicate) {

        showConfirm(
            "Duplicate Project",
            `"${cleanName}" already exists. Do you want to save another project with the same name?`,
            "Save Anyway",
            function () {

                createSavedProject(
                    cleanName
                );

            }
        );

        return;

    }


    createSavedProject(
        cleanName
    );

}


/* =====================================================
   CREATE SAVED PROJECT
   ===================================================== */

function createSavedProject(
    projectName
) {

    const projects =
        getProjects();


    const project = {

        id:
            Date.now().toString() +
            "-" +
            Math.random()
                .toString(36)
                .slice(2, 8),

        name:
            projectName,

        html:
            htmlCode.value,

        css:
            cssCode.value,

        js:
            jsCode.value,

        savedAt:
            new Date().toISOString()

    };


    projects.unshift(
        project
    );


    if (
        !writeProjects(
            projects
        )
    ) {

        showToast(
            "Save Failed",
            "The project could not be saved in this browser.",
            "!",
            3000
        );

        return;

    }


    activeProjectId =
        project.id;


    projectNameInput.value =
        projectName;


    showOpenedProjectBar(
        projectName
    );


    showToast(
        "Project Saved",
        `"${projectName}" has been saved successfully.`,
        "✓",
        2600
    );

}


/* =====================================================
   CLEAR
   ===================================================== */

clearBtn.addEventListener(
    "click",
    function () {

        blurButton(
            this
        );


        const hasCode =
            htmlCode.value.trim() ||
            cssCode.value.trim() ||
            jsCode.value.trim();


        const hasProjectName =
            projectNameInput.value.trim();


        if (
            !hasCode &&
            !hasProjectName
        ) {

            showToast(
                "Already Clear",
                "There is nothing to clear.",
                "!",
                2200
            );

            return;

        }


        showConfirm(
            "Clear Editor",
            "All HTML, CSS, JavaScript and the current project name will be removed.",
            "Clear Everything",
            function () {

                clearEditor();

            }
        );

    }
);


/* =====================================================
   CLEAR EDITOR
   ===================================================== */

function clearEditor() {

    htmlCode.value =
        "";

    cssCode.value =
        "";

    jsCode.value =
        "";


    projectNameInput.value =
        "";


    clearTimeout(
        previewTimer
    );


    preview.srcdoc =
        "";


    activeProjectId =
        null;


    hideOpenedProjectBar();


    showToast(
        "Editor Cleared",
        "All code has been removed successfully.",
        "✓",
        2400
    );

}
/* =====================================================
   CODEXA — JAVASCRIPT PART 2/3
   SAVED PROJECTS + OPEN + BACK + DELETE
   FIXED / OPTIMIZED
   ===================================================== */


/* =====================================================
   SHOW OPENED PROJECT BAR
   ===================================================== */

function showOpenedProjectBar(projectName) {

    if (!openedProjectBar) {
        return;
    }

    openedProjectBar.classList.add("show");

    if (openedProjectText) {
        openedProjectText.textContent =
            `"${projectName}" is currently open.`;
    }

}


/* =====================================================
   HIDE OPENED PROJECT BAR
   ===================================================== */

function hideOpenedProjectBar() {

    if (!openedProjectBar) {
        return;
    }

    openedProjectBar.classList.remove("show");

}


/* =====================================================
   OPEN SAVED PROJECTS PAGE
   ===================================================== */

function openSavedProjects() {

    if (!compilerPage || !savedProjectsPage) {
        return;
    }

    document.body.classList.add("saved-view");

    compilerPage.style.display = "none";

    savedProjectsPage.classList.add("active");

    /*
       Render on next frame so the page becomes visible
       before project cards are created.
    */

    requestAnimationFrame(function () {

        renderProjects();

    });

    window.scrollTo(0, 0);

}


/* =====================================================
   SAVED PROJECTS BUTTON
   ===================================================== */

if (savedProjectsBtn) {

    savedProjectsBtn.addEventListener(
        "click",
        function () {

            blurButton(this);

            openSavedProjects();

        }
    );

}


/* =====================================================
   BACK TO COMPILER
   ===================================================== */

if (backToCompilerBtn) {

    backToCompilerBtn.addEventListener(
        "click",
        function () {

            blurButton(this);

            restoreHomeCode();

            savedProjectsPage.classList.remove("active");

            document.body.classList.remove("saved-view");

            compilerPage.style.display = "block";

            window.scrollTo(0, 0);

            buildPreview();

        }
    );

}


/* =====================================================
   BACK TO SAVED PROJECTS FROM OPENED PROJECT
   ===================================================== */

if (backToSavedProjectsFromCompiler) {

    backToSavedProjectsFromCompiler.addEventListener(
        "click",
        function () {

            blurButton(this);

            openSavedProjects();

        }
    );

}


/* =====================================================
   RESTORE HOME CODE
   ===================================================== */

function restoreHomeCode() {

    htmlCode.value =
        homeCode.html;

    cssCode.value =
        homeCode.css;

    jsCode.value =
        homeCode.js;

    projectNameInput.value =
        "";

    activeProjectId =
        null;

    hideOpenedProjectBar();

}


/* =====================================================
   RENDER SAVED PROJECTS
   ===================================================== */

function renderProjects() {

    if (!projectsGrid) {
        return;
    }


    const projects =
        getProjects();


    /*
       Clear old cards first.
    */

    projectsGrid.replaceChildren();


    /* =================================================
       EMPTY STATE
       ================================================= */

    if (!projects.length) {

        const empty =
            document.createElement("div");

        empty.className =
            "empty-projects";


        const wrapper =
            document.createElement("div");


        const title =
            document.createElement("h2");

        title.textContent =
            "No Saved Projects";


        const text =
            document.createElement("p");

        text.textContent =
            "Save your first Codexa project and it will appear here.";


        wrapper.appendChild(title);

        wrapper.appendChild(text);

        empty.appendChild(wrapper);

        projectsGrid.appendChild(empty);

        return;

    }


    /* =================================================
       CREATE PROJECT CARDS
       ================================================= */

    const fragment =
        document.createDocumentFragment();


    projects.forEach(
        function (project, index) {

            if (!project) {
                return;
            }


            const card =
                document.createElement("div");

            card.className =
                "project-card";


            /* ==================== NUMBER ==================== */

            const number =
                document.createElement("span");

            number.className =
                "project-number";

            number.textContent =
                `PROJECT ${String(index + 1).padStart(2, "0")}`;


            /* ==================== NAME ==================== */

            const title =
                document.createElement("h3");

            title.textContent =
                project.name ||
                "Untitled Project";


            /* ==================== DATE ==================== */

            const dateElement =
                document.createElement("div");

            dateElement.className =
                "project-date";


            let savedDate =
                "Unknown";


            if (project.savedAt) {

                const parsedDate =
                    new Date(project.savedAt);


                if (
                    !Number.isNaN(
                        parsedDate.getTime()
                    )
                ) {

                    savedDate =
                        parsedDate.toLocaleString();

                }

            }


            dateElement.textContent =
                `Saved ${savedDate}`;


            /* ==================== ACTIONS ==================== */

            const actions =
                document.createElement("div");

            actions.className =
                "project-actions";


            const openButton =
                document.createElement("button");

            openButton.className =
                "open-project";

            openButton.type =
                "button";

            openButton.textContent =
                "Open";


            const downloadButton =
                document.createElement("button");

            downloadButton.className =
                "download-project";

            downloadButton.type =
                "button";

            downloadButton.textContent =
                "Download";


            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "delete-project";

            deleteButton.type =
                "button";

            deleteButton.textContent =
                "Delete";


            /* ==================== OPEN ==================== */

            openButton.addEventListener(
                "click",
                function () {

                    blurButton(this);

                    loadProject(
                        project.id
                    );

                }
            );


            /* ==================== DOWNLOAD ==================== */

            downloadButton.addEventListener(
                "click",
                function () {

                    blurButton(this);

                    downloadProject(
                        project
                    );

                }
            );


            /* ==================== DELETE ==================== */

            deleteButton.addEventListener(
                "click",
                function () {

                    blurButton(this);

                    askDelete(
                        project
                    );

                }
            );


            /* ==================== BUILD CARD ==================== */

            actions.appendChild(
                openButton
            );

            actions.appendChild(
                downloadButton
            );

            actions.appendChild(
                deleteButton
            );


            card.appendChild(
                number
            );

            card.appendChild(
                title
            );

            card.appendChild(
                dateElement
            );

            card.appendChild(
                actions
            );


            fragment.appendChild(
                card
            );

        }
    );


    /*
       Insert all cards only once.
       This is much lighter than repeatedly
       modifying the live DOM.
    */

    projectsGrid.appendChild(
        fragment
    );

}


/* =====================================================
   LOAD PROJECT
   ===================================================== */

function loadProject(projectId) {

    const projects =
        getProjects();


    const project =
        projects.find(
            function (item) {

                return (
                    item &&
                    item.id === projectId
                );

            }
        );


    if (!project) {

        showToast(
            "Project Not Found",
            "This project could not be found.",
            "!",
            2500
        );

        renderProjects();

        return;

    }


    htmlCode.value =
        project.html || "";


    cssCode.value =
        project.css || "";


    jsCode.value =
        project.js || "";


    projectNameInput.value =
        project.name || "";


    activeProjectId =
        project.id;


    savedProjectsPage.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "saved-view"
    );


    compilerPage.style.display =
        "block";


    showOpenedProjectBar(
        project.name ||
        "Untitled Project"
    );


    window.scrollTo(
        0,
        0
    );


    buildPreview();


    showToast(
        "Project Loaded",
        `"${project.name || "Untitled Project"}" is now open in Codexa.`,
        "✓",
        2400
    );

}


/* =====================================================
   ASK DELETE
   ===================================================== */

function askDelete(project) {

    showConfirm(
        "Delete Project",
        `"${project.name || "Untitled Project"}" will be removed from Saved Projects. This action cannot be undone.`,
        "Delete",
        function () {

            deleteProject(
                project.id
            );

        }
    );

}


/* =====================================================
   DELETE PROJECT
   ===================================================== */

function deleteProject(projectId) {

    const projects =
        getProjects();


    const updated =
        projects.filter(
            function (project) {

                return (
                    project &&
                    project.id !== projectId
                );

            }
        );


    if (
        updated.length ===
        projects.length
    ) {

        showToast(
            "Project Not Found",
            "This project could not be found.",
            "!",
            2500
        );

        return;

    }


    const saved =
        writeProjects(
            updated
        );


    if (!saved) {

        showToast(
            "Delete Failed",
            "The project could not be deleted.",
            "!",
            3000
        );

        return;

    }


    if (
        activeProjectId ===
        projectId
    ) {

        activeProjectId =
            null;

        projectNameInput.value =
            "";

        hideOpenedProjectBar();

    }


    renderProjects();


    showToast(
        "Project Deleted",
        "The project has been removed successfully.",
        "✓",
        2400
    );

}


/* =====================================================
   DEFAULT PAGE STATE
   ===================================================== */

if (compilerPage) {

    compilerPage.style.display =
        "block";

}


if (savedProjectsPage) {

    savedProjectsPage.classList.remove(
        "active"
    );

}


document.body.classList.remove(
    "saved-view"
);
/* =====================================================
   CODEXA — JAVASCRIPT PART 3/3
   DOWNLOAD + COPY + FULLSCREEN + FINAL
   ===================================================== */


/* =====================================================
   DOWNLOAD CURRENT PROJECT
   ===================================================== */

downloadBtn.addEventListener(
    "click",
    function () {

        blurButton(
            this
        );


        const name =
            projectNameInput.value.trim();


        if (!name) {

            showToast(
                "Name Required",
                "Please enter a project name before downloading.",
                "!",
                2500
            );


            projectNameInput.focus();


            return;

        }


        downloadCurrentProject(
            name
        );

    }
);


/* =====================================================
   DOWNLOAD CURRENT PROJECT
   ===================================================== */

async function downloadCurrentProject(
    name
) {

    const cleanName =
        String(
            name || ""
        ).trim();


    if (!cleanName) {

        showToast(
            "Name Required",
            "Please enter a project name before downloading.",
            "!",
            2500
        );


        return;

    }


    const project = {

        name:
            cleanName,

        html:
            htmlCode.value,

        css:
            cssCode.value,

        js:
            jsCode.value

    };


    await downloadProject(
        project
    );

}


/* =====================================================
   DOWNLOAD SAVED PROJECT
   ===================================================== */

async function downloadProject(
    project
) {

    if (
        typeof JSZip ===
        "undefined"
    ) {

        showToast(
            "Download Error",
            "The ZIP library could not be loaded.",
            "!",
            3000
        );


        return;

    }


    try {

        const zip =
            new JSZip();


        const title =
            escapeHTML(
                project.name ||
                "Codexa Project"
            );


        const indexHTML =
`<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<title>${title}</title>

<link
    rel="stylesheet"
    href="style.css"
>

</head>

<body>

${project.html || ""}

<script src="script.js"><\/script>

</body>

</html>`;


        zip.file(
            "index.html",
            indexHTML
        );


        zip.file(
            "style.css",
            project.css || ""
        );


        zip.file(
            "script.js",
            project.js || ""
        );


        showToast(
            "Preparing Download",
            "Creating your ZIP file...",
            "↓",
            0
        );


        const blob =
            await zip.generateAsync({
                type: "blob"
            });


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            sanitizeFileName(
                project.name
            ) + ".zip";


        link.style.display =
            "none";


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        setTimeout(
            function () {

                URL.revokeObjectURL(
                    url
                );

            },
            1500
        );


        const preparationToasts =
            document.querySelectorAll(
                ".toast"
            );


        preparationToasts.forEach(
            function (toast) {

                const titleElement =
                    toast.querySelector(
                        ".toast-title"
                    );


                if (
                    titleElement &&
                    titleElement.textContent ===
                    "Preparing Download"
                ) {

                    toast.remove();

                }

            }
        );


        showToast(
            "Download Ready",
            `"${project.name}.zip" is ready.`,
            "✓",
            2600
        );


    } catch (error) {

        console.error(
            "ZIP error:",
            error
        );


        showToast(
            "Download Failed",
            "Something went wrong while creating the ZIP file.",
            "!",
            3000
        );

    }

}


/* =====================================================
   SANITIZE FILE NAME
   ===================================================== */

function sanitizeFileName(
    name
) {

    return String(
        name || ""
    )
        .trim()
        .replace(
            /[<>:"/\\|?*\x00-\x1F]/g,
            ""
        )
        .replace(
            /\s+/g,
            "-"
        )
        .substring(
            0,
            80
        )
        ||
        "Codexa-Project";

}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHTML(
    text
) {

    return String(
        text
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   COPY CODE
   ===================================================== */

function copyCode(
    id
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {
        return;
    }


    const text =
        element.value;


    if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText ===
            "function"
    ) {

        navigator.clipboard
            .writeText(
                text
            )
            .then(
                function () {

                    showToast(
                        "Code Copied",
                        "The selected code has been copied to your clipboard.",
                        "✓",
                        2200
                    );

                }
            )
            .catch(
                function () {

                    fallbackCopy(
                        text,
                        id
                    );

                }
            );


        return;

    }


    fallbackCopy(
        text,
        id
    );

}


/* =====================================================
   FALLBACK COPY
   ===================================================== */

function fallbackCopy(
    text,
    id
) {

    const temp =
        document.createElement(
            "textarea"
        );


    temp.value =
        text;


    temp.setAttribute(
        "readonly",
        ""
    );


    temp.style.position =
        "fixed";


    temp.style.top =
        "0";


    temp.style.left =
        "-9999px";


    temp.style.width =
        "1px";


    temp.style.height =
        "1px";


    temp.style.opacity =
        "0";


    document.body.appendChild(
        temp
    );


    temp.focus();


    temp.select();


    temp.setSelectionRange(
        0,
        temp.value.length
    );


    let success =
        false;


    try {

        success =
            document.execCommand(
                "copy"
            );

    } catch (error) {

        console.error(
            "Fallback copy error:",
            error
        );

    }


    temp.remove();


    if (success) {

        showToast(
            "Code Copied",
            "The selected code has been copied to your clipboard.",
            "✓",
            2200
        );


        return;

    }


    const original =
        document.getElementById(
            id
        );


    if (original) {

        original.focus();

        original.select();

        original.setSelectionRange(
            0,
            original.value.length
        );

    }


    showToast(
        "Select & Copy",
        "The code has been selected. Use your phone's Copy option.",
        "!",
        3000
    );

}


/* =====================================================
   FULLSCREEN
   ===================================================== */

fullscreenBtn.addEventListener(
    "click",
    async function () {

        blurButton(
            this
        );


        try {

            if (
                document.fullscreenElement
            ) {

                await document.exitFullscreen();

                return;

            }


            if (
                preview &&
                typeof preview.requestFullscreen ===
                    "function"
            ) {

                await preview.requestFullscreen();

                return;

            }


            showToast(
                "Fullscreen Unavailable",
                "Fullscreen is not supported by this browser.",
                "!",
                2600
            );


        } catch (error) {

            console.error(
                "Fullscreen error:",
                error
            );


            showToast(
                "Fullscreen Error",
                "Fullscreen mode could not be opened.",
                "!",
                2600
            );

        }

    }
);


/* =====================================================
   FULLSCREEN STATE
   ===================================================== */

document.addEventListener(
    "fullscreenchange",
    function () {

        fullscreenBtn.textContent =
            document.fullscreenElement
                ? "Exit Fullscreen"
                : "Fullscreen";

    }
);


/* =====================================================
   INITIALIZE CODEXA
   ===================================================== */

function initializeCodexa() {

    compilerPage.style.display =
        "block";


    savedProjectsPage.classList.remove(
        "active"
    );


    document.body.classList.remove(
        "saved-view"
    );


    hideOpenedProjectBar();


    buildPreview();

}


/* =====================================================
   PAGE LOAD
   ===================================================== */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeCodexa,
        {
            once: true
        }
    );

} else {

    initializeCodexa();

}


/* =====================================================
   MOBILE BUTTON STATE FIX
   ===================================================== */

document.addEventListener(
    "pointerup",
    function (event) {

        const target =
            event.target.closest(
                "button, .github-btn"
            );


        if (target) {

            setTimeout(
                function () {

                    blurButton(
                        target
                    );

                },
                0
            );

        }

    },
    {
        passive: true
    }
);


document.addEventListener(
    "pointercancel",
    function (event) {

        const target =
            event.target.closest(
                "button, .github-btn"
            );


        if (target) {

            blurButton(
                target
            );

        }

    },
    {
        passive: true
    }
);


/* =====================================================
   PROJECT NAME — ENTER TO SAVE
   ===================================================== */

projectNameInput.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter"
        ) {

            event.preventDefault();

            saveBtn.click();

        }

    }
);