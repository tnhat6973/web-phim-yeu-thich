// Hàm gọi API backend (Node + MySQL) chạy ở cổng 5000
const API_URL = "http://localhost:5000/api";

export async function request(path, { method = "GET", body, token } = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Có lỗi xảy ra, vui lòng thử lại");
    }

    return data;
}
