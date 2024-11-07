import Card from "@/components/Card";
import Header from "@/components/Header";
import HorizontalList from "@/components/HorizontalList";
import ScrollView from "@/components/ScrollView";
import SearchInput from "@/components/SearchInput";
import { useAuth } from "@/hooks/useAuth";
import React from "react";

export default function HomeScreen() {
  const imgs = [
    "https://www.drogariaminasbrasil.com.br/media/product/c48/antialergico-allegra-120mg-com-02-comprimidos-sanofi-bea.jpg",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.LwZwMQ-ltZmye4LZmWU0VwHaHa%26pid%3DApi&f=1&ipt=00705ea8b89e30e063a0422e1777de5f775dd7040cf9d27094f58eff807c206c&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.d6ZRi51vrfZAtneW93B20wHaHa%26pid%3DApi&f=1&ipt=593023d288ccea28dee909a18a908131107aee91d8ab30dfaf6e22e7cb26c89f&ipo=images",
  ];

  const { session } = useAuth();

  console.log("HomeScreen", session);

  const promotionsData = [
    {
      id: "1",
      image: imgs[Math.floor(Math.random() * imgs.length)],
      title: "Vitaminas",
      price: "R$ 3,99",
    },
    {
      id: "2",
      image: imgs[Math.floor(Math.random() * imgs.length)],
      title: "Melanina",
      price: "R$ 18,99",
    },
    {
      id: "3",
      image: imgs[Math.floor(Math.random() * imgs.length)],
      title: "Shampoo",
      price: "R$ 18,99",
    },
    {
      id: "4",
      image: imgs[Math.floor(Math.random() * imgs.length)],
      title: "Condicionador",
      price: "R$ 18,99",
    },
    {
      id: "5",
      image: imgs[Math.floor(Math.random() * imgs.length)],
      title: "Protetor Solar",
      price: "R$ 18,99",
    },
    {
      id: "6",
      image: imgs[Math.floor(Math.random() * imgs.length)],
      title: "Protetor Labial",
      price: "R$ 18,99",
    },
  ];

  return (
    <>
      <Header>
        <SearchInput />
      </Header>
      <ScrollView>
        <HorizontalList
          data={promotionsData}
          renderItem={({ item }) => (
            <Card image={item.image} title={item.title} price={item.price} />
          )}
        />
      </ScrollView>
    </>
  );
}
