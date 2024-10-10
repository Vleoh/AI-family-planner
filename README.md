# AI Family Planner

AI Family Planner is an intelligent assistant for families, helping with task management, dispute resolution, and activity suggestions.

## Features

- User authentication
- Family creation and management
- Task assignment and tracking
- AI-powered dispute resolution
- Activity suggestions based on family preferences and weather
- Integration with Google Calendar for event management

## Technologies Used

- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js with TypeScript, Tailwind CSS
- AI: Hugging Face Spaces (Llama 3.2)
- APIs: Google Calendar API, OpenWeatherMap API
- Deployment: Docker, Hugging Face Spaces

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- Google Cloud Platform account (for Google Calendar API)
- OpenWeatherMap API key
- Hugging Face account

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-family-planner.git
   cd ai-family-planner
   ```

2. Install dependencies for both backend and frontend:
   ```
   npm install
   cd client && npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENWEATHERMAP_API_KEY=your_openweathermap_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   HUGGINGFACE_API_KEY=your_huggingface_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

## Deployment

1. Build the React frontend:
   ```
   cd client && npm run build
   ```

2. Build the Docker image:
   ```
   docker build -t ai-family-planner .
   ```

3. Push the Docker image to your preferred container registry.

4. Deploy the application to Hugging Face Spaces:
   - Create a new Space on Hugging Face
   - Configure the Space to use your Docker image
   - Set the environment variables in the Space settings

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
