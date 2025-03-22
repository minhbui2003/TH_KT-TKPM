public class Main {
    public static void main(String[] args) {
//		EagerInitializedSingleton instance1 = EagerInitializedSingleton.getInstance();
//		EagerInitializedSingleton instance2 = EagerInitializedSingleton.getInstance();
//		System.out.println("Instance 1 hash:" + instance1.hashCode());
//		System.out.println("Instance 2 hash:" + instance2.hashCode());
//
//        ThreadSafeSingleton instance3 = ThreadSafeSingleton.getInstance();
//        ThreadSafeSingleton instance4 = ThreadSafeSingleton.getInstance();
//        System.out.println("Instance 3 hash:" + instance3.hashCode());
//        System.out.println("Instance 4 hash:" + instance4.hashCode());
//
//        StaticBlockSingleton instance5 = StaticBlockSingleton.getInstance();
//        StaticBlockSingleton instance6 = StaticBlockSingleton.getInstance();
//        System.out.println("Instance 5 hash:" + instance5.hashCode());
//        System.out.println("Instance 6 hash:" + instance6.hashCode());

        LazyInitializedSingleton instance7 = LazyInitializedSingleton.getInstance();
        LazyInitializedSingleton instance8 = LazyInitializedSingleton.getInstance();
        System.out.println("Instance 7 hash:" + instance7.hashCode());
        System.out.println("Instance 8 hash:" + instance8.hashCode());
    }
}