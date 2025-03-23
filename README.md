
# **Transactoo** 
A full-stack multi-app monorepo for handling transactions using Next.js, Express.js, and PostgreSQL. Supports authentication via **NextAuth** with **Phone Number, Google, and GitHub**.  

## **Tech Stack Used**  
- **Monorepo Management:** [Turborepo](https://turbo.build/)  
- **Frontend:** [Next.js](https://nextjs.org/)  
- **Backend:** [Express.js](https://expressjs.com/)  
- **Database:** [PostgreSQL](https://www.postgresql.org/)  
- **ORM:** [Prisma](https://www.prisma.io/)  
- **Language:** [TypeScript](https://www.typescriptlang.org/)  
- **Authentication:** [NextAuth](https://next-auth.js.org/)  
  -  **Sign in with Phone Number**  
  -  **Sign in with Google**  
  -  **Sign in with GitHub**  

---

## **Project Structure**  
```
/Transactoo
│── apps/
│   ├── user-app/             # Next.js user application
│   ├── merchant-app/         # Next.js merchant application
│   ├── bank_webhook_handler/ # Express.js webhook handler for transactions
│── packages/
│   ├── db/                   # Database schema, migrations, and Prisma ORM
│── .env.example              # Example environment variables
│── turbo.json                # Turborepo configuration
│── package.json
└── README.md


## **📌 Setup & Installation**  

### **1️⃣ Install Dependencies**  
Run the following command from the **root folder**:  
```sh
npm install
```

### **2️⃣ Setup Environment Variables**  
- Copy `.env.example` and rename it to `.env`  
- Place it **in the same directory as `.env.example`**  
- Fill in the required credentials 

#### **Example `.env` file:**  
```env
DATABASE_URL=postgres://username:password@localhost:5432/transactoo
NEXTAUTH_SECRET=your_secret_key

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### **3️⃣ Generate Prisma Client**  
Navigate to the **database package** and migrate databse and then generate the Prisma client:  
```sh
cd packages/db
npx prisma migrate dev
npx prisma generate
```

### **4️⃣ Run the Project**  
Start all applications (**user-app, merchant-app, webhook handler**) with:  
```sh
npm run dev
```

This will:  
 Start `user-app` (**Next.js**)  
 Start `merchant-app` (**Next.js**)  
 Start `bank_webhook_handler` (**Express.js**)  

---

## **🛠 Development & Debugging**  
### **Migrate Database (If Needed)**  
If you update the Prisma schema, apply migrations:  
```sh
cd packages/db
npx prisma migrate dev --name init
```

### **Run a Specific App**  
To run **only a single app**, navigate to its folder and start it manually:  
```sh
cd apps/user-app
npm run dev
```



---

## **Features**  
 **Multi-App Monorepo** (User, Merchant, Webhook handler)  
 **Authentication with Phone, Google, GitHub**  
**Secure Transaction Handling**  
 **Database ORM with Prisma**  
 **Express.js Webhook Handler for Banks**  
 **Modern UI with Next.js**  
**Turborepo for Monorepo Management**  

