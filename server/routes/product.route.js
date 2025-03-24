import { addProducts, deleteProducts, editProducts, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", addProducts);

router.put("/:id", editProducts);

router.delete("/:id", deleteProducts);

export default router;