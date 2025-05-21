import HandDrawnUnderline from "@/components/hand-drawn-underline";
import Image from "next/image";

export const metadata = {
  title: "关于",
  description: "关于我。",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">关于</h1>
      <Image
        src="/avatar.png"
        alt="about"
        width={100}
        height={100}
        className="my-2 rounded-xl"
      />
      <p>
        我叫启阳，是一名
        <HandDrawnUnderline text="iOS开发工程师" />
        ，喜欢研究技术，喜欢分享，喜欢折腾。
      </p>
      <div className="mt-4 space-y-2">
        <p className="font-semibold">技术栈</p>
        <ul className="list-inside list-disc">
          <li>Swift</li>
          <li>SwiftUI</li>
        </ul>
      </div>
      <div className="mt-4 space-y-2">
        <p className="font-semibold">联系方式</p>
        <ul className="list-inside list-disc">
          <li>
            Email:{" "}
            <a
              href="mailto:wangqiyangx@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              wangqiyangx@gmail.com
            </a>
          </li>
          <li>
            Twitter(X):{" "}
            <a
              href="https://x.com/wangqiyangx"
              target="_blank"
              rel="noopener noreferrer"
            >
              @wangqiyangx
            </a>
          </li>
          <li>
            Bluesky:{" "}
            <a
              href="https://bsky.social/profile/wangqiyang.bsky.social"
              target="_blank"
              rel="noopener noreferrer"
            >
              @wangqiyang.bsky.social
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
