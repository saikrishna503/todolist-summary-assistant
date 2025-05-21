# Todo Summary Assistant

Todo Summary Assistant is a full-stack web application designed to help users manage their todos efficiently, with AI-powered summarization and Slack notification features. This platform allows users to create, update, and delete todos, generate a concise summary using OpenAI’s GPT API, and send the summary directly to a Slack channel via webhook.

---

## Features

### Todo Management:
- Create, read, update, and delete todo items.
- Track task completion status easily.

### AI Summarization:
- Automatically generate a summary of all todos using OpenAI API.
- Summarization helps users get quick overviews without reading every task.

### Slack Integration:
- Send the generated summary as a message to a Slack channel.
- Configure Slack webhook URL securely via environment variables.

### Environment Configuration:
- Uses `.env` files to securely manage API keys and sensitive information.
- Easy setup for local development and deployment.

---

## Tech Stack

### Frontend
- React.js
- Modern CSS for styling and responsiveness

### Backend
- Node.js
- Express.js
- OpenAI API integration
- Slack Webhook integration

---

## Deployment

- Backend can be deployed on Heroku, Render, or Railway.
- Frontend can be deployed on Netlify, Vercel, or Firebase Hosting.
- Make sure to configure environment variables on your hosting platform.

---

## Tools & Methodology

- Agile development methodology for iterative improvement.
- Git for version control and history cleanup.
- OpenAI GPT API for natural language summarization.
- Slack for team communication and notifications.

---

## Installation

### Prerequisites
- Node.js and npm installed
- Slack workspace with Incoming Webhook URL
- OpenAI API key

### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/todo-summary-assistant.git
cd todo-summary-assistant

# Create environment variables file
cat > server/.env <<EOF
PORT=4000
DATABASE_URL=your_database_connection_string (if any)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EOF

# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..

# Start backend server (in one terminal)
npm run server

# Start frontend app (in another terminal)
cd client && npm start

Folder structure
todo-summary-assistant/
├── client/                # React frontend code
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Pages of the app
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS and styling
│   └── public/            # Public assets
├── server/                # Express backend code
│   ├── controllers/       # Business logic for todos and summarization
│   ├── routes/            # API route handlers
│   ├── middleware/        # Express middlewares
│   └── .env               # Environment variables (not committed)
├── .gitignore             # Files to ignore in git
├── README.md              # Project documentation
└── package.json           # Project configuration and scripts


Slack and LLM Setup Guidance
Slack Incoming Webhook
Go to your Slack workspace and create a new Incoming Webhook integration.

Copy the generated Webhook URL.

Paste the URL into your .env as SLACK_WEBHOOK_URL.

The app sends todo summaries to the configured Slack channel via this webhook.

OpenAI API Key
Sign up or log in to OpenAI.

Generate an API key under your account.

Set this key in .env as OPENAI_API_KEY.

The backend uses this key to call the OpenAI API for generating todo summaries.

Design and Architecture Decisions
Separation of Concerns: Frontend built with React to handle UI/UX, while backend built with Express.js handles API requests, OpenAI integration, and Slack notifications.

Environment Configuration: Sensitive keys and URLs stored in .env to avoid committing secrets.

API Design: RESTful endpoints for CRUD operations on todos and for triggering summary generation.

AI Integration: Backend calls OpenAI’s GPT model asynchronously to summarize user todos.

Notification System: Slack webhook sends summary messages for team collaboration and notifications.

Scalability: Modular architecture allows easy addition of new features like user authentication or multi-channel notifications.

Security: GitHub secret scanning enabled to prevent accidental push of API keys.
