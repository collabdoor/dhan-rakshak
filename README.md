# Motivation && Overview

**DhanRakshak** is a passionate hackathon project to enhance financial literacy and provide fraud protection for users in India. The app combines educational content, practical calculators, and interactive fraud prevention training to empower users with financial knowledge and security awareness.


## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router with TypeScript
- **UI Components**: Custom components with Lucide React Native icons
- **Styling**: React Native StyleSheet with gradient backgrounds
- **Fonts**: Inter and Poppins font families
- **State Management**: React hooks and context
- **Platform**: Cross-platform (iOS, Android, Web)

## App Structure (in development)

```
app/
├── _layout.tsx          # Root layout with font loading
├── onboarding.tsx       # Welcome screens for new users
├── +not-found.tsx       # 404 error page
└── (tabs)/             # Main tab navigation
    ├── _layout.tsx      # Tab layout configuration
    ├── index.tsx        # Home dashboard
    ├── learn.tsx        # Learning modules and courses
    ├── protect.tsx      # Fraud protection training
    ├── calculate.tsx    # Financial calculators
    └── profile.tsx      # User profile and settings

components/
├── LanguageContext.tsx  # Multi-language support

hooks/
├── useFrameworkReady.ts # Framework initialization hook

types/
├── env.d.ts            # Environment type definitions
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Package Manager - pnpm 
- Expo CLI


### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dhan-rakshak.git
   cd dhan-rakshak
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm dev
   ```

4. **Run on specific platforms**
   ```bash
   # iOS
   expo run:ios
   
   # Android
   expo run:android
   
   # Web
   pnpm run build:web
   ```


## How to use git in this repo
We work on branches off of `main`. Steps:
- `git checkout main`
- `git pull`
- `git checkout -b yourGitHubHandle/your-branch-name`
- Make your changes
- Lint the code with `pnpm lint`
- `git add .`
- `git commit -m "your message"`
- `git push --set-upstream origin yourGitHubHandle/your-branch-name`
- Go to GitHub and raise a pull request of your branch
- Wait for approval
- Resolution of errors (if any)
- Merge completion
- `git checkout main`
- `git pull`
- `git branch -d yourGitHubHandle/your-branch-name`
You are now ready to start the process over again.


### Environment Variables (yet to configure)

Ask an admin for the `.env` file and place it in the root directory: `~/repo`

```env
EXPO_PUBLIC_API_URL=your_api_url_here
EXPO_PUBLIC_API_KEY=your_api_key_here
```

## Available Scripts

- `dev` - Start development server with telemetry disabled
- `build:web` - Build for web deployment
- `lint` - Run Expo lint checks


## 🚧 Known Issues & Limitations

1. **Calculator Functionality**: Only SIP Calculator is fully implemented
2. **Language Support**: Hindi translations are incomplete
3. **API Integration**: Backend API endpoints need implementation
4. **Chart Visualization**: Investment growth charts are placeholder content
5. **User Authentication**: Login/logout functionality is not connected to backend

## TODOs

- [ ] Set up Nativewind & Nativebase for styling
- [ ] Configure Supabase backend (database, authentication)
- [ ] Integrate Twilio OTP and Supabase OAuth for authentication
- [ ] Set up Node.js backend for business logic and AI/ML services
- [ ] Deploy and configure Sanity.io CMS


## Co - Authored By: 

- Nikita 
- Navneet (admin)
- Ojus (admin)
- Priyam