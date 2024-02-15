# TaskKy

TaskKy is a FullStack task management application designed to help you organize your work efficiently. Similar to Trello, it provides a flexible platform where you can create cards, lists, and tasks to streamline your workflow.

### Features
- **Flexible Task Management:** Create, edit, and organize tasks effortlessly with our intuitive interface.
- **Drag-and-Drop Functionality:** Easily rearrange tasks and lists to prioritize your work.
- **Collaboration:** Invite team members to collaborate on projects and track progress together.
- **Customization:** Tailor TaskKy to fit your workflow with customizable lists, labels, and tags.
- **Integration:** Seamlessly integrate with popular tools and services to enhance productivity.

### Dependencies

TaskKy utilizes the following dependencies:

- **Next.js** 
- **TypeScript** 
- **Server Actions**
- **Tailwind CSS**
- **PostgreSQL:** 
- **Stripe**
- **@clerk/nextjs:** Authentication library for Next.js applications.
- **@hello-pangea/dnd:** Drag-and-drop library for React.
- **@prisma/client:** Prisma client for database operations.
- **@tanstack/react-query:** Data fetching and caching library for React.

  
### Installation

1. Clone the repository: 
```
git clone https://github.com/Othamae/TaskKy.git
```
2. Navigate to the project directory:
```
cd TaskKy
``` 
3. Install the dependencies: npm install
```
npm install
``` 


### Environment Variables
You must create in root directory a ``.env`` file with the next lines:

```javascript
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=
DATABASE_URL=
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=
STRIPE_API_KEY=
NEXT_PUBLIC_BASE_URL=
STRIPE_WEBHOOK_SECRET=
``` 
### Running the Application
To run the application in development mode, use the following command:
```
npm run dev
```

The application will be available at http://localhost:3000.


### Contributing

Contributions from the community are welcome. Feel free to submit bug reports, feature requests, or pull requests to help improve TaskKy.

