package scubaLive;

public class Main {

	public static void main(String[] args) {

		Table table = new Table();

		char endPg = table.getEndingPressureGroup('E', 100);
		System.out.println("end "+endPg);
		endPg = table.getEndingPressureGroup('X', 6);
		System.out.println("end "+endPg);
		int [] surfTime = table.getSurfaceIntervalTime('Y', 'A');
		for (int i = 0; i < surfTime.length; i++) {
			System.out.println("surf "+surfTime[i]);
		}
	}

}
