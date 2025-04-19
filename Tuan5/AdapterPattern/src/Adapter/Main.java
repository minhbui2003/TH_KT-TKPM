package Adapter;
public class Main {
    public static void main(String[] args) {
        // Tạo các đối tượng Adaptee
        XMLProcessor xmlProcessor = new XMLProcessor();
        JSONProcessor jsonProcessor = new JSONProcessor();

        // Tạo các adapter
        DataFormatConverter xmlToJsonAdapter = new XMLToJSONAdapter(xmlProcessor, jsonProcessor);
        DataFormatConverter jsonToXmlAdapter = new JSONToXMLAdapter(jsonProcessor, xmlProcessor);

        // Chuyển đổi XML sang JSON
        String xmlData = "<example>Some XML data</example>";
        String jsonResult = xmlToJsonAdapter.convertToJSON(xmlData);
        System.out.println("Converted XML to JSON: " + jsonResult);

        // Chuyển đổi JSON sang XML
        String jsonData = "{\"example\": \"Some JSON data\"}";
        String xmlResult = jsonToXmlAdapter.convertToXML(jsonData);
        System.out.println("Converted JSON to XML: " + xmlResult);
    }
}