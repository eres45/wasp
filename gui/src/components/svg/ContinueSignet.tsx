import waspCodeLogo from "../../assets/waspcode-logo.png";

interface ContinueSignetProps {
  /** Height of the signet in pixels */
  height?: number;
  /** Width of the signet in pixels */
  width?: number;
  /** Additional CSS classes to apply to the logo */
  className?: string;
}

/**
 * Compatibility wrapper that now renders the WaspCode logo asset.
 */
export default function ContinueSignet({
  height = 103,
  width = 107,
  className = "",
}: ContinueSignetProps) {
  return (
    <img
      src={waspCodeLogo}
      alt="WaspCode logo"
      width={width}
      height={height}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
