import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { Notification } from "@/components/Notification";
import { HeaderProvider } from "@/contexts/HeaderContext";
import { UserDto } from "@/dto/UserDto";
import { useHeader } from "@/hooks/useHeader";
import { storageUserGet } from "@/storage/storageUser";
import { router, Slot } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  NotificationWillDisplayEvent,
  OneSignal,
  OSNotification,
} from "react-native-onesignal";

export default function AppLayout() {
  const [notification, setNotification] = useState<OSNotification>();
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

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent) => {
      event.preventDefault();

      const notification = event.getNotification();

      setNotification(notification);
    };

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleNotification
    );

    return () =>
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleNotification
      );
  }, []);

  if (loading) return <Loading />;

  return (
    <HeaderProvider>
      {isVisible && <Header user={user} />}
      <Slot />
      {notification?.title && (
        <Notification
          title={notification.title}
          onClose={() => setNotification(undefined)}
        />
      )}
    </HeaderProvider>
  );
}
