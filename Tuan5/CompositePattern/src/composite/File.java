package composite;

public class File implements FileSystem{
	private String name;
    private long size; 

    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }

    @Override
    public void display() {
        System.out.println("File: " + name + " (" + size + " bytes)");
    }
}
