import { useUser } from "context/UserContext";
import Image from "next/image";

export default function Header({ onMobileToggle }) {
  const { user } = useUser();

  return (
    <header className="ps-5 pe-10 py-5 flex justify-between items-center">
      <button onClick={onMobileToggle} className="lg:hidden p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <h2 className="lg:flex gap-2 text-lg font-medium hidden">
        <span>سلام؛</span>
        <span>{user?.name}</span>
      </h2>

      <Image
        alt="profile"
        width={35}
        height={35}
        src={user?.avatarUrl || "/avatar.svg"}
      />
    </header>
  );
}
