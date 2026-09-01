import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BONE = "#f5f0e4";
const GRAPHITE = "#241c14";
const CORAL = "#e4572e";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 11,
        padding: "45px 44px",
        backgroundColor: BONE,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 23,
          borderRadius: 11,
          backgroundColor: GRAPHITE,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "100%",
          height: 23,
          borderRadius: 11,
          backgroundColor: CORAL,
        }}
      />
      <div
        style={{
          display: "flex",
          width: "62%",
          height: 23,
          borderRadius: 11,
          backgroundColor: GRAPHITE,
        }}
      />
    </div>,
    { ...size },
  );
}
