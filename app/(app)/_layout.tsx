import { storageUserGet } from "@/storage/storageUser";
import { router, Slot } from "expo-router";
import { useEffect } from "react";

export default function AppLayout() {
  useEffect(() => {
    async function checkUser() {
      const user = await storageUserGet();
      if (!user) router.replace("/login");
    }

    checkUser();
  }, []);

  return <Slot />;
}
