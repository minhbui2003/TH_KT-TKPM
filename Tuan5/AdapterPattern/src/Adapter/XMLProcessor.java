package Adapter;
// Adaptee: Xử lý XML
public class XMLProcessor {
    public String parseXML(String xmlData) {
        // Giả lập việc phân tích XML
        System.out.println("Parsing XML data: " + xmlData);
        return "Parsed XML content";
    }

    public String generateXML(String data) {
        // Giả lập việc tạo XML
        System.out.println("Generating XML from data: " + data);
        return "<data>" + data + "</data>";
    }
}