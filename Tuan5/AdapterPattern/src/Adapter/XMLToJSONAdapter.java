package Adapter;
// Adapter: Chuyển từ XML sang JSON
public class XMLToJSONAdapter implements DataFormatConverter {
    private XMLProcessor xmlProcessor;
    private JSONProcessor jsonProcessor;

    public XMLToJSONAdapter(XMLProcessor xmlProcessor, JSONProcessor jsonProcessor) {
        this.xmlProcessor = xmlProcessor;
        this.jsonProcessor = jsonProcessor;
    }

    @Override
    public String convertToJSON(String xmlData) {
        // Bước 1: Phân tích XML
        String parsedData = xmlProcessor.parseXML(xmlData);
        // Bước 2: Tạo JSON từ dữ liệu đã phân tích
        return jsonProcessor.generateJSON(parsedData);
    }

    @Override
    public String convertToXML(String jsonData) {
        // Không cần thiết cho adapter này, nhưng phải triển khai
        throw new UnsupportedOperationException("This adapter only converts XML to JSON");
    }
}