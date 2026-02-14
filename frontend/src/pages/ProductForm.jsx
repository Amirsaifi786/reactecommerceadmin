import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Show temporary feedback message
  const showFeedback = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Fetch product if editing
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get(
            `http://localhost:5000/api/products/${id}`
          );

          setName(data.name);
          setPrice(data.price);
          setDescription(data.description);
          setCategory(data.category);
          setCountInStock(data.countInStock);
          setPreview(`http://localhost:5000/uploads/${data.image}`);
        } catch (error) {
          toast.error(
            error.response?.data?.error || "Failed to load product ❌"
          );

          // showFeedback("Failed to load product", "error");
        }
      };
      fetchProduct();
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || !category)
      return showFeedback("Please fill all required fields", "error");

    if (price <= 0)
      return showFeedback("Price must be greater than 0", "error");

    if (countInStock < 0)
      return showFeedback("Stock cannot be negative", "error");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);

    if (image) {
      formData.append("image", image);
    }

    try {
      setLoading(true);

      if (id) {
        await axios.put(
          `http://localhost:5000/api/products/${id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Product Updated Successfully 🎉");



        showFeedback("Product Updated Successfully!", "success");
      } else {
        await axios.post(
          "http://localhost:5000/api/products",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // showFeedback("Product Created Successfully!", "success");
        toast.success("Product Created Successfully 🎉");


      }

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      // showFeedback(
      //   error.response?.data?.message || "Something went wrong",
      //   "error"
      // );
      toast.error(
        error.response?.data?.error || "Something went wrong ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {id ? "📝 Edit Product" : "➕ Add Product"}
        </h2>

        {message.text && (
          <div
            style={{
              ...styles.alert,
              backgroundColor:
                message.type === "success" ? "#dcfce7" : "#fee2e2",
              color: message.type === "success" ? "#166534" : "#991b1b",
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={submitHandler} style={styles.form}>
          <input
            style={styles.input}
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Stock Quantity"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />

          <textarea
            style={{ ...styles.input, minHeight: "80px" }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              style={{ width: "120px", margin: "10px auto" }}
            />
          )}

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : id
                ? "Update Product"
                : "Create Product"}
          </button>

          <button
            type="button"
            style={styles.cancelBtn}
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f3f4f6",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  cancelBtn: {
    background: "none",
    border: "none",
    marginTop: "5px",
    textDecoration: "underline",
    cursor: "pointer",
  },
  alert: {
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "15px",
    textAlign: "center",
    fontWeight: "500",
  },
};

export default ProductForm;
