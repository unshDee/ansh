import { LabsEntry } from './labs.component';

export const LABS_ENTRIES: LabsEntry[] = [
  {
    id: 1,
    title: 'i built a website',
    date: '2024.11',
    category: 'code',
    type: 'post',
    // url: 'https://anshdawda.notion.site/I-Built-a-Website-18f579a2cd4080ec8ac7cafe94aae790',
    description:
      "welcome to my **new personal website**! it's been a fun project to work on. this is my first time using angular, and i'm really enjoying it so far. i too k some inspiration from swiss web design, which is known for its grid systems, typography, and minimal aesthetic. i hope you like it!",
  },
  {
    id: 3,
    title: 'transformers without normalization?',
    date: '2025.02',
    category: 'AI Concepts',
    type: 'post',
    description:
      'transformers have long relied on normalization layers like LayerNorm to stabilize training and improve performance. however, a groundbreaking study challenges this paradigm by demonstrating that transformers can achieve equal or better results without any normalization layers. the key lies in a surprisingly simple operation called dynamic tanh (DyT), which re-imagines how neural networks process information.\n\n[read more on notion](https://anshdawda.notion.site/Transformers-without-Normalization-1c6579a2cd4080bba1aafe450db478c2)',
  },
  {
    id: 4,
    title: 'hmmm... cag or rag?',
    date: '2025.03',
    category: 'AI Architecture',
    type: 'post',
    description:
      'large language models (LLMs) are powerful but have inherent limitations like hallucination and lacking up-to-date knowledge. to mitigate these issues, two popular approaches have emerged: Cache-Augmented Generation (CAG) and Retrieval-Augmented Generation (RAG). while both enhance LLM performance, they serve different use cases and have distinct advantages and trade-offs.\n\n[read more on notion](https://anshdawda.notion.site/Hmmm-Cache-or-Retrieval-AG-1c6579a2cd4080419d5ce7267336704d)',
  },
  {
    id: 5,
    title: 'fonts',
    date: '2025.04',
    category: 'Design',
    type: 'brief',
    description:
      "typography has always intrigued me. from the subtle curves of a well-designed serif font to the efficiency of monospaced typefaces, i've found myself captivated by the world of fonts and their unique personalities. my interest in design and typography led me to take a coursera course on the subject, where i delved deeper into the technicalities of type design, kerning, ligatures, and the nuanced aesthetics that make a typeface stand out.",
  },
  {
    id: 6,
    title: 'meditating',
    date: '2025.09',
    category: 'Updates',
    type: 'brief',
    description:
      "a few friends took me for meditation sessions recently, and it was a really interesting experience. i've always been skeptical about meditation and its benefits, but i was surprised by how calming and refreshing it felt.",
  },
  {
    id: 9,
    title: 'building a game for fun',
    date: '2026.02',
    category: 'code',
    type: 'post',
    description:
      "my friends and i have been regularly playing a fun multiplayer game called 'Psych' - it's a game where you make up fake answers to real trivia questions and try to guess the correct one among the fakes. it's a blast, and we've been playing it a lot. so we decided to build our own version with country specific trivia questions, and it's been a really fun project to work on together. check it out here: [Hukka Bukka (click here)](https://hukka-bukka.anshdawda.me) - it's still a work in progress, but we're excited about how it's coming along!\n\nusing firebase's realtime database for game state management, and next.js for the frontend.",
  },
  {
    id: 11,
    title: 'adding a view counter',
    date: '2026.03',
    category: 'code',
    type: 'post',
    description:
      "i added a little view counter to the bottom of my website — it shows the total number of page visits since i set it up.\n\nthe tricky part is that this site is hosted on **github pages**, which is purely static. there's no server to store state, so i needed an external service. i went with **firebase realtime database** (free spark plan) — each page navigation fires an atomic `runTransaction` to increment a counter, and `onValue` keeps the displayed number in sync in real-time.\n\nthe security rules are set to only allow incrementing by exactly 1 per write, so the count can't be reset or inflated arbitrarily. the number you see in the footer is the real thing.",
  },
  {
    id: 10,
    title: 'switch: blogs to labs',
    date: '2026.03',
    category: 'Design',
    type: 'post',
    description:
      "after much contemplation, i've decided to remove the blogs section from my website (rarely updated) and replace it with this. \nthe labs section felt more interesting, and the content presentation with this 'filing cabinet' design felt more fun. \n\n instead of posting 'articles', i post 'entries' here - whcih can be anything i want to share.",
  },
];
