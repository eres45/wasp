import { CreditStatus } from "core/control-plane/client";
import { useCallback, useEffect, useState } from "react";
import { getLocalStorage } from "../util/localStorage";
import {
  RedeemPromoResult,
  WaspCodeCreditWallet,
  WASPCODE_CREDIT_WALLET_STORAGE_KEY,
  getWaspCodeCreditStatus,
  getWaspCodeCreditWallet,
  redeemWaspCodePromo,
} from "../util/creditWallet";

export function useCreditStatus() {
  const [wallet, setWallet] = useState<WaspCodeCreditWallet>(() =>
    getWaspCodeCreditWallet(),
  );
  const [creditStatus, setCreditStatus] = useState<CreditStatus | null>(() =>
    getWaspCodeCreditStatus(wallet),
  );

  const hasExitedFreeTrial = getLocalStorage("hasExitedFreeTrial");
  const isUsingFreeTrial = !hasExitedFreeTrial;
  const outOfStarterCredits = creditStatus ? !creditStatus.hasCredits : false;

  const refreshCreditStatus = useCallback(async () => {
    const nextWallet = getWaspCodeCreditWallet();
    setWallet(nextWallet);
    setCreditStatus(getWaspCodeCreditStatus(nextWallet));
  }, []);

  const redeemPromoCode = useCallback(
    async (code: string): Promise<RedeemPromoResult> => {
      const result = redeemWaspCodePromo(code);
      setWallet(result.wallet);
      setCreditStatus(getWaspCodeCreditStatus(result.wallet));
      return result;
    },
    [],
  );

  useEffect(() => {
    void refreshCreditStatus();

    const onLocalStorageChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ key?: string }>;

      if (customEvent.detail?.key === WASPCODE_CREDIT_WALLET_STORAGE_KEY) {
        void refreshCreditStatus();
      }
    };

    window.addEventListener("localStorageChange", onLocalStorageChange);

    return () => {
      window.removeEventListener("localStorageChange", onLocalStorageChange);
    };
  }, [refreshCreditStatus]);

  return {
    wallet,
    creditStatus,
    outOfStarterCredits,
    isUsingFreeTrial,
    shouldShowCreditsUi: !hasExitedFreeTrial,
    refreshCreditStatus,
    redeemPromoCode,
  };
}
