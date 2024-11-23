import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { UserDto } from "@/dto/UserDto";
import { useHeader } from "@/hooks/useHeader";
import { storageUserGet } from "@/storage/storageUser";
import { router, Slot } from "expo-router";
import React, { useEffect, useState } from "react";

export default function AppLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserDto);
  const { isVisible } = useHeader();

  useEffect(() => {
    async function checkUser() {
      try {
        const session = await storageUserGet();

        if (!session) router.replace("/login");

        setUser(session?.user as UserDto);
      } catch (error) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  if (loading) return <Loading />;

  return (
    <HeaderProvider>
      {isVisible && <Header user={user} />}
      <Slot />
    </HeaderProvider>
  );
}
