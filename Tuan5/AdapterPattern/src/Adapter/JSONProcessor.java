package Adapter;
// Adaptee: Xử lý JSON
public class JSONProcessor {
    public String parseJSON(String jsonData) {
        // Giả lập việc phân tích JSON
        System.out.println("Parsing JSON data: " + jsonData);
        return "Parsed JSON content";
    }

    public String generateJSON(String data) {
        // Giả lập việc tạo JSON
        System.out.println("Generating JSON from data: " + data);
        return "{\"data\": \"" + data + "\"}";
    }
}