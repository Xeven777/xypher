# 🔐 Xypher - Password Manager

A modern, secure password manager built with **Next.js**, **TypeScript**, and **AES-256 encryption**. Store, manage, and audit your passwords with enterprise-grade security.

![Security](https://img.shields.io/badge/Security-AES--256--CBC-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## ✨ Features

### 🔒 **Security First**

- **AES-256-CBC Encryption** - All passwords encrypted end-to-end with 256-bit keys
- **Secure Authentication** - Kinde OAuth integration with session management
- **Master Password Validation** - Passwords require uppercase, lowercase, numbers, and 8+ characters
- **Security Headers** - Full CSP, HSTS, and XSS protection
- **Authorization Checks** - User-owned data verification on all operations

### 📊 **Vault Management**

- Add, edit, delete passwords with encrypted storage
- Organize by categories (Login, Email, Finance, Social, etc.)
- Tag passwords for easy grouping
- Mark favorites for quick access
- Real-time search and filtering

### 🛡️ **Security Audit**

- **Password Strength Analysis** - Visual indicator of weak, fair, good, or secure passwords
- **Reused Password Detection** - Automatically finds duplicate passwords across vault
- **Security Dashboard** - Overview of vault health at a glance
- **Detailed Reports** - See exactly which passwords need attention

### 📤 **Import/Export**

- Import passwords from JSON/CSV format
- Export vault as encrypted JSON (with user warning)
- Full validation and error handling
- Supports bulk password migration

### 🎨 **User Experience**

- Dark/Light theme with persistent preferences
- Responsive design (mobile, tablet, desktop)
- One-click password copy with feedback
- Real-time password strength meter
- Intuitive dashboard interface

## 🚀 Tech Stack

| Layer             | Technology                         |
| ----------------- | ---------------------------------- |
| **Frontend**      | Next.js 14+, React, TypeScript     |
| **Styling**       | Tailwind CSS, Shadcn/ui components |
| **Database**      | MongoDB + Prisma ORM               |
| **Encryption**    | Node.js crypto (AES-256-CBC)       |
| **Auth**          | Kinde OAuth                        |
| **Validation**    | Zod schemas                        |
| **Icons**         | Lucide React                       |
| **Notifications** | Sonner toasts                      |

## 📦 Getting Started

### Prerequisites

- Node.js 18+ (or Bun)
- MongoDB instance
- Kinde OAuth credentials

### Installation

```bash
# Clone the repository
git clone https://github.com/Xeven777/xypher.git
cd xypher

# Install dependencies (using bun)
bun install

# Setup environment variables
cp .env.example .env.local
```

### Environment Variables

```env
# Database
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/xypher"

# Kinde OAuth
KINDE_CLIENT_ID="your_client_id"
KINDE_CLIENT_SECRET="your_client_secret"
KINDE_DOMAIN="your-domain.kinde.com"
KINDE_REDIRECT_URL="http://localhost:3000/api/auth/kinde/callback"
KINDE_POST_LOGIN_REDIRECT_URL="http://localhost:3000/pw"
KINDE_POST_LOGOUT_REDIRECT_URL="http://localhost:3000"

# Encryption
SECRET_KEY="your_64_char_hex_string" # Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# URLs
KINDE_SITE_URL="http://localhost:3000"
```

### Development

```bash
# Start dev server
bun dev

# Run TypeScript check
bun run type-check

# Build for production
bun run build

# Start production server
bun start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
xypher/
├── src/
│   ├── app/
│   │   ├── pw/              # Password vault pages
│   │   ├── api/             # API routes
│   │   ├── page.tsx         # Landing page
│   │   └── layout.tsx       # Root layout
│   ├── actions/
│   │   ├── cipher.ts        # AES-256 encryption/decryption
│   │   └── prisma.ts        # Database operations
│   ├── components/
│   │   ├── ui/              # Shadcn components
│   │   ├── header.tsx       # Navigation
│   │   ├── ImportExportButtons.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── db/prisma.ts     # Prisma client singleton
│   │   └── utils.ts         # Utilities
│   └── styles/
│       └── globals.css      # Design tokens
├── prisma/
│   └── schema.prisma        # Database schema
└── public/                  # Static assets
```

## 🔐 Security Architecture

### Encryption Flow

1. User enters password
2. Validated (min 8 chars, uppercase, lowercase, numbers)
3. Encrypted with AES-256-CBC + random IV
4. Stored in MongoDB as hex string
5. Only decrypted when needed (audit, view, export)

### Authentication Flow

1. User logs in via Kinde OAuth
2. Session stored securely
3. User ID verified on all operations
4. CSRF protection via Next.js server actions

## 🧪 Validation & Safety

- **Zod schemas** for runtime validation
- **Type-safe** TypeScript strict mode
- **Authorization checks** on all mutations
- **Input sanitization** for imports
- **Error handling** with safe error messages

## 📊 Database Schema

```prisma
model Passwords {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  userId    String   @index
  title     String
  userName  String?
  password  String   // AES-256-CBC encrypted
  email     String?
  category  String
  url       String?
  notes     String?
  tags      String[]
  isFavorite Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ Available Scripts

```bash
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun type-check   # Run TypeScript checks
bun lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- TypeScript strict mode enabled
- Follow existing code patterns
- Add proper error handling
- Include validation for user inputs
- Write type-safe code

## 🚀 Roadmap

- [ ] Passkey/WebAuthn support
- [ ] Vault sharing (encrypted delegation)
- [ ] Password breach monitoring
- [ ] Password generator
- [ ] Bulk operations
- [ ] TOTP/2FA storage
- [ ] Browser extension
- [ ] Mobile app

---

**Made with ❤️ by [Anish](https://github.com/Xeven777)**
