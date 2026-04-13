import {
  ArrowPathIcon,
  GiftIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CreditStatus } from "core/control-plane/client";
import { useContext, useState } from "react";
import { Button, SecondaryButton, vscButtonBackground } from ".";
import { useAuth } from "../context/Auth";
import { IdeMessengerContext } from "../context/IdeMessenger";
import { cn } from "../util/cn";
import {
  RedeemPromoResult,
  WaspCodeCreditWallet,
  WASPCODE_PROMO_CREDIT_CENTS,
  WASPCODE_STARTER_CREDIT_CENTS,
  formatCreditDollars,
} from "../util/creditWallet";
import { setLocalStorage } from "../util/localStorage";
import { ToolbarButtonWithTooltip } from "./StyledMarkdownPreview/StepContainerPreToolbar/ToolbarButtonWithTooltip";
import { Listbox, ListboxButton, ListboxOptions, Transition } from "./ui";

interface ProgressBarProps {
  label: string;
  current: number;
  total: number;
}

function ProgressBar({ label, current, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.min((current / total) * 100, 100);

  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-xs">
        <span>{label}</span>
        <span>
          {formatCreditDollars(current)} / {formatCreditDollars(total)}
        </span>
      </div>
      <div className="h-2 w-full rounded-full bg-gray-700">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: vscButtonBackground,
          }}
        />
      </div>
    </div>
  );
}

interface CreditStatusProgressBarsProps {
  creditStatus: CreditStatus;
  wallet?: WaspCodeCreditWallet | null;
}

function CreditStatusProgressBar({
  creditStatus,
  wallet,
}: CreditStatusProgressBarsProps) {
  const total = Math.max(
    wallet?.totalGrantedCredits ?? WASPCODE_STARTER_CREDIT_CENTS,
    WASPCODE_STARTER_CREDIT_CENTS,
  );
  const current = creditStatus.creditBalance ?? 0;

  return (
    <ProgressBar label="Available credit" current={current} total={total} />
  );
}

interface StarterCreditsPopoverProps {
  creditStatus?: CreditStatus | null;
  refreshCreditStatus?: () => Promise<void>;
  wallet?: WaspCodeCreditWallet | null;
  redeemPromoCode?: (code: string) => Promise<RedeemPromoResult>;
  children: React.ReactNode;
}

export default function StarterCreditsPopover({
  creditStatus,
  refreshCreditStatus,
  wallet,
  redeemPromoCode,
  children,
}: StarterCreditsPopoverProps) {
  const ideMessenger = useContext(IdeMessengerContext);
  const { refreshProfiles } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isRedeemingPromo, setIsRedeemingPromo] = useState(false);

  const onSetupApiKeys = async () => {
    await ideMessenger.request("controlPlane/openUrl", {
      path: "setup-models/api-keys",
      orgSlug: undefined,
    });
  };

  const onHideStarterCreditsUsage = async () => {
    setLocalStorage("hasExitedFreeTrial", true);
  };

  const onRedeemPromo = async () => {
    if (!redeemPromoCode) {
      return;
    }

    setIsRedeemingPromo(true);

    try {
      const result = await redeemPromoCode(promoCode);
      setPromoMessage(result.message);

      if (result.success) {
        setPromoCode("");
      }
    } finally {
      setIsRedeemingPromo(false);
    }
  };

  const onRefresh = async () => {
    if (isRefreshing) {
      return;
    }

    setIsRefreshing(true);

    const refreshCalls: Promise<unknown>[] = [
      refreshProfiles("Manual refresh from starter credits button"),
    ];

    if (refreshCreditStatus) {
      refreshCalls.push(refreshCreditStatus());
    }

    try {
      await Promise.all(refreshCalls);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Listbox>
      <ListboxButton
        as="span"
        className="!m-0 !flex-none !gap-0 !border-none !bg-transparent !p-0"
      >
        {children}
      </ListboxButton>

      <Transition>
        <ListboxOptions className="pb-0">
          <div className="relative max-w-96 px-4 pb-4">
            <div className="flex items-center gap-2">
              <GiftIcon className="h-4 w-4" />
              <h3 className="text-sm font-semibold">WaspCode credits</h3>
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1">
              <ToolbarButtonWithTooltip
                onClick={() => {
                  void onRefresh();
                }}
                tooltipContent="Refresh credit balance"
              >
                <ArrowPathIcon
                  className={cn("h-3 w-3", isRefreshing && "animate-spin-slow")}
                />
              </ToolbarButtonWithTooltip>
              <ToolbarButtonWithTooltip
                onClick={onHideStarterCreditsUsage}
                tooltipContent="Hide credits"
              >
                <XMarkIcon className="h-3 w-3" />
              </ToolbarButtonWithTooltip>
            </div>

            <div className="mb-4">
              <span className="text-description">
                Every install begins with{" "}
                {formatCreditDollars(WASPCODE_STARTER_CREDIT_CENTS)} of free
                WaspCode credit. Promo codes can add bonus credit to this local
                wallet whenever you redeem them.
              </span>
            </div>

            {wallet && (
              <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-md border border-solid border-gray-700 p-2">
                  <div className="text-description mb-1">Current balance</div>
                  <div className="text-sm font-semibold">
                    {formatCreditDollars(wallet.creditBalance)}
                  </div>
                </div>
                <div className="rounded-md border border-solid border-gray-700 p-2">
                  <div className="text-description mb-1">Promo redemptions</div>
                  <div className="text-sm font-semibold">
                    {wallet.promoRedemptions}
                  </div>
                </div>
              </div>
            )}

            {!creditStatus ? (
              <div className="mb-4 flex items-center justify-center py-8">
                <span className="text-description">
                  Loading credit balance...
                </span>
              </div>
            ) : (
              <CreditStatusProgressBar
                creditStatus={creditStatus}
                wallet={wallet}
              />
            )}

            <div className="mt-4 rounded-md border border-solid border-gray-700 p-3">
              <div className="mb-2 text-sm font-medium">Redeem promo code</div>
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
                  onClick={onRedeemPromo}
                  disabled={isRedeemingPromo || !promoCode.trim()}
                >
                  Redeem
                </Button>
              </div>
              <div className="text-description mt-2 text-xs">
                Each valid promo adds{" "}
                {formatCreditDollars(WASPCODE_PROMO_CREDIT_CENTS)}.
              </div>
              {promoMessage && (
                <div className="mt-2 text-xs font-medium">{promoMessage}</div>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              <SecondaryButton className="flex-1" onClick={onSetupApiKeys}>
                Setup API Keys
              </SecondaryButton>
            </div>
          </div>
        </ListboxOptions>
      </Transition>
    </Listbox>
  );
}
