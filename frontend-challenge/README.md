# 🎾 Tennis Courts Review App

A simple two-screen React Native app where users can browse tennis courts, filter/sort them, and leave reviews.  
Built as a coding challenge — mobile-first, fast, and a little fun ✨

---

## 🛠️ Tech Stack
- [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (TypeScript template)
- State management via React Context (`AppContext`)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) for proper insets
- Mocked data generation (no backend)
- Components styled with `StyleSheet` + simple theme system

---

## 📋 Requirements
- Node.js `>=18` (LTS recommended)
- npm or yarn
- Xcode (for iOS Simulator)  
- Android Studio (for Android Emulator)  
- Expo CLI (installed automatically via `npx`)

---

## 🚀 How to Run

Clone the repo and install dependencies:
```bash
git clone <your-repo-url>
cd frontend-challenge
npm install
````

Start the app with Expo:

```bash
npx expo start
```

Then:

* Press **i** to launch iOS Simulator (Mac only, Xcode required)
* Press **a** to launch Android Emulator (Android Studio required)
* Or scan the QR code with Expo Go app on your phone 📱

---

## 🎮 Features

* Browse a list of 80+ mocked tennis courts
* Filter by surface type
* Search by name, city, or surface
* Sort by best rated, most recent, or name
* Court detail screen with image, meta info, and reviews
* Leave your own review (name + rating + comment)

---

## 🤖 AI Tools Used

* **ChatGPT 5** — for structured code generation, debugging, and architectural suggestions
* **GitHub Copilot** — for inline code completions and rapid refactoring

### Prompts I Used

1. **Data Generation**

   > Generate a `mock.tsx` file with more than 50 tennis courts.
   > Each court should contain the following parameters:
   > `id`, `name`, `city`, `surface`, `courts` (number of courts), `rating`, `reviews` (array with `id`, `author`, `text`, `rating`, `createdAt`), and `imageUrl`.
   > Provide realistic city and court names, and suggest an approach for serverless image generation (e.g., Unsplash, placeholder APIs).

2. **Styling & Layout**

   > Review my `List.tsx` and `Details.tsx` files.
   > Identify spacing, alignment, and safe-area issues.
   > Suggest responsive design improvements for mobile-first development.

3. **Bug Fixes**

   > I encountered the TypeScript error:
   > `Type 'Dispatch<SetStateAction<SortKey>>' is not assignable to type '(k: string) => void'.`
   > Explain the root cause and provide a fix compatible with a strongly typed generic `PillToggle` component.

4. **README Support**

   > Generate a human-friendly README file for a coding challenge project.
   > Include sections for Tech Stack, Requirements, How to Run, Features, AI Tools Used, and an author sign-off.
   > Make the format professional but approachable.

5. **Incremental Consultations**

   > Provide guidance on integrating `SafeAreaView` correctly in React Native with `react-native-safe-area-context`.
   > Suggest how to restructure `App.tsx` to avoid header overlap issues.
   > Recommend best practices for handling styles and theme variables.
   > .gitignore file generation

---

## ✍️ Author’s Sign
Built with ❤️, ☕, and a stubborn belief that
tennis courts deserve prettier UIs.
— Ivan 🎾

⏱️ Development Time  
Started: **Sep 17, 15:30**  
Finished: **Sep 17, 19:10**
