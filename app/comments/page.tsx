import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "动态",
  description: "",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold">动态</h1>
      <div className="space-y-4">
        <div className="ml-2">
          <h2>{formatDate("2025-05-21")}</h2>
          <div className="my-2 ml-4">
            <h3 className="mb-2 text-lg font-semibold">小重山·孤烽远</h3>
            <div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                仿岳飞体 启阳作
              </p>
              <p>
                长夜微霜未肯晴， 梦回边塞月，断鸡声。 起看孤烽照远城。
                风不定，残影过墙生。
              </p>
              <p>
                旧志尚峥嵘。 铁衣尘未洗，冷如冰。 欲将忠胆问青冥，
                天无语，心事付长征。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
