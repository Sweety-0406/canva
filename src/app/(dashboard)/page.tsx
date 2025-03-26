import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  await protectServer()
  return (
    <div className="bg-yellow-300">
      hi
    </div>
  );
}
