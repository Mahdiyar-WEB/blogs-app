const { useRouter } = require("next/navigation");

const useMoveBack = () => {
  const router = useRouter();
  return () => router.back();
};

export default useMoveBack;
