class TemplateProcessor {
    render(view) {
        const rootNode = document.getElementsByTagName('main')[0];
        rootNode.innerHTML = view;
    }
}

export default TemplateProcessor;