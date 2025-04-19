package Adapter;
// Target Interface
public interface DataFormatConverter {
    String convertToJSON(String xmlData);
    String convertToXML(String jsonData);
}