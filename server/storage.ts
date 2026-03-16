import { users, analyses, type User, type InsertUser, type Analysis, type InsertAnalysis } from "@shared/schema";
import { randomUUID, createHash } from "crypto";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  verifyPassword(userId: string, password: string): Promise<boolean>;
  updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User>;
  updateUserPremiumStatus(userId: string, isPremium: boolean): Promise<User>;
  incrementFreeAnalyses(userId: string): Promise<User>;
  updateUserProfile(userId: string, profile: {
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    healthGoals?: string;
    allergies?: string;
    medications?: string;
    activityLevel?: string;
    dietType?: string;
  }): Promise<User>;
  updateUserAccountInfo(userId: string, info: {
    name?: string;
    email?: string;
    phone?: string;
    profileImage?: string | null;
  }): Promise<User>;
  
  // Analysis management
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalysis(id: string): Promise<Analysis | undefined>;
  getUserAnalyses(userId: string): Promise<Analysis[]>;
  deleteAnalysis(id: string): Promise<void>;
}

function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async verifyPassword(userId: string, password: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user || !user.passwordHash) return false;
    return user.passwordHash === hashPassword(password);
  }

  async updateUserStripeInfo(userId: string, customerId: string, subscriptionId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ 
        stripeCustomerId: customerId, 
        stripeSubscriptionId: subscriptionId,
        isPremium: true,
      })
      .where(eq(users.id, userId))
      .returning();
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUserPremiumStatus(userId: string, isPremium: boolean): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ isPremium })
      .where(eq(users.id, userId))
      .returning();
    if (!user) throw new Error("User not found");
    return user;
  }

  async incrementFreeAnalyses(userId: string): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");
    
    const [updated] = await db
      .update(users)
      .set({ freeAnalysesUsed: user.freeAnalysesUsed + 1 })
      .where(eq(users.id, userId))
      .returning();
    return updated;
  }

  async updateUserProfile(userId: string, profile: {
    age?: number;
    weight?: number;
    height?: number;
    gender?: string;
    healthGoals?: string;
    allergies?: string;
    medications?: string;
    activityLevel?: string;
    dietType?: string;
  }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        age: profile.age,
        weight: profile.weight,
        height: profile.height,
        gender: profile.gender,
        healthGoals: profile.healthGoals,
        allergies: profile.allergies,
        medications: profile.medications,
        activityLevel: profile.activityLevel,
        dietType: profile.dietType,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    if (!user) throw new Error("User not found");
    return user;
  }

  async updateUserAccountInfo(userId: string, info: {
    name?: string;
    email?: string;
    phone?: string;
    profileImage?: string | null;
  }): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        name: info.name,
        email: info.email,
        phone: info.phone,
        profileImage: info.profileImage,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    if (!user) throw new Error("User not found");
    return user;
  }

  // Analysis methods
  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const [analysis] = await db.insert(analyses).values(insertAnalysis).returning();
    return analysis;
  }

  async getAnalysis(id: string): Promise<Analysis | undefined> {
    const [analysis] = await db.select().from(analyses).where(eq(analyses.id, id));
    return analysis;
  }

  async getUserAnalyses(userId: string): Promise<Analysis[]> {
    return db
      .select()
      .from(analyses)
      .where(eq(analyses.userId, userId))
      .orderBy(desc(analyses.createdAt));
  }

  async deleteAnalysis(id: string): Promise<void> {
    await db.delete(analyses).where(eq(analyses.id, id));
  }
}

export const storage = new DatabaseStorage();

