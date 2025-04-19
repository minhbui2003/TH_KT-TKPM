package composite;

public class Demo {
    public static void main(String[] args) {
        // Tạo các tập tin
        FileSystem file1 = new File("Document.txt", 1200);
        FileSystem file2 = new File("Image.jpg", 25000);
        FileSystem file3 = new File("Video.mp4", 150000);

        // Tạo các thư mục
        Folder rootFolder = new Folder("Root");
        Folder subFolder1 = new Folder("Documents");
        Folder subFolder2 = new Folder("Media");

        // Xây dựng cấu trúc cây
        subFolder1.add(file1); // Thêm Document.txt vào Documents
        subFolder2.add(file2); // Thêm Image.jpg vào Media
        subFolder2.add(file3); // Thêm Video.mp4 vào Media

        rootFolder.add(subFolder1); // Thêm Documents vào Root
        rootFolder.add(subFolder2); // Thêm Media vào Root

        // Hiển thị toàn bộ cấu trúc
        rootFolder.display();
    }
}
