import configs from "../configs/config.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(configs.VITE_APPWRITE_URL)
      .setProject(configs.VITE_APPWRITE_PROJECT_ID)
      .setDevKey(configs.VITE_APPWRITE_DEV_KEY);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) {
        return;
      }

      return userAccount;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

const authService = new AuthService();

export default authService;
