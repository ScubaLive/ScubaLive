package scubaLive;

public class SurfaceInterval {
	
	char spg;
	char fpg;
	SurfaceTable stable;
	int interval;

	public SurfaceInterval(int time, char startpg, SurfaceTable table) {
		
		spg = startpg;
		interval = time;
		stable = table;
		fpg = stable.getEndingPressureGroup(startpg, time);
	
	}
	
	public char updateInterval(int time, char startpg) {
		spg = startpg;
		interval = time;
		fpg = stable.getEndingPressureGroup(startpg, time);
		return fpg;
	}
	
	public int setMinInterval (char startpg, char finalpg) {
		interval = stable.getSurfaceIntervalTime(startpg, finalpg)[0];
		return interval;
	}

	public char getFPG() {
		return fpg;
	}
	
	public char getSPG() {
		return spg;
	}
	
	public int getInterval() {
		return interval;
	}
	
	@Override
	public String toString() {
		String output = new String();
		
		return output;
	}
}
