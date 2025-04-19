package observer;

import java.util.ArrayList;
import java.util.List;

// Subject Class
public class Subject {
    private List<Observer> observers = new ArrayList<>();
    private String state;

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    // Xóa Observer khỏi danh sách
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    // Thông báo cho tất cả các Observer
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(state);
        }
    }

    // Cập nhật trạng thái và thông báo
    public void setState(String state) {
        this.state = state;
        notifyObservers();  // Thông báo các Observer khi trạng thái thay đổi
    }

    public String getState() {
        return state;
    }
}
