class User {
    constructor(username) {
        this.username = username;
        this.parent = null;
        this.children = [];
    }
    
    addChild(childUser) {
        childUser.parent = this;
        this.children.push(childUser);
    }
    
    removeChild(childUser) {
        const index = this.children.indexOf(childUser);
        if (index !== -1) {
            this.children.splice(index, 1);
            childUser.parent = null;
        }
    }
    
    broadcastMessage(message, blockedUsers = []) {
        console.log(`Broadcasting message from ${this.username}: ${message}`);
        for (const child of this.children) {
            if (!blockedUsers.includes(child)) {
                child.receiveMessage(message);
            } else {
                console.log(`${child.username} is blocked from receiving the message.`);
            }
        }
    }
    
    receiveMessage(message) {
        console.log(`${this.username} received message: ${message}`);
    }
}

// Create users
const rootUser = new User("RootUser");
const childUser1 = new User("ChildUser1");
const childUser2 = new User("ChildUser2");

// Build hierarchical structure
rootUser.addChild(childUser1);
rootUser.addChild(childUser2);

// Broadcast message from root, blocking ChildUser2
rootUser.broadcastMessage("Hello, everyone!", [childUser2]);
