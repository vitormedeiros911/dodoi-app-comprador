import Loading from "@/components/Loading";
import { storageUserGet } from "@/storage/storageUser";
import { router, Slot } from "expo-router";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const user = await storageUserGet();

        if (!user) router.replace("/login");
      } catch (error) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  if (loading) return <Loading />;

  return <Slot />;
}
