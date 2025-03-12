### **Step-by-Step Guide for Contributing to the Project**

Welcome to the **Task Management System** project! As a registered collaborator, you have direct access to the repository, and your contributions will follow a streamlined workflow. Unlike the "fork" model, you don’t need to create a fork of the repository. Instead, you’ll clone the repository directly and work on your assigned issues. Below is a step-by-step guide to help you contribute effectively.

---

### **1. Clone the Repository**
Since you’re a registered collaborator, you can clone the repository directly to your local machine. Open your terminal and run the following command:

```bash
git clone https://github.com/allanbarcelos/task-management-system.git
```

Navigate to the project directory:

```bash
cd task-management-system
```

---

### **2. Check Your Assigned Issue**
Go to the **Issues** tab on GitHub and find the issue assigned to you. Each issue has a clear description of the task you need to complete. On the right-hand side of the issue, you’ll see a section called **"Development"**. This is where you’ll create your branch.

---

### **3. Create a Branch for Your Issue**
To create a branch for your issue, follow these steps:
1. Click on the **"Create a branch"** button under the **"Development"** section in your issue. This will automatically create a branch with a name based on the issue number and title (e.g., `issue-15-add-task-filter`).
2. Copy the branch name.
3. Switch to the new branch on your local machine:

```bash
git checkout -b issue-15-add-task-filter
```

---

### **4. Work on Your Task**
Now that you’re on the correct branch, you can start working on your task. Make sure to:
- Follow the project’s coding standards and guidelines.
- Write clear and concise commit messages.
- Test your changes locally to ensure everything works as expected.

---

### **5. Commit and Push Your Changes**
Once you’ve completed your task, commit your changes and push them to the remote repository:

```bash
git add .
git commit -m "feat: add task filter by status (closes #15)"
git push origin issue-15-add-task-filter
```

---

### **6. Open a Pull Request (PR)**
After pushing your changes, go back to the **Issues** tab on GitHub. Under the **"Development"** section of your issue, you’ll now see an option to **"Link a pull request"**. Click on it to create a new pull request.

- **Title**: Use a descriptive title for your PR (e.g., "Add task filter by status").
- **Description**: Provide a detailed description of your changes, referencing the issue number (e.g., "This PR adds a task filter by status. Closes #15").
- **Reviewers**: Assign reviewers (if required) to get feedback on your changes.

---

### **7. Wait for Review and Merge**
Once your PR is submitted, it will be reviewed by the project maintainers. Be prepared to address any feedback or make additional changes if necessary. Once approved, your changes will be merged into the `main` branch.

---

### **Important Notes**
1. **No Forking Required**: Since you’re a registered collaborator, you don’t need to fork the repository. You can clone it directly and work on your assigned issues.
2. **Branch Naming**: Always create branches using the **"Create a branch"** button in the issue to ensure consistency.
3. **Pull Requests**: Always link your PR to the corresponding issue using keywords like `closes #issue-number` in the PR description.
4. **Communication**: If you have any questions or need help, feel free to reach out in the project’s discussion or Slack channel.

---

### **Summary of Steps**
1. Clone the repository.
2. Check your assigned issue.
3. Create a branch using the **"Create a branch"** button in the issue.
4. Work on your task locally.
5. Commit and push your changes.
6. Open a pull request and link it to the issue.
7. Address feedback and wait for your changes to be merged.

---

By following these steps, you’ll be able to contribute effectively to the project. Thank you for your collaboration, and let’s make this project a success together! 🚀