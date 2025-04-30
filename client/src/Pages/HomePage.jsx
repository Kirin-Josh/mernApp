import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW="cointainer.xl" py={12}>
      <VStack>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-l, cyan.300, blue.300)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text fontSize="xl" textAlign="center" fontWeight="bold">
            No Products? 😫{" "}
            <Link to={"/create"}>
              <Text
                as="span"
                color="orange.400"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
