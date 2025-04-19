package composite;

import java.util.ArrayList;
import java.util.List;

public class Folder implements FileSystem {
	private String name;
	private List<FileSystem> children;

	public Folder(String name) {
		this.name = name;
		this.children = new ArrayList<>();
	}


	public void add(FileSystem component) {
		children.add(component);
	}

	
	public void remove(FileSystem component) {
		children.remove(component);
	}


	@Override
	public void display() {
		// TODO Auto-generated method stub
		System.out.println("Folder: " + name);
        System.out.println("Contents:");
        for (FileSystem component : children) {
            component.display(); // Gọi đệ quy để hiển thị các thành phần con
        }
	}

	
}