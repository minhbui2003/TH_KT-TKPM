package observer;

public class Main {
    public static void main(String[] args) {
       
        Subject task = new Subject();

        ConcreteObserver member1 = new ConcreteObserver("Aaa");
        ConcreteObserver member2 = new ConcreteObserver("Bbbb");

        task.addObserver(member1);
        task.addObserver(member2);

        task.setState("Task is in progress");
        task.setState("Task is completed");
    }
}

