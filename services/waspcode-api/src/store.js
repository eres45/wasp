import crypto from "node:crypto";
import { Pool } from "pg";

function createAnonymousUserRecord(starterCreditCents) {
  const id = crypto.randomUUID();
  return {
    id,
    token: crypto.randomBytes(24).toString("hex"),
    creditBalance: starterCreditCents,
    promoRedemptions: 0,
    totalGrantedCredits: starterCreditCents,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeUser(row) {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    token: row.token,
    creditBalance: Number(row.credit_balance ?? row.creditBalance ?? 0),
    promoRedemptions: Number(
      row.promo_redemptions ?? row.promoRedemptions ?? 0,
    ),
    totalGrantedCredits: Number(
      row.total_granted_credits ?? row.totalGrantedCredits ?? 0,
    ),
    createdAt: row.created_at ?? row.createdAt,
    updatedAt: row.updated_at ?? row.updatedAt,
  };
}

class MemoryStore {
  constructor(starterCreditCents) {
    this.starterCreditCents = starterCreditCents;
    this.usersByToken = new Map();
  }

  async init() {}

  async createAnonymousUser() {
    const user = createAnonymousUserRecord(this.starterCreditCents);
    this.usersByToken.set(user.token, user);
    return user;
  }

  async getUserByToken(token) {
    return this.usersByToken.get(token) ?? null;
  }

  async redeemPromo(token, promoCreditCents) {
    const user = await this.getUserByToken(token);
    if (!user) {
      return null;
    }

    user.creditBalance += promoCreditCents;
    user.promoRedemptions += 1;
    user.totalGrantedCredits += promoCreditCents;
    user.updatedAt = new Date().toISOString();
    return user;
  }

  async adjustCredits(token, deltaCents) {
    const user = await this.getUserByToken(token);
    if (!user) {
      return null;
    }

    const nextBalance = user.creditBalance + deltaCents;
    if (nextBalance < 0) {
      return null;
    }

    user.creditBalance = nextBalance;
    user.updatedAt = new Date().toISOString();
    return user;
  }
}

class PostgresStore {
  constructor(databaseUrl, starterCreditCents) {
    this.starterCreditCents = starterCreditCents;
    this.pool = new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes("localhost")
        ? false
        : {
            rejectUnauthorized: false,
          },
    });
  }

  async init() {
    await this.pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        token TEXT NOT NULL UNIQUE,
        credit_balance INTEGER NOT NULL,
        promo_redemptions INTEGER NOT NULL DEFAULT 0,
        total_granted_credits INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);
  }

  async createAnonymousUser() {
    const user = createAnonymousUserRecord(this.starterCreditCents);
    const { rows } = await this.pool.query(
      `
        INSERT INTO users (
          id,
          token,
          credit_balance,
          promo_redemptions,
          total_granted_credits,
          created_at,
          updated_at
        ) VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        RETURNING *;
      `,
      [
        user.id,
        user.token,
        user.creditBalance,
        user.promoRedemptions,
        user.totalGrantedCredits,
      ],
    );

    return normalizeUser(rows[0]);
  }

  async getUserByToken(token) {
    const { rows } = await this.pool.query(
      `SELECT * FROM users WHERE token = $1 LIMIT 1;`,
      [token],
    );
    return normalizeUser(rows[0]);
  }

  async redeemPromo(token, promoCreditCents) {
    const { rows } = await this.pool.query(
      `
        UPDATE users
        SET credit_balance = credit_balance + $2,
            promo_redemptions = promo_redemptions + 1,
            total_granted_credits = total_granted_credits + $2,
            updated_at = NOW()
        WHERE token = $1
        RETURNING *;
      `,
      [token, promoCreditCents],
    );

    return normalizeUser(rows[0]);
  }

  async adjustCredits(token, deltaCents) {
    const { rows } = await this.pool.query(
      `
        UPDATE users
        SET credit_balance = credit_balance + $2,
            updated_at = NOW()
        WHERE token = $1
          AND credit_balance + $2 >= 0
        RETURNING *;
      `,
      [token, deltaCents],
    );

    return normalizeUser(rows[0]);
  }
}

export async function createStore({ databaseUrl, starterCreditCents }) {
  const store = databaseUrl
    ? new PostgresStore(databaseUrl, starterCreditCents)
    : new MemoryStore(starterCreditCents);

  await store.init();
  return store;
}
