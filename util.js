import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 8,
        min: 4,
    },
    wordsPerSentence: {
        max: 16,
        min: 4,
    },
});

export function generateLoremIpsum(paragraphs) {
    const loremText = lorem.generateParagraphs(paragraphs);
    return loremText;
}
