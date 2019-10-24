package scubaLive;


public class driver {

	public static void main(String args[]) {
		DiveTable dtable = new DiveTable();
		SurfaceTable stable = new SurfaceTable();
		
		Plan testplan = new Plan(dtable, stable);
		
		
		System.out.println("THIS IS A PROTOTYPE DO NOT USE FOR REAL DIVES!");
		testplan.updateDive(1, 20, 20);
		System.out.println(testplan);
		testplan.updateNum(3);
		testplan.updateDive(2, 60, 15);
		testplan.updateSI(1, -1);
		System.out.println(testplan);
		
	}

}
