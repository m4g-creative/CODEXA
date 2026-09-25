/* =====================================================
   CODEXA — SCRIPT.JS PART 1/3
   CONFIG + SPLASH + AUTH + NAVIGATION
   ===================================================== */


/* =====================================================
   SUPABASE CONFIG
   ===================================================== */

const SUPABASE_URL =
    "https://idfqgujrsrurlajyultw.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_tACoZGEalQ9xoMoGGcyUFA_hOshBQxA";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =====================================================
   STARTER CODE
   ===================================================== */

const DEFAULT_HTML = `<!DOCTYPE html>
<html>
<head>
    <title>Codexa Project</title>
</head>
<body>

    <h1>Hello, Codexa!</h1>
    <p>Start building your website here.</p>

</body>
</html>`;


const DEFAULT_CSS = `body {
    margin: 0;
    padding: 40px;
    font-family: Arial, sans-serif;
    background: #111827;
    color: white;
}

h1 {
    color: #8b5cf6;
}`;


const DEFAULT_JS = `console.log("Codexa is running!");`;


/* =====================================================
   APPLICATION STATE
   ===================================================== */

let currentUser = null;

let activeProjectId = null;

let confirmCallback = null;

let clearSnapshot = null;

let splashFinished = false;


/* =====================================================
   DOM ELEMENTS
   ===================================================== */


/* ---------- Splash ---------- */

const splashScreen =
    document.getElementById("splashScreen");

const splashBrandText =
    document.getElementById("splashBrandText");


/* ---------- Auth ---------- */

const authPage =
    document.getElementById("authPage");

const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const signupEmail =
    document.getElementById("signupEmail");

const signupPassword =
    document.getElementById("signupPassword");

const signupPasswordConfirm =
    document.getElementById("signupPasswordConfirm");

const loginBtn =
    document.getElementById("loginBtn");

const signupBtn =
    document.getElementById("signupBtn");

const showSignupBtn =
    document.getElementById("showSignupBtn");

const showLoginBtn =
    document.getElementById("showLoginBtn");

const loginMessage =
    document.getElementById("loginMessage");

const signupMessage =
    document.getElementById("signupMessage");


/* ---------- App ---------- */

const appShell =
    document.getElementById("appShell");

const compilerPage =
    document.getElementById("compilerPage");

const savedProjectsPage =
    document.getElementById("savedProjectsPage");


/* ---------- Navbar ---------- */

const savedProjectsBtn =
    document.getElementById("savedProjectsBtn");

const logoutBtn =
    document.getElementById("logoutBtn");

const mobileSavedProjectsBtn =
    document.getElementById("mobileSavedProjectsBtn");

const mobileLogoutBtn =
    document.getElementById("mobileLogoutBtn");

const menuToggleBtn =
    document.getElementById("menuToggleBtn");

const mobileNav =
    document.getElementById("mobileNav");


/* ---------- Compiler ---------- */

const projectNameInput =
    document.getElementById("projectNameInput");

const runBtn =
    document.getElementById("runBtn");

const clearBtn =
    document.getElementById("clearBtn");

const undoBtn =
    document.getElementById("undoBtn");

const downloadBtn =
    document.getElementById("downloadBtn");

const saveBtn =
    document.getElementById("saveBtn");


/* ---------- Editors ---------- */

const htmlCode =
    document.getElementById("htmlCode");

const cssCode =
    document.getElementById("cssCode");

const jsCode =
    document.getElementById("jsCode");


/* ---------- Preview ---------- */

const preview =
    document.getElementById("preview");

const previewCard =
    document.getElementById("previewCard");

const previewContent =
    document.getElementById("previewContent");

const previewToggleBtn =
    document.getElementById("previewToggleBtn");

const previewArrow =
    document.getElementById("previewArrow");

const fullscreenBtn =
    document.getElementById("fullscreenBtn");


/* ---------- Opened Project ---------- */

const openedProjectBar =
    document.getElementById("openedProjectBar");

const openedProjectText =
    document.getElementById("openedProjectText");

const backToSavedProjectsFromCompiler =
    document.getElementById(
        "backToSavedProjectsFromCompiler"
    );


/* ---------- Saved Projects ---------- */

const backToCompilerBtn =
    document.getElementById("backToCompilerBtn");

const projectsGrid =
    document.getElementById("projectsGrid");


/* ---------- Toast ---------- */

const toastContainer =
    document.getElementById("toastContainer");


/* ---------- Confirm ---------- */

const confirmOverlay =
    document.getElementById("confirmOverlay");

const confirmTitle =
    document.getElementById("confirmTitle");

const confirmMessage =
    document.getElementById("confirmMessage");

const confirmCancel =
    document.getElementById("confirmCancel");

const confirmAction =
    document.getElementById("confirmAction");


/* =====================================================
   SPLASH TYPING ANIMATION
   ===================================================== */

function startSplash() {

    const text = "Codexa";

    let index = 0;

    splashBrandText.textContent = "";


    const typingSpeed = 105;


    function typeNextCharacter() {

        if (index < text.length) {

            splashBrandText.textContent +=
                text.charAt(index);

            index++;

            setTimeout(
                typeNextCharacter,
                typingSpeed
            );

            return;
        }


        setTimeout(
            finishSplash,
            350
        );

    }


    typeNextCharacter();

}


/* =====================================================
   FINISH SPLASH
   ===================================================== */

function finishSplash() {

    if (splashFinished) {
        return;
    }

    splashFinished = true;


    if (splashScreen) {

        splashScreen.classList.add("hide");

    }


    document.body.classList.remove(
        "splash-active"
    );

}


/* =====================================================
   AUTH PAGE DISPLAY
   ===================================================== */

function showAuthPage() {

    if (!authPage || !appShell) {
        return;
    }


    authPage.style.display = "flex";

    appShell.style.display = "none";


    compilerPage.style.display = "block";

    savedProjectsPage.classList.remove(
        "active"
    );

}


/* =====================================================
   APP DISPLAY
   ===================================================== */

function showApp() {

    if (!authPage || !appShell) {
        return;
    }


    authPage.style.display = "none";

    appShell.style.display = "flex";


    showCompiler();

}


/* =====================================================
   SHOW LOGIN FORM
   ===================================================== */

function showLoginForm() {

    loginForm.classList.remove(
        "hidden-auth"
    );

    signupForm.classList.add(
        "hidden-auth"
    );


    loginMessage.textContent = "";

    signupMessage.textContent = "";

}


/* =====================================================
   SHOW SIGNUP FORM
   ===================================================== */

function showSignupForm() {

    signupForm.classList.remove(
        "hidden-auth"
    );

    loginForm.classList.add(
        "hidden-auth"
    );


    loginMessage.textContent = "";

    signupMessage.textContent = "";

}


/* =====================================================
   AUTH MESSAGE
   ===================================================== */

function setAuthMessage(
    element,
    message,
    type = ""
) {

    element.textContent = message;

    element.className =
        "auth-message";


    if (type) {

        element.classList.add(type);

    }

}


/* =====================================================
   LOGIN
   ===================================================== */

async function loginUser() {

    const email =
        loginEmail.value.trim();

    const password =
        loginPassword.value;


    if (!email || !password) {

        setAuthMessage(
            loginMessage,
            "Please enter email and password.",
            "error"
        );

        return;

    }


    loginBtn.disabled = true;

    loginBtn.textContent =
        "Logging in...";


    setAuthMessage(
        loginMessage,
        ""
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {
            throw error;
        }


        currentUser =
            data.user;


        loginEmail.value = "";

        loginPassword.value = "";


        showApp();


    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        setAuthMessage(
            loginMessage,
            error.message ||
            "Login failed.",
            "error"
        );

    } finally {

        loginBtn.disabled = false;

        loginBtn.textContent =
            "Login";

    }

}


/* =====================================================
   SIGNUP
   ===================================================== */

async function signupUser() {

    const email =
        signupEmail.value.trim();

    const password =
        signupPassword.value;

    const confirmPassword =
        signupPasswordConfirm.value;


    if (!email ||
        !password ||
        !confirmPassword) {

        setAuthMessage(
            signupMessage,
            "Please fill in all fields.",
            "error"
        );

        return;

    }


    if (password !== confirmPassword) {

        setAuthMessage(
            signupMessage,
            "Passwords do not match.",
            "error"
        );

        return;

    }


    if (password.length < 6) {

        setAuthMessage(
            signupMessage,
            "Password must be at least 6 characters.",
            "error"
        );

        return;

    }


    signupBtn.disabled = true;

    signupBtn.textContent =
        "Creating...";


    setAuthMessage(
        signupMessage,
        ""
    );


    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.signUp({

                email: email,

                password: password

            });


        if (error) {
            throw error;
        }


        signupEmail.value = "";

        signupPassword.value = "";

        signupPasswordConfirm.value = "";


        if (data.session) {

            currentUser =
                data.user;

            showApp();

            return;

        }


        setAuthMessage(
            signupMessage,
            "Account created. Check your email to confirm your account.",
            "success"
        );


    } catch (error) {

        console.error(
            "Signup error:",
            error
        );


        setAuthMessage(
            signupMessage,
            error.message ||
            "Signup failed.",
            "error"
        );

    } finally {

        signupBtn.disabled = false;

        signupBtn.textContent =
            "Create Account";

    }

}


/* =====================================================
   LOGOUT
   ===================================================== */

async function logoutUser() {

    try {

        const {
            error
        } =
            await supabaseClient.auth.signOut();


        if (error) {
            throw error;
        }


        currentUser = null;

        activeProjectId = null;

        clearSnapshot = null;


        resetEditorState();


        closeMobileMenu();


        showAuthPage();


        showLoginForm();


        showToast(
            "Logged out successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "Logout error:",
            error
        );


        showToast(
            "Logout failed.",
            "error"
        );

    }

}


/* =====================================================
   RESET EDITOR STATE
   ===================================================== */

function resetEditorState() {

    activeProjectId = null;

    clearSnapshot = null;


    projectNameInput.value = "";

    htmlCode.value = DEFAULT_HTML;

    cssCode.value = DEFAULT_CSS;

    jsCode.value = DEFAULT_JS;


    undoBtn.disabled = true;


    hideOpenedProjectBar();


    clearPreview();

}


/* =====================================================
   SHOW COMPILER
   ===================================================== */

function showCompiler() {

    compilerPage.style.display =
        "block";

    savedProjectsPage.classList.remove(
        "active"
    );


    closeMobileMenu();

}


/* =====================================================
   SHOW SAVED PROJECTS
   ===================================================== */

function showSavedProjects() {

    compilerPage.style.display =
        "none";

    savedProjectsPage.classList.add(
        "active"
    );


    closeMobileMenu();


    loadSavedProjects();

}


/* =====================================================
   MOBILE MENU
   ===================================================== */

function toggleMobileMenu() {

    const isOpen =
        mobileNav.classList.toggle("open");


    menuToggleBtn.classList.toggle(
        "active",
        isOpen
    );


    menuToggleBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

}


function closeMobileMenu() {

    if (!mobileNav) {
        return;
    }


    mobileNav.classList.remove(
        "open"
    );


    menuToggleBtn.classList.remove(
        "active"
    );


    menuToggleBtn.setAttribute(
        "aria-expanded",
        "false"
    );

}


/* =====================================================
   EVENT LISTENERS — AUTH
   ===================================================== */

loginBtn.addEventListener(
    "click",
    loginUser
);


signupBtn.addEventListener(
    "click",
    signupUser
);


showSignupBtn.addEventListener(
    "click",
    showSignupForm
);


showLoginBtn.addEventListener(
    "click",
    showLoginForm
);


/* =====================================================
   ENTER KEY AUTH
   ===================================================== */

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        loginUser();

    }
);


signupForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        signupUser();

    }
);


/* =====================================================
   EVENT LISTENERS — NAVIGATION
   ===================================================== */

savedProjectsBtn.addEventListener(
    "click",
    showSavedProjects
);


logoutBtn.addEventListener(
    "click",
    logoutUser
);


mobileSavedProjectsBtn.addEventListener(
    "click",
    showSavedProjects
);


mobileLogoutBtn.addEventListener(
    "click",
    logoutUser
);


menuToggleBtn.addEventListener(
    "click",
    toggleMobileMenu
);


/* =====================================================
   EVENT LISTENERS — COMPILER NAVIGATION
   ===================================================== */

backToCompilerBtn.addEventListener(
    "click",
    backToCompiler
);


backToSavedProjectsFromCompiler.addEventListener(
    "click",
    showSavedProjects
);


/* =====================================================
   START SPLASH
   ===================================================== */

startSplash();
/* =====================================================
   CODEXA — SCRIPT.JS PART 2/3
   COMPILER + RUN + CLEAR/UNDO + SAVE + PREVIEW
   ===================================================== */


/* =====================================================
   SHOW / HIDE OPENED PROJECT BAR
   ===================================================== */

function showOpenedProjectBar(projectName) {

    openedProjectText.textContent =
        `Opened project: ${projectName}`;

    openedProjectBar.classList.add(
        "visible"
    );

}


function hideOpenedProjectBar() {

    openedProjectBar.classList.remove(
        "visible"
    );

    openedProjectText.textContent =
        "Saved project is currently open.";

}


/* =====================================================
   CLEAR PREVIEW
   ===================================================== */

function clearPreview() {

    /*
       IMPORTANT:
       This function ONLY clears the preview.

       It does NOT execute code.
       It does NOT show a success toast.
    */

    preview.srcdoc = "";

}


/* =====================================================
   BUILD PREVIEW DOCUMENT
   ===================================================== */

function buildPreviewDocument() {

    const html =
        htmlCode.value;

    const css =
        cssCode.value;

    const js =
        jsCode.value;


    return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
>

<style>

${css}

</style>

</head>

<body>

${html}

<script>

try {

${js}

} catch (error) {

    console.error(error);

}

<\/script>

</body>

</html>
`;

}


/* =====================================================
   RUN CODE
   ===================================================== */

function runCode() {

    /*
       ONLY THIS FUNCTION is allowed to show:
       "Code executed successfully."

       Clear, Save, Download, Copy,
       navigation etc. must NOT call this function.
    */


    preview.srcdoc =
        buildPreviewDocument();


    showToast(
        "Code executed successfully.",
        "success"
    );

}


/* =====================================================
   SAVE CLEAR SNAPSHOT
   ===================================================== */

function createClearSnapshot() {

    clearSnapshot = {

        html: htmlCode.value,

        css: cssCode.value,

        js: jsCode.value

    };


    undoBtn.disabled = false;

}


/* =====================================================
   CLEAR EDITORS
   ===================================================== */

function clearEditor() {

    /*
       IMPORTANT:

       Clear does NOT touch Supabase.

       Clear does NOT call runCode().

       Clear only changes the current editor
       values in the browser.
    */


    createClearSnapshot();


    htmlCode.value = "";

    cssCode.value = "";

    jsCode.value = "";


    /*
       Preview remains unchanged.

       The user can press Run if they want
       the cleared state to appear in preview.
    */


    showToast(
        "Editors cleared. Press Undo to restore.",
        "info"
    );

}


/* =====================================================
   UNDO CLEAR
   ===================================================== */

function undoClear() {

    if (!clearSnapshot) {

        return;

    }


    htmlCode.value =
        clearSnapshot.html;

    cssCode.value =
        clearSnapshot.css;

    jsCode.value =
        clearSnapshot.js;


    clearSnapshot = null;

    undoBtn.disabled = true;


    showToast(
        "Previous code restored.",
        "success"
    );

}


/* =====================================================
   CLEAR / UNDO EVENTS
   ===================================================== */

clearBtn.addEventListener(
    "click",
    clearEditor
);


undoBtn.addEventListener(
    "click",
    undoClear
);


/* =====================================================
   RUN EVENT
   ===================================================== */

runBtn.addEventListener(
    "click",
    runCode
);


/* =====================================================
   SAVE PROJECT
   ===================================================== */

async function saveProject() {

    if (!currentUser) {

        showToast(
            "Please login first.",
            "error"
        );

        return;

    }


    let projectName =
        projectNameInput.value.trim();


    if (!projectName) {

        projectName =
            "Untitled Project";

        projectNameInput.value =
            projectName;

    }


    saveBtn.disabled = true;

    saveBtn.textContent =
        activeProjectId
            ? "Updating..."
            : "Saving...";


    try {

        /*
           IMPORTANT:
           Database write happens ONLY here.

           Clear/Open/Back/Preview do not
           automatically write anything.
        */


        if (activeProjectId) {

            const {
                error
            } =
                await supabaseClient
                    .from("projects")
                    .update({

                        project_name:
                            projectName,

                        html_code:
                            htmlCode.value,

                        css_code:
                            cssCode.value,

                        js_code:
                            jsCode.value,

                        updated_at:
                            new Date().toISOString()

                    })
                    .eq(
                        "id",
                        activeProjectId
                    )
                    .eq(
                        "user_id",
                        currentUser.id
                    );


            if (error) {
                throw error;
            }


            showToast(
                "Project updated successfully.",
                "success"
            );


        } else {

            const {
                data,
                error
            } =
                await supabaseClient
                    .from("projects")
                    .insert({

                        user_id:
                            currentUser.id,

                        project_name:
                            projectName,

                        html_code:
                            htmlCode.value,

                        css_code:
                            cssCode.value,

                        js_code:
                            jsCode.value

                    })
                    .select()
                    .single();


            if (error) {
                throw error;
            }


            if (data) {

                activeProjectId =
                    data.id;

            }


            showOpenedProjectBar(
                projectName
            );


            showToast(
                "Project saved successfully.",
                "success"
            );

        }


    } catch (error) {

        console.error(
            "Save project error:",
            error
        );


        showToast(
            error.message ||
            "Unable to save project.",
            "error"
        );


    } finally {

        saveBtn.disabled = false;

        saveBtn.textContent =
            activeProjectId
                ? "Update Project"
                : "Save Project";

    }

}


/* =====================================================
   SAVE EVENT
   ===================================================== */

saveBtn.addEventListener(
    "click",
    saveProject
);


/* =====================================================
   DOWNLOAD ZIP
   ===================================================== */

async function downloadProjectZip() {

    if (
        typeof JSZip ===
        "undefined"
    ) {

        showToast(
            "ZIP library is unavailable.",
            "error"
        );

        return;

    }


    const projectName =
        projectNameInput.value.trim() ||
        "Codexa Project";


    try {

        const zip =
            new JSZip();


        zip.file(
            "index.html",
            htmlCode.value
        );


        zip.file(
            "style.css",
            cssCode.value
        );


        zip.file(
            "script.js",
            jsCode.value
        );


        const blob =
            await zip.generateAsync({
                type: "blob"
            });


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `${sanitizeFilename(projectName)}.zip`;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        URL.revokeObjectURL(url);


        showToast(
            "ZIP downloaded successfully.",
            "success"
        );


    } catch (error) {

        console.error(
            "ZIP error:",
            error
        );


        showToast(
            "Unable to create ZIP file.",
            "error"
        );

    }

}


/* =====================================================
   DOWNLOAD EVENT
   ===================================================== */

downloadBtn.addEventListener(
    "click",
    function() {

        const projectName =
            projectNameInput.value.trim();

        if (!projectName) {

            showToast(
                "Please enter a project name first.",
                "error"
            );

            projectNameInput.focus();

            return;
        }

        downloadProjectZip();

    }
);


/* =====================================================
   SANITIZE FILE NAME
   ===================================================== */

function sanitizeFilename(name) {

    return name
        .replace(
            /[<>:"/\\|?*]/g,
            "_"
        )
        .replace(
            /\s+/g,
            "_"
        )
        .substring(
            0,
            100
        );

}


/* =====================================================
   PREVIEW TOGGLE
   ===================================================== */

function togglePreview() {

    const collapsed =
        previewCard.classList.toggle(
            "collapsed"
        );


    previewToggleBtn.setAttribute(
        "aria-expanded",
        String(!collapsed)
    );

}


/* =====================================================
   PREVIEW TOGGLE EVENT
   ===================================================== */

previewToggleBtn.addEventListener(
    "click",
    togglePreview
);


/* =====================================================
   FULLSCREEN PREVIEW
   ===================================================== */

function fullscreenPreview() {

    if (
        !preview
    ) {
        return;
    }


    if (
        document.fullscreenElement
    ) {

        document.exitFullscreen();

        return;

    }


    if (
        preview.requestFullscreen
    ) {

        preview.requestFullscreen();

        return;

    }


    if (
        previewCard.requestFullscreen
    ) {

        previewCard.requestFullscreen();

    }

}


/* =====================================================
   FULLSCREEN EVENT
   ===================================================== */

fullscreenBtn.addEventListener(
    "click",
    fullscreenPreview
);


/* =====================================================
   BACK TO COMPILER
   ===================================================== */

function backToCompiler() {

    /*
       IMPORTANT:

       This completely leaves the Saved Projects
       screen and returns to a fresh compiler state.

       It does NOT run the code.
       It does NOT update Supabase.
    */


    activeProjectId = null;

    clearSnapshot = null;


    projectNameInput.value = "";


    htmlCode.value =
        DEFAULT_HTML;

    cssCode.value =
        DEFAULT_CSS;

    jsCode.value =
        DEFAULT_JS;


    undoBtn.disabled = true;


    hideOpenedProjectBar();


    clearPreview();


    showCompiler();


    showToast(
        "Back to compiler.",
        "info"
    );

}


/* =====================================================
   OPEN SAVED PROJECT
   ===================================================== */

async function openProject(project) {

    if (!project) {
        return;
    }


    activeProjectId =
        project.id;


    projectNameInput.value =
        project.project_name || "";


    htmlCode.value =
        project.html_code || "";


    cssCode.value =
        project.css_code || "";


    jsCode.value =
        project.js_code || "";


    clearSnapshot = null;

    undoBtn.disabled = true;


    showOpenedProjectBar(
        project.project_name ||
        "Saved Project"
    );


    /*
       IMPORTANT:
       Opening a saved project does NOT run it.

       User must press Run manually.
    */

    clearPreview();


    showCompiler();


    saveBtn.textContent =
        "Update Project";


    showToast(
        "Project opened.",
        "success"
    );

}


/* =====================================================
   BACK TO SAVED PROJECTS
   ===================================================== */

backToSavedProjectsFromCompiler.addEventListener(
    "click",
    function() {

        showSavedProjects();

    }
);


/* =====================================================
   PROJECT NAME CHANGE
   ===================================================== */

projectNameInput.addEventListener(
    "input",
    function() {

        /*
           Changing the name does not save
           anything automatically.
        */

    }
);
/* =====================================================
   CODEXA — SCRIPT.JS PART 3/3
   SAVED PROJECTS + DELETE + COPY + TOAST + CONFIRM
   ===================================================== */


/* =====================================================
   LOAD SAVED PROJECTS
   ===================================================== */

async function loadSavedProjects() {

    if (!currentUser) {

        projectsGrid.innerHTML = `
            <div class="empty-projects">

                <h3>
                    Login Required
                </h3>

                <p>
                    Please login to view your saved projects.
                </p>

            </div>
        `;

        return;

    }


    projectsGrid.innerHTML = `
        <div class="empty-projects">

            <h3>
                Loading Projects...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("projects")
                .select("*")
                .eq(
                    "user_id",
                    currentUser.id
                )
                .order(
                    "updated_at",
                    {
                        ascending: false
                    }
                );


        if (error) {
            throw error;
        }


        renderSavedProjects(
            data || []
        );


    } catch (error) {

        console.error(
            "Load projects error:",
            error
        );


        projectsGrid.innerHTML = `
            <div class="empty-projects">

                <h3>
                    Unable to Load Projects
                </h3>

                <p>
                    ${escapeHtml(
                        error.message ||
                        "Something went wrong."
                    )}
                </p>

            </div>
        `;

    }

}


/* =====================================================
   RENDER SAVED PROJECTS
   ===================================================== */

function renderSavedProjects(
    projects
) {

    projectsGrid.innerHTML = "";


    if (!projects.length) {

        projectsGrid.innerHTML = `
            <div class="empty-projects">

                <h3>
                    No Saved Projects
                </h3>

                <p>
                    Create and save your first project
                    from the compiler.
                </p>

            </div>
        `;

        return;

    }


    projects.forEach(
        function(project) {

            const card =
                document.createElement("article");


            card.className =
                "project-card";


            const projectName =
                project.project_name ||
                "Untitled Project";


            const updated =
                formatProjectDate(
                    project.updated_at ||
                    project.created_at
                );


            card.innerHTML = `

                <h3>
                    ${escapeHtml(projectName)}
                </h3>

                <p>
                    Last updated: ${escapeHtml(updated)}
                </p>

                <div class="project-card-actions">

                    <button
                        type="button"
                        class="open-project-btn"
                    >
                        Open
                    </button>

                    <button
                        type="button"
                        class="copy-project-btn"
                    >
                        Copy
                    </button>

                    <button
                        type="button"
                        class="download-project-btn"
                    >
                        Download
                    </button>

                    <button
                        type="button"
                        class="delete-project-btn"
                    >
                        Delete
                    </button>

                </div>

            `;


            /* ---------- Open ---------- */

            const openBtn =
                card.querySelector(
                    ".open-project-btn"
                );


            openBtn.addEventListener(
                "click",
                function() {

                    openProject(project);

                }
            );


            /* ---------- Copy ---------- */

            const copyBtn =
                card.querySelector(
                    ".copy-project-btn"
                );


            copyBtn.addEventListener(
                "click",
                function() {

                    copySavedProject(
                        project
                    );

                }
            );


            /* ---------- Download ---------- */

            const downloadBtnProject =
                card.querySelector(
                    ".download-project-btn"
                );


            downloadBtnProject.addEventListener(
                "click",
                function() {

                    downloadSavedProject(
                        project
                    );

                }
            );


            /* ---------- Delete ---------- */

            const deleteBtn =
                card.querySelector(
                    ".delete-project-btn"
                );


            deleteBtn.addEventListener(
                "click",
                function() {

                    confirmDeleteProject(
                        project
                    );

                }
            );


            projectsGrid.appendChild(
                card
            );

        }
    );

}


/* =====================================================
   FORMAT PROJECT DATE
   ===================================================== */

function formatProjectDate(
    dateValue
) {

    if (!dateValue) {

        return "Unknown date";

    }


    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Unknown date";

    }


    return date.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short"
        }
    );

}


/* =====================================================
   COPY SAVED PROJECT
   ===================================================== */

async function copySavedProject(
    project
) {

    const text = `

HTML
====

${project.html_code || ""}


CSS
===

${project.css_code || ""}


JavaScript
==========

${project.js_code || ""}

`;


    try {

        await navigator.clipboard.writeText(
            text
        );


        showToast(
            "Project code copied.",
            "success"
        );


    } catch (error) {

        console.error(
            "Copy project error:",
            error
        );


        showToast(
            "Unable to copy project.",
            "error"
        );

    }

}


/* =====================================================
   DOWNLOAD SAVED PROJECT
   ===================================================== */

async function downloadSavedProject(
    project
) {

    if (
        typeof JSZip ===
        "undefined"
    ) {

        showToast(
            "ZIP library is unavailable.",
            "error"
        );

        return;

    }


    try {

        const zip =
            new JSZip();


        zip.file(
            "index.html",
            project.html_code || ""
        );


        zip.file(
            "style.css",
            project.css_code || ""
        );


        zip.file(
            "script.js",
            project.js_code || ""
        );


        const blob =
            await zip.generateAsync({
                type: "blob"
            });


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;


        link.download =
            `${sanitizeFilename(
                project.project_name ||
                "Codexa Project"
            )}.zip`;


        document.body.appendChild(
            link
        );


        link.click();


        link.remove();


        URL.revokeObjectURL(url);


        showToast(
            "Project ZIP downloaded.",
            "success"
        );


    } catch (error) {

        console.error(
            "Saved project download error:",
            error
        );


        showToast(
            "Unable to download project.",
            "error"
        );

    }

}


/* =====================================================
   CONFIRM DELETE PROJECT
   ===================================================== */

function confirmDeleteProject(
    project
) {

    const name =
        project.project_name ||
        "Untitled Project";


    openConfirm(
        "Delete Project",
        `Are you sure you want to delete "${name}"?`,
        async function() {

            await deleteProject(
                project.id
            );

        }
    );

}


/* =====================================================
   DELETE PROJECT
   ===================================================== */

async function deleteProject(
    projectId
) {

    if (!currentUser) {

        showToast(
            "Please login first.",
            "error"
        );

        return;

    }


    try {

        const {
            error
        } =
            await supabaseClient
                .from("projects")
                .delete()
                .eq(
                    "id",
                    projectId
                )
                .eq(
                    "user_id",
                    currentUser.id
                );


        if (error) {
            throw error;
        }


        /*
           If the deleted project was currently
           open, reset the compiler state.
        */

        if (
            activeProjectId ===
            projectId
        ) {

            activeProjectId = null;

            clearSnapshot = null;

            projectNameInput.value = "";

            htmlCode.value =
                DEFAULT_HTML;

            cssCode.value =
                DEFAULT_CSS;

            jsCode.value =
                DEFAULT_JS;

            undoBtn.disabled = true;

            hideOpenedProjectBar();

            clearPreview();

            saveBtn.textContent =
                "Save Project";

        }


        showToast(
            "Project deleted successfully.",
            "success"
        );


        await loadSavedProjects();


    } catch (error) {

        console.error(
            "Delete project error:",
            error
        );


        showToast(
            error.message ||
            "Unable to delete project.",
            "error"
        );

    }

}


/* =====================================================
   COPY EDITOR CODE
   ===================================================== */

async function copyCode(
    elementId
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        showToast(
            "Code editor not found.",
            "error"
        );

        return;

    }


    try {

        await navigator.clipboard.writeText(
            element.value
        );


        showToast(
            "Code copied.",
            "success"
        );


    } catch (error) {

        console.error(
            "Copy error:",
            error
        );


        showToast(
            "Unable to copy code.",
            "error"
        );

    }

}


/* =====================================================
   ESCAPE HTML
   ===================================================== */

function escapeHtml(
    value
) {

    return String(value)
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
   TOAST
   ===================================================== */

function showToast(
    message,
    type = "info"
) {

    if (!toastContainer) {
        return;
    }


    const toast =
        document.createElement("div");


    toast.className =
        `toast ${type}`;


    toast.textContent =
        message;


    toastContainer.appendChild(
        toast
    );


    const duration =
        2800;


    setTimeout(
        function() {

            toast.classList.add(
                "hide"
            );


            setTimeout(
                function() {

                    toast.remove();

                },
                250
            );

        },
        duration
    );

}


/* =====================================================
   CONFIRM MODAL
   ===================================================== */

function openConfirm(
    title,
    message,
    callback
) {

    confirmTitle.textContent =
        title;

    confirmMessage.textContent =
        message;


    confirmCallback =
        callback;


    confirmOverlay.classList.add(
        "active"
    );


    confirmOverlay.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =====================================================
   CLOSE CONFIRM MODAL
   ===================================================== */

function closeConfirm() {

    confirmOverlay.classList.remove(
        "active"
    );


    confirmOverlay.setAttribute(
        "aria-hidden",
        "true"
    );


    confirmCallback = null;

}


/* =====================================================
   CONFIRM BUTTON
   ===================================================== */

confirmAction.addEventListener(
    "click",
    async function() {

        if (
            typeof confirmCallback !==
            "function"
        ) {

            closeConfirm();

            return;

        }


        const callback =
            confirmCallback;


        closeConfirm();


        try {

            await callback();

        } catch (error) {

            console.error(
                "Confirmation action error:",
                error
            );

        }

    }
);


/* =====================================================
   CANCEL BUTTON
   ===================================================== */

confirmCancel.addEventListener(
    "click",
    closeConfirm
);


/* =====================================================
   CLOSE CONFIRM ON BACKDROP
   ===================================================== */

confirmOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            confirmOverlay
        ) {

            closeConfirm();

        }

    }
);


/* =====================================================
   ESC KEY
   ===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape"
        ) {

            closeConfirm();

            closeMobileMenu();

        }

    }
);


/* =====================================================
   SUPABASE AUTH STATE
   ===================================================== */

supabaseClient.auth.onAuthStateChange(
    function(
        event,
        session
    ) {

        if (session && session.user) {

            currentUser =
                session.user;


            showApp();

        } else {

            currentUser = null;

            activeProjectId = null;


            if (splashFinished) {

                showAuthPage();

            }

        }

    }
);


/* =====================================================
   INITIALIZE CODEXA
   ===================================================== */

async function initializeCodexa() {

    try {

        const {
            data,
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {
            throw error;
        }


        if (
            data &&
            data.session &&
            data.session.user
        ) {

            currentUser =
                data.session.user;


            /*
               Load normal compiler state.

               DO NOT run code here.
            */

            resetEditorState();


            showApp();

        } else {

            currentUser = null;


            /*
               Auth page can be prepared now,
               but splash keeps it hidden until
               typing animation finishes.
            */

            showAuthPage();

        }


    } catch (error) {

        console.error(
            "Initialization error:",
            error
        );


        currentUser = null;

        showAuthPage();

    }

}


/* =====================================================
   INITIAL DEFAULT EDITOR VALUES
   ===================================================== */

function initializeEditors() {

    /*
       Only initialize editor content.

       NEVER call runCode() here.
    */

    if (
        !htmlCode.value &&
        !cssCode.value &&
        !jsCode.value
    ) {

        htmlCode.value =
            DEFAULT_HTML;

        cssCode.value =
            DEFAULT_CSS;

        jsCode.value =
            DEFAULT_JS;

    }


    undoBtn.disabled = true;

}


/* =====================================================
   INITIALIZE
   ===================================================== */

initializeEditors();

initializeCodexa();


/* =====================================================
   SPLASH FALLBACK
   ===================================================== */

setTimeout(
    function() {

        if (!splashFinished) {

            finishSplash();

        }

    },
    2200
);