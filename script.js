document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    const contentDiv = document.getElementById('content');
    const numParagraphsInput = document.getElementById('numParagraphs');

    generateButton.addEventListener('click', async () => {
        const numParagraphs = parseInt(numParagraphsInput.value, 10);
        if (isNaN(numParagraphs) || numParagraphs <= 0) {
            contentDiv.innerHTML = 'Informe um número válido de parágrafos.';
            return;
        }

        try {
            const response = await fetch(`/lorem?paragraphs=${numParagraphs}`);
            const loremText = await response.text();
            contentDiv.innerHTML = loremText;
        } catch (err) {
            console.error(`Erro ao buscar Lorem Ipsum: ${err}`);
            contentDiv.innerHTML = 'Erro ao buscar Lorem Ipsum';
        }
    });
});
