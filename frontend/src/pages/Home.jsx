import { useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import API from "../services/axiosInstance";
import styles from "./style";

function Home() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchProducts = async () => {
        try {
            const { data } = await API.get("/products");
            setProducts(data);
        } catch (error) {
            console.log("Error fetching products", error);
        }
    };

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await API.delete(`/products/${id}`);
                setProducts(products.filter((p) => p._id !== id));
            } catch (error) {
                alert("Failed to delete product");
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };
    // const user = JSON.parse(localStorage.getItem("userInfo"));
    return (
        <div style={styles.pageWrapper}>
            {/* Header Section */}
            <header style={styles.header}>
                <div style={styles.leftNav}>
                    <h1 style={styles.logo}>ShopAdmin</h1>
                    {/* User Welcome Message */}
                    {user && (
                        <div style={styles.userBadge}>
                            <span style={styles.userIcon}>👤</span>
                            <span style={styles.userName}>Hi, {user.name}</span>
                        </div>
                    )}
                </div>

                <div style={styles.navButtons}>
                    <button
                        style={styles.addButton}
                        onClick={() => navigate("/add-product")}
                    >
                        + Add Product
                    </button>
                    <button className=" bg-emerald-500 placeholder-indigo-50 p-2 rounded-xl" >
                        <Link to="/admin/products/bulk" style={{ color: "white", textDecoration: "none" }}>
                            Bulk Add Products
                        </Link>
                        </button>
                    <button style={styles.logoutButton} onClick={logout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Main Content */}
            <main style={styles.container}>
                <div style={styles.titleRow}>
                    <h2 style={styles.title}>All Products</h2>
                    <span style={styles.count}>{products.length} Items Found</span>
                </div>

                <div style={styles.grid}>
                    {products.map((product) => (
                        <div key={product._id} style={styles.card}>
                            <div style={styles.categoryBadge}>{product.category}</div>
                            <div style={styles.cardBody}>
                                <h3 style={styles.productName}>{product.name}</h3>
                                <p style={styles.description}>
                                    {product.description?.substring(0, 60)}...
                                </p>
                                <div style={styles.priceRow}>
                                    <span style={styles.price}>₹ {product.price}</span>
                                    <span style={styles.stock}>Stock: {product.countInStock}</span>
                                </div>
                              {product.image && (
                            <div style={{ textAlign: "center" }}>
                                <img
                                    /* Combine backend URL with the image path from DB */
                                    src={`http://localhost:5000/uploads/${product.image}`} 
                                    alt={product.name}
                                    style={{ 
                                        width: "100%", 
                                        height: "150px", 
                                        objectFit: "cover", // This makes images look professional
                                        marginTop: "10px", 
                                        borderRadius: "8px" 
                                    }}
                                    // Fallback in case the image is missing on the server
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/150"; }}
                                />
                            </div>
                        )}

                            </div>
                            <div style={styles.cardActions}>
                                <button
                                    style={styles.editBtn}
                                    onClick={() => navigate(`/edit-product/${product._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => deleteHandler(product._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}


export default Home;