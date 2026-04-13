import { CreditStatus } from "core/control-plane/client";

export interface WaspCodeCreditWallet {
  creditBalance: number;
  promoRedemptions: number;
  totalGrantedCredits: number;
}

export interface RedeemPromoResult {
  success: boolean;
  message: string;
  addedCredit?: number;
  wallet: WaspCodeCreditWallet;
}

export const WASPCODE_CREDIT_WALLET_STORAGE_KEY = "waspcodeCreditWallet";
export const WASPCODE_STARTER_CREDIT_CENTS = 2000;
export const WASPCODE_PROMO_CREDIT_CENTS = 10000;

const RUMAX_PROMO_CODE = "rumax100";

function createDefaultWallet(): WaspCodeCreditWallet {
  return {
    creditBalance: WASPCODE_STARTER_CREDIT_CENTS,
    promoRedemptions: 0,
    totalGrantedCredits: WASPCODE_STARTER_CREDIT_CENTS,
  };
}

function sanitizeWallet(raw: unknown): WaspCodeCreditWallet {
  if (!raw || typeof raw !== "object") {
    return createDefaultWallet();
  }

  const wallet = raw as Partial<WaspCodeCreditWallet>;

  return {
    creditBalance:
      typeof wallet.creditBalance === "number" && wallet.creditBalance >= 0
        ? wallet.creditBalance
        : WASPCODE_STARTER_CREDIT_CENTS,
    promoRedemptions:
      typeof wallet.promoRedemptions === "number" &&
      wallet.promoRedemptions >= 0
        ? wallet.promoRedemptions
        : 0,
    totalGrantedCredits:
      typeof wallet.totalGrantedCredits === "number" &&
      wallet.totalGrantedCredits >= WASPCODE_STARTER_CREDIT_CENTS
        ? wallet.totalGrantedCredits
        : WASPCODE_STARTER_CREDIT_CENTS,
  };
}

function writeWallet(wallet: WaspCodeCreditWallet) {
  localStorage.setItem(
    WASPCODE_CREDIT_WALLET_STORAGE_KEY,
    JSON.stringify(wallet),
  );

  window.dispatchEvent(
    new CustomEvent("localStorageChange", {
      detail: {
        key: WASPCODE_CREDIT_WALLET_STORAGE_KEY,
        value: wallet,
      },
    }),
  );
}

export function getWaspCodeCreditWallet(): WaspCodeCreditWallet {
  const raw = localStorage.getItem(WASPCODE_CREDIT_WALLET_STORAGE_KEY);

  if (!raw) {
    const wallet = createDefaultWallet();
    writeWallet(wallet);
    return wallet;
  }

  try {
    const wallet = sanitizeWallet(JSON.parse(raw));
    return wallet;
  } catch (error) {
    console.error("Failed to parse WaspCode credit wallet", error);
    const wallet = createDefaultWallet();
    writeWallet(wallet);
    return wallet;
  }
}

export function getWaspCodeCreditStatus(
  wallet = getWaspCodeCreditWallet(),
): CreditStatus {
  return {
    optedInToFreeTrial: true,
    hasCredits: wallet.creditBalance > 0,
    creditBalance: wallet.creditBalance,
    hasPurchasedCredits: wallet.promoRedemptions > 0,
  };
}

export function redeemWaspCodePromo(code: string): RedeemPromoResult {
  const wallet = getWaspCodeCreditWallet();
  const normalizedCode = code.trim().toLowerCase();

  if (normalizedCode !== RUMAX_PROMO_CODE) {
    return {
      success: false,
      message: "Invalid promo code.",
      wallet,
    };
  }

  const nextWallet: WaspCodeCreditWallet = {
    creditBalance: wallet.creditBalance + WASPCODE_PROMO_CREDIT_CENTS,
    promoRedemptions: wallet.promoRedemptions + 1,
    totalGrantedCredits:
      wallet.totalGrantedCredits + WASPCODE_PROMO_CREDIT_CENTS,
  };

  writeWallet(nextWallet);

  return {
    success: true,
    message: "Promo applied. $100.00 credit added.",
    addedCredit: WASPCODE_PROMO_CREDIT_CENTS,
    wallet: nextWallet,
  };
}

export function formatCreditDollars(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
