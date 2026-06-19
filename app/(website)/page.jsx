import Button from "components/Button";
import Link from "next/link";

export const metadata = {
  title: "خانه",
};

export default function Home() {
  return (
    <main className="my-20 w-11/12 mx-auto 2xl:max-w-screen-2xl">
      <h1 className="text-center text-2xl md:text-5xl font-bold text-secondary-800">
        بلاگیتو: خوش اومدی 👋
      </h1>
      <p className="text-center mt-10 text-secondary-500 text-lg">
        جایی که قراره بتونی یک اپلیکیشن بلاگ رو مدیریت کنی!
        <br />
        بتونی بلاگ بسازی - کامنت بگذاری و در پنلت همه اتفاقات رو رصد کنی!
      </p>
      <div className="flex justify-center gap-5 mt-10">
        <Button variant="outline" className="!p-0">
          <Link className="p-3" href="/blogs">
            مطالعه بلاگ ها
          </Link>
        </Button>
        <Button className="!p-0">
          <Link className="p-3" href="/profile">
            مدیریت بلاگ ها
          </Link>
        </Button>
      </div>
    </main>
  );
}
