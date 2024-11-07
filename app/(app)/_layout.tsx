import Loading from "@/components/Loading";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Slot } from "expo-router";

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  if (!session) return <Redirect href="/login" />;

  if (isLoading) return <Loading />;

  return <Slot />;
}
