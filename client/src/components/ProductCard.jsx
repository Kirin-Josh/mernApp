import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDeleteForever, MdEditNote } from "react-icons/md";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdateProduct] = useState(product);
  const bg = useColorModeValue("white", "gray.600");
  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const { onOpen, isOpen, onClose } = useDisclosure();

  const handleDeleteButton = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  const handleEditButton = async (pid, updatedProduct) => {
    const { success } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: "Couldn't update product 😥",
        status: "error",
        duration: "3000",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "product updated",
        status: "success",
        duration: "3000",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="md"
      rounded="md"
      overflow="hidden"
      transition="all, 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h={48} objectFit="cover" />

      <Box px={4} mb={2}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={""} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <Button onClick={onOpen} bg="blue.300" _hover={{ bg: "blue.500" }}>
            <MdEditNote size={30} />
          </Button>
          <Button
            onClick={() => handleDeleteButton(product._id)}
            bg="red.400"
            _hover={{ bg: "red.500" }}
          >
            <MdDeleteForever size={30} />
          </Button>
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Product Image"
                name="image"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updatedProduct, image: e.target.value })
                }
              />
            </VStack>
                  </ModalBody>
                  
                   <ModalFooter>
                <Button
                  bg="orange.400"
                  mr={3}
                  onClick={() => handleEditButton(product._id, updatedProduct)}
                >
                  Update
                </Button>
                <Button
                  variant={"ghost"}
                  _hover={{bg: "blue.400"}}
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
