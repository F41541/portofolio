import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#0D0E11",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#10B981",
          fontWeight: 800,
          borderRadius: 6,
          border: "1px solid #10B981",
        }}
      >
        L
      </div>
    ),
    {
      ...size,
    }
  );
}
