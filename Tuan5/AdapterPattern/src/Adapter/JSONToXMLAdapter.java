package Adapter;
// Adapter: Chuyển từ JSON sang XML
public class JSONToXMLAdapter implements DataFormatConverter {
    private JSONProcessor jsonProcessor;
    private XMLProcessor xmlProcessor;

    public JSONToXMLAdapter(JSONProcessor jsonProcessor, XMLProcessor xmlProcessor) {
        this.jsonProcessor = jsonProcessor;
        this.xmlProcessor = xmlProcessor;
    }

    @Override
    public String convertToJSON(String xmlData) {
        // Không cần thiết cho adapter này, nhưng phải triển khai
        throw new UnsupportedOperationException("This adapter only converts JSON to XML");
    }

    @Override
    public String convertToXML(String jsonData) {
        // Bước 1: Phân tích JSON
        String parsedData = jsonProcessor.parseJSON(jsonData);
        // Bước 2: Tạo XML từ dữ liệu đã phân tích
        return xmlProcessor.generateXML(parsedData);
    }
}