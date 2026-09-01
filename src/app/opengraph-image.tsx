import { ImageResponse } from "next/og";
import {
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_SIZE,
  SOCIAL_IMAGE_TYPE,
} from "@/lib/site-config";

export const alt = SOCIAL_IMAGE_ALT;
export const size = SOCIAL_IMAGE_SIZE;
export const contentType = SOCIAL_IMAGE_TYPE;

const BONE = "#f5f0e4";
const GRAPHITE = "#241c14";
const CORAL = "#e4572e";
const MUTED = "#6e6153";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 96px",
        backgroundColor: BONE,
        color: GRAPHITE,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
            width: 64,
            height: 64,
            borderRadius: 16,
            backgroundColor: BONE,
            border: `2px solid ${GRAPHITE}`,
            padding: "16px 12px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 8,
              borderRadius: 4,
              backgroundColor: GRAPHITE,
            }}
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 8,
              borderRadius: 4,
              backgroundColor: CORAL,
            }}
          />
          <div
            style={{
              display: "flex",
              width: "62%",
              height: 8,
              borderRadius: 4,
              backgroundColor: GRAPHITE,
            }}
          />
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 700 }}>
          Reusable List Page Architecture
        </div>
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 56,
          fontSize: 62,
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: -1,
          maxWidth: 980,
        }}
      >
        One list-page system. Four distinct product surfaces.
      </div>

      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 28,
          color: MUTED,
          letterSpacing: 1,
        }}
      >
        Next.js · React · TypeScript · Tailwind CSS
      </div>
    </div>,
    { ...size },
  );
}
