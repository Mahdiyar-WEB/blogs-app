import Button from "components/Button";
import SpiderwebMeshBackground from "components/ui/SpiderwebMeshBackground";
import FloatingDecorationDesktop from "components/ui/FloatingDecorationDesktop";
import Link from "next/link";
import FloatingDecorationMobile from "components/ui/FloatingDecorationMobile";
import Image from "next/image";

export const metadata = {
  title: "خانه",
};

export default function Home() {
  return (
    <div className="max-h-dvh overflow-hidden">
      <SpiderwebMeshBackground />
      <FloatingDecorationDesktop />
      <FloatingDecorationMobile />
      <main className="my-20 w-11/12 mx-auto 2xl:max-w-screen-2xl">
        <div className="flex gap-2 mx-auto justify-center items-center">
          <div className="relative aspect-[5/5] w-12 h-12 sm:hidden p-2 pointer-events-none ">
            <Image
              src="/icon.svg"
              alt="app icon"
              fill
              priority
              className="rounded-full shadow-md shadow-orange-300"
            />
          </div>
          <h1 className="text-center text-2xl md:text-5xl font-bold text-secondary-800">
            بلاگیتو: خوش اومدی 👋
          </h1>
        </div>
        <p className="text-center mt-10 text-secondary-500 text-lg">
          جایی که قراره بتونی یک اپلیکیشن بلاگ رو مدیریت کنی!
          <br />
          بتونی بلاگ بسازی - کامنت بگذاری و در پنلت همه اتفاقات رو رصد کنی!
        </p>
        <div className="flex justify-center gap-5 mt-10">
          <Button variant="secondary" className="!p-0">
            <Link className="p-3" href="/blogs">
              مطالعه بلاگ ها
            </Link>
          </Button>
          <Button className="!p-0">
            <Link className="p-3" href="/profile">
              مدیریت اپلیکیشن
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
