import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || "启阳";
  const description = (
    searchParams.get("description") || "记录了本人学习编程的所思及所得。"
  ).slice(0, 50);

  // Load the font file
  const lxgw = await readFile(
    join(process.cwd(), "app/_fonts/LxgwWenKaiRegular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
          padding: "64px",
          position: "relative",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #e5e7eb 2%, transparent 0%)",
            backgroundSize: "50px 50px",
            opacity: 0.1,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "800px",
            gap: "24px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              lineHeight: 1.2,
              margin: 0,
              background: "linear-gradient(90deg, #111827 0%, #4B5563 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "32px",
              color: "#4B5563",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "auto",
              paddingTop: "24px",
              borderTop: "2px solid #E5E7EB",
            }}
          >
            <div
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                color: "#4B5563",
                fontWeight: 500,
              }}
            >
              wangqiyang.com ｜ 启阳 ｜{" "}
              {new Date().toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "LXGW WenKai",
          data: lxgw,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
