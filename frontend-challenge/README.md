Project Setup
Prerequisites

Node.js
 (v16 or higher)

npm or bun

Installation
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate into the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install dependencies
npm install   # or bun install

# Step 4: Start the development server
npm run dev   # or bun dev


The app will be running at: http://localhost:5173

📂 Project Structure
<YOUR_PROJECT_NAME>/
 ├── public/             # Static assets
 ├── src/                # React components & pages
 ├── index.html          # Main entry file
 ├── package.json        # Scripts & dependencies
 ├── vite.config.ts      # Vite configuration
 ├── tailwind.config.ts  # Tailwind setup
 └── tsconfig.json       # TypeScript configuration

🛠 Available Scripts

npm run dev → Start development server

npm run build → Build for production

npm run preview → Preview production build