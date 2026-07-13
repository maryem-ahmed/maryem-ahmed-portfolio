export const personal = {
  name: "Maryem Ahmed",
  title: "AI Engineer",
  tagline:
    "AI Engineer with hands-on experience building end-to-end intelligent systems — from RAG pipelines and LLM orchestration to production MLOps. I don't just train models, I ship AI products that solve real problems.",
  location: "Cairo, Egypt",
  email: "maryemahmed707@gmail.com",
  phone: "+20 102 340 6557",
  linkedin: "https://www.linkedin.com/in/maryem-ahmed",
  github: "https://github.com/maryem-ahmed",
  avatar: "https://avatars.githubusercontent.com/u/125514435?v=4",
  availability: "Open to AI/ML opportunities",
  currentFocus: "MeetGenie — AI Meeting Assistant (Graduation Project)",
};

export const focusThreads = [
  "RAG Pipelines",
  "LLM Systems",
  "Arabic + English NLP",
  "MLOps",
];

export const skillCategories = [
  {
    name: "Programming",
    icon: "code",
    skills: ["Python", "C", "C++", "C#", "Java"],
    color: "from-violet-500 to-purple-600",
  },
  {
    name: "Generative AI & NLP",
    icon: "brain",
    skills: [
      "LLMs",
      "RAG",
      "Prompt Engineering",
      "Semantic Search",
      "Vector Databases",
      "TTS/STT",
    ],
    color: "from-cyan-500 to-blue-600",
  },
  {
    name: "Machine Learning & AI",
    icon: "cpu",
    skills: [
      "Supervised Learning",
      "Unsupervised Learning",
      "CNNs",
      "Neural Networks",
      "Feature Engineering",
    ],
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    name: "Databases",
    icon: "database",
    skills: ["PostgreSQL", "Microsoft SQL Server", "MySQL", "ChromaDB"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    name: "ML Frameworks & Libraries",
    icon: "layers",
    skills: [
      "TensorFlow",
      "Keras",
      "PyTorch",
      "scikit-learn",
      "pandas",
      "NumPy",
      "Matplotlib",
    ],
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "MLOps & Tools",
    icon: "workflow",
    skills: ["MLflow", "Docker", "Git/GitHub", "Model Deployment Pipelines"],
    color: "from-rose-500 to-red-600",
  },
];

export const projects = [
  {
    id: "meetgenie",
    title: "MeetGenie",
    subtitle: "AI Meeting Assistant",
    period: "2025 – 2026",
    badge: "Graduation Project",
    description:
      "End-to-end LLM system that ingests meeting audio, transcribes with WhisperX speaker diarization, and powers RAG-based Q&A with bilingual support.",
    highlights: [
      "WhisperX transcription with speaker diarization stored in ChromaDB",
      "RAG pipeline using Groq LLaMA 3.3 70B with dynamic top-k retrieval",
      "Meeting summarisation, task extraction, and natural language reminders",
      "Full bilingual support (Egyptian Arabic + English) with ElevenLabs TTS",
    ],
    tech: [
      "Python",
      "LLMs",
      "RAG",
      "WhisperX",
      "ChromaDB",
      "Groq",
      "ElevenLabs",
      "NLP",
    ],
    github: "https://github.com/maryem-ahmed",
    featured: true,
  },
  {
    id: "nexthire",
    title: "NextHire",
    subtitle: "HR Assistant",
    period: "2026",
    badge: "DEPI Graduation",
    description:
      "Fully offline RAG-based semantic search engine for CV matching with hybrid dense + sparse retrieval and section-aware PDF chunking.",
    highlights: [
      "Hybrid retrieval: ChromaDB + BGE embeddings fused with BM25 via RRF",
      "Section-aware PDF chunking with PyMuPDF + Tesseract OCR fallback",
      "Persistent skip-list for resumable large-scale CV ingestion",
    ],
    tech: [
      "Python",
      "RAG",
      "ChromaDB",
      "BM25",
      "PyMuPDF",
      "Tesseract",
      "BGE Embeddings",
    ],
    github: "https://github.com/maryem-ahmed",
    featured: true,
  },
  {
    id: "cnn",
    title: "Deep Learning Neural Network",
    subtitle: "Image Classification",
    period: "2025",
    badge: "Deep Learning",
    description:
      "Designed and trained CNNs for image classification with data augmentation, hyperparameter tuning, and comprehensive documentation.",
    highlights: [
      "CNN architectures with data augmentation for generalization",
      "Hyperparameter tuning and regularization for high validation accuracy",
      "Full documentation with architecture diagrams and evaluation metrics",
    ],
    tech: ["Python", "TensorFlow", "Keras", "CNNs", "Computer Vision"],
    github: "https://github.com/maryem-ahmed",
    featured: false,
  },
  {
    id: "sales-forecast",
    title: "Sales Forecasting",
    subtitle: "Time Series Models",
    period: "2025",
    badge: "MLOps",
    description:
      "Multi-store sales prediction using LightGBM and Prophet with reproducible ML pipelines and MLflow experiment tracking.",
    highlights: [
      "LightGBM and Prophet models with hyperparameter tuning for RMSE reduction",
      "MLflow-tracked pipelines with automated preprocessing and training",
      "15+ engineered features from sales, oil prices, and holiday calendars",
    ],
    tech: ["Python", "LightGBM", "Prophet", "MLflow", "pandas", "Time Series"],
    github: "https://github.com/maryem-ahmed",
    featured: false,
  },
];

export const experience = [
  {
    role: "AI — Generative AI Professional",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Nov 2025 – Present",
    location: "Cairo, Egypt",
    type: "Professional Track",
    highlights: [
      "Developing expertise in Generative AI, LLMs, prompt engineering, and AI-powered applications",
      "Building deep learning solutions with TensorFlow, Keras, and PyTorch — CNNs, RNNs, and transformers",
      "Applying MLOps practices for model deployment, monitoring, and lifecycle management",
      "Hands-on NLP and speech technologies including text-to-speech and speech-to-text systems",
    ],
  },
  {
    role: "AI — Data Science Trainee",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    period: "Oct 2024 – May 2025",
    location: "Cairo, Egypt",
    type: "Training Program",
    highlights: [
      "Conducted EDA with Python to extract insights and inform feature engineering",
      "Built MLOps workflows with version control, MLflow experiment tracking, and deployment best practices",
      "Collaborated with cross-functional teams using Agile to deliver data-driven solutions",
    ],
  },
];

export const education = [
  {
    degree: "Bachelor of Computer Science and Information Systems",
    institution: "Shorouk Academy",
    period: "Aug 2022 – Jun 2026",
    location: "Egypt",
    highlights: [
      "Graduation Project: MeetGenie — AI Meeting Assistant with end-to-end LLM pipeline",
      "Focus areas: Machine Learning, Deep Learning, NLP, and Software Engineering",
      "Built multiple AI/ML projects spanning RAG systems, time series forecasting, and computer vision",
    ],
  },
];

export const certifications = [
  {
    name: "DEPI — Data Scientist",
    issuer: "Digital Egypt Pioneers Initiative",
    url: "#",
  },
  {
    name: "Advanced Learning Algorithms",
    issuer: "Coursera / DeepLearning.AI",
    url: "#",
  },
  {
    name: "Supervised Machine Learning: Regression and Classification",
    issuer: "Coursera / DeepLearning.AI",
    url: "#",
  },
  {
    name: "Python Certificate",
    issuer: "HackerRank",
    url: "#",
  },
  {
    name: "Machine Learning",
    issuer: "NTI",
    url: "#",
  },
];

export const navSections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "connect", label: "Connect" },
];
