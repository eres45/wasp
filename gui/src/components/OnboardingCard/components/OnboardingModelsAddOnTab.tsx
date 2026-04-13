import { CheckIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import { Button } from "../..";
import { IdeMessengerContext } from "../../../context/IdeMessenger";
import { useCreditStatus } from "../../../hooks/useCredits";
import {
  WASPCODE_PROMO_CREDIT_CENTS,
  WASPCODE_STARTER_CREDIT_CENTS,
  formatCreditDollars,
} from "../../../util/creditWallet";
import { useOnboardingCard } from "../hooks/useOnboardingCard";

/**
 * WaspCode credits onboarding tab with a starter gift and promo redemption.
 */
export function OnboardingModelsAddOnTab() {
  const ideMessenger = useContext(IdeMessengerContext);
  const { close } = useOnboardingCard();
  const { creditStatus, wallet, redeemPromoCode } = useCreditStatus();
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  function handleSetupApiKeys() {
    void ideMessenger.request("controlPlane/openUrl", {
      path: "setup-models/api-keys",
      orgSlug: undefined,
    });
    close();
  }

  async function handleRedeemPromo() {
    setIsRedeeming(true);

    try {
      const result = await redeemPromoCode(promoCode);
      setPromoMessage(result.message);

      if (result.success) {
        setPromoCode("");
      }
    } finally {
      setIsRedeeming(false);
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <div className="mb-4 flex flex-col items-center text-center">
        <h2 className="text-foreground mb-1 text-2xl font-semibold">
          WaspCode Credits
        </h2>

        <span className="text-description text-xs">
          Every install starts with{" "}
          {formatCreditDollars(WASPCODE_STARTER_CREDIT_CENTS)} of free credit.
          Redeem promo codes to add more whenever you need it.
        </span>
      </div>

      <div className="flex w-full flex-col gap-4">
        <div className="grid grid-cols-2 gap-2 text-left">
          <div className="rounded-md border border-solid border-gray-700 p-3">
            <div className="text-description mb-1 text-xs">Current balance</div>
            <div className="text-sm font-semibold">
              {formatCreditDollars(creditStatus?.creditBalance ?? 0)}
            </div>
          </div>
          <div className="rounded-md border border-solid border-gray-700 p-3">
            <div className="text-description mb-1 text-xs">Promo uses</div>
            <div className="text-sm font-semibold">
              {wallet?.promoRedemptions ?? 0}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-foreground text-background flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium">
              <CheckIcon className="h-3 w-3" />
            </div>
            <span className="text-foreground text-sm font-medium">
              Redeem promo code
            </span>
          </div>
          <div className="flex flex-col gap-2 pl-7">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(event) => {
                  setPromoCode(event.target.value);
                  if (promoMessage) {
                    setPromoMessage(null);
                  }
                }}
                placeholder="Enter promo code"
                className="border-input-border bg-input text-input-foreground placeholder:text-input-placeholder focus:border-border-focus box-border flex-1 rounded-md border px-3 py-2 text-xs focus:outline-none"
              />
              <Button
                onClick={handleRedeemPromo}
                disabled={isRedeeming || !promoCode.trim()}
                className="whitespace-nowrap"
              >
                Redeem
              </Button>
            </div>
            <span className="text-description text-xs">
              Each valid promo adds{" "}
              {formatCreditDollars(WASPCODE_PROMO_CREDIT_CENTS)} to your local
              WaspCode balance.
            </span>
            {promoMessage && (
              <span className="text-foreground text-xs font-medium">
                {promoMessage}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="text-foreground ring-foreground flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-transparent text-xs font-medium ring-1 ring-inset">
              2
            </div>
            <span className="text-foreground text-sm font-medium">
              Configure your models
            </span>
          </div>
          <div className="flex gap-2 pl-7">
            <Button onClick={handleSetupApiKeys} className="flex-1">
              Setup API Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
