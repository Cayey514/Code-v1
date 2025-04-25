// Inicializar editores CodeMirror
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
    mode: 'xml',
    htmlMode: true,
    lineNumbers: true,
    theme: 'dracula',
    autoCloseTags: true,
    lineWrapping: true
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
    mode: 'css',
    lineNumbers: true,
    theme: 'dracula',
    autoCloseBrackets: true,
    lineWrapping: true
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
    mode: 'javascript',
    lineNumbers: true,
    theme: 'dracula',
    autoCloseBrackets: true,
    lineWrapping: true
});

// Cambiar entre pestañas
const editorTabs = document.querySelectorAll('.editor-tab');
editorTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remover clase active de todas las pestañas y editores
        document.querySelectorAll('.editor-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.editor').forEach(e => e.classList.remove('active'));
        
        // Agregar clase active a la pestaña clickeada y su editor correspondiente
        tab.classList.add('active');
        const editorId = tab.getAttribute('data-editor') + '-editor';
        document.getElementById(editorId).classList.add('active');
    });
});

// Función para actualizar la vista previa
function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();
    
    const preview = document.getElementById('preview');
    const previewDocument = preview.contentDocument || preview.contentWindow.document;
    
    previewDocument.open();
    previewDocument.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `);
    previewDocument.close();
}

// Actualizar vista previa cuando cambia el código
htmlEditor.on('change', updatePreview);
cssEditor.on('change', updatePreview);
jsEditor.on('change', updatePreview);

// Actualizar vista previa al cargar la página
window.addEventListener('load', updatePreview);

// Hacer el editor responsive con el handle de redimensionamiento
const resizeHandle = document.querySelector('.resize-handle');
const editorContainer = document.querySelector('.editor-container');
const codeEditors = document.querySelector('.code-editors');
const previewContainer = document.querySelector('.preview-container');

let isResizing = false;

resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = window.innerWidth >= 768 ? 'col-resize' : 'row-resize';
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (!isResizing) return;
    
    if (window.innerWidth >= 768) {
        // Modo horizontal (escritorio)
        const containerWidth = editorContainer.offsetWidth;
        const newEditorWidth = e.clientX - editorContainer.offsetLeft;
        const newPreviewWidth = containerWidth - newEditorWidth - 5; // 5px del handle
        
        if (newEditorWidth > 100 && newPreviewWidth > 100) {
            codeEditors.style.width = `${newEditorWidth}px`;
            previewContainer.style.width = `${newPreviewWidth}px`;
        }
    } else {
        // Modo vertical (móvil)
        const containerHeight = editorContainer.offsetHeight;
        const newEditorHeight = e.clientY - editorContainer.offsetTop;
        const newPreviewHeight = containerHeight - newEditorHeight - 5; // 5px del handle
        
        if (newEditorHeight > 100 && newPreviewHeight > 100) {
            codeEditors.style.height = `${newEditorHeight}px`;
            previewContainer.style.height = `${newPreviewHeight}px`;
        }
    }
}

function stopResize() {
    isResizing = false;
    document.body.style.cursor = '';
    document.removeEventListener('mousemove', resize);
}

// Manejar cambios de tamaño de la ventana
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        // Modo horizontal (escritorio)
        resizeHandle.style.width = '5px';
        resizeHandle.style.height = '100%';
        resizeHandle.style.cursor = 'col-resize';
        codeEditors.style.height = '';
        previewContainer.style.height = '';
    } else {
        // Modo vertical (móvil)
        resizeHandle.style.width = '100%';
        resizeHandle.style.height = '5px';
        resizeHandle.style.cursor = 'row-resize';
        codeEditors.style.width = '';
        previewContainer.style.width = '';
    }
});