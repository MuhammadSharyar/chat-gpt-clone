# ChatGPT Clone

## Description

The **ChatGPT Clone** is an improved user interface for the popular ChatGPT language model. It allows users to engage in natural language conversations, powered by OpenAI's API. With a sleek UI and robust tech stack, this project aims to enhance the chatbot experience.

## Features

- **User-Friendly Interface**: The modern UI design ensures a seamless interaction with the chatbot.
- **Responsive Layout**: Built using **Next.js** and **TailwindCSS**, the app adapts to various screen sizes.
- **Persistent Conversations**: Utilizes **PostgreSQL** to store chat history and maintain continuity.
- **Express.js Backend**: Handles API requests and manages user sessions.
- **OpenAI Integration**: Leverages the OpenAI API for natural language processing.

## Installation

1. Clone the repository:

   ```bash
   https://github.com/MuhammadSharyar/chat-gpt-clone
   ```

2. Install dependencies:

   ```bash
   cd chat-gpt-clone
   npm install
   ```

3. Environment variables:

   - OPENAI_API_KEY
   - DATABASE_URL
   - JWT_SECRET
   - AES_SECRET
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET

4. Start the development server:

   ```bash
   npm run dev
   ```

## Usage

1. Visit `http://localhost:3000` in your browser.
2. Type your messages in the chat interface and receive responses from ChatGPT.

## Contributing

Contributions are welcome! If you'd like to improve the UI, add features, or fix bugs, feel free to submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by OpenAI's ChatGPT and the developer community.
- Thanks to [Next.js](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/) for making development enjoyable.
