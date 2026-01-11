# 🤖 Agentic Dashboard

**A business intelligence dashboard where you don't just click buttons—you chat with your data.**

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-3.4-38bdf8) ![OpenAI](https://img.shields.io/badge/OpenAI-API-412991)

## 🚀 Overview

**Agentic Dashboard** bridges the gap between Large Language Models (LLMS) and traditional UI components. Unlike typical chatbots that just output text, this application uses **Function Calling** (Tool Use) to give the AI direct control over the dashboard's state.

When you ask, *"Show me sales in the North region"* or *"Switch to chart view"*, the AI doesn't just tell you it can do it—it **actually executes the code** to update the filters and UI in real-time.

## ✨ Key Features

- **🗣️ Natural Language Interface**: Interact with your data using plain English.
- **⚡ Agentic "Function Calling"**: The AI autonomously calls frontend functions (`filterData`, `changeView`, `clearFilters`) based on your intent.
- **📊 Dynamic Visualizations**: Seamlessly switch between **Table View** and **Bar Chart View** (powered by Recharts).
- **🔎 Smart Filtering**: Filter by Region, Category, Amount, or Product Name.
- **🎨 Modern Design**: Built with **Shadcn/UI** and **Tailwind CSS** for a premium, accessible aesthetic.
- **⚡ Instant Feedback**: Optimistic UI updates and "Executing..." feature indicators show exactly what the AI is doing.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **AI Integration**: [OpenAI API](https://platform.openai.com/docs/guides/function-calling) (GPT-4o) / [Anthropic SDK](https://docs.anthropic.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **UI Components**: [Shadcn/UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ installed
- An [OpenAI API Key](https://platform.openai.com/)

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/farhan4783/Agentic-Dashboard.git
    cd Agentic-Dashboard
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` (or `.env.local`) file in the root directory and add your API Key:
    ```env
    OPENAI_API_KEY=sk-your-openai-api-key-here
    ```

4.  **Run the application**:
    ```bash
    npm run dev
    ```

5.  **Open in Browser**:
    Visit [http://localhost:3000](http://localhost:3000).

## 💡 How it Works

1.  **User Input**: You type a request into the chat (e.g., *"Filter by Electronics"*).
2.  **API Request**: The frontend sends the message history to `/api/chat`.
3.  **LLM Decision**: The LLM (GPT-4o) analyzes the request. Instead of replying with text, it decides to call the `filterData` tool with `{ category: 'Electronics' }`.
4.  **Tool Execution**: The frontend receives this tool call, intercepts it, and executes the corresponding `setFilter` action in the **Zustand** store.
5.  **State Update**: The global state changes, causing the `DataView` component to re-render with the new filters applied.
6.  **Confirmation**: The UI updates to show the filtered data, and the chat displays a "⚡ Executing: filterData" indicator.

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/chat/      # AI Endpoint (Tool definitions)
│   │   ├── page.tsx       # Main Dashboard Page
│   │   └── providers.tsx  # React Query Provider
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── ChatInterface.tsx  # The "Agent" & Chat Logic
│   │   │   └── DataView.tsx       # Table/Chart Visualization
│   │   └── layout/
│   │       └── DashboardLayout.tsx # Sidebar & Layout
│   └── lib/
│       └── store.ts       # Zustand Store (Data & State)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
