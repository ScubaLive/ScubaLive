package scubaLive;

public class SurfaceInterval {
	
	char spg;
	char fpg;
	Dive sdive;
	Dive fdive;
	SurfaceTable stable;
	int interval;

	public SurfaceInterval(Dive dive1, Dive dive2, SurfaceTable table) {
		spg = dive1.getFPG();
		sdive = dive1;
		fdive = dive2;
		interval = 0;
		stable = table;
		spg = dive1.getFPG();
		fpg = spg;
		fdive.updateDive(0, 0, fpg);
		
	}
	
	public void updateInterval(int time) {
		spg = sdive.getFPG();
		interval = time;
		fpg = stable.getEndingPressureGroup(spg, time);
		fdive.updateDive(fpg);
	}
	
	public void updateInterval() {
		this.updateInterval(this.interval);
	}
	
	public void setMinInterval () {
		interval = stable.getSurfaceIntervalTime(sdive.getFPG(), fdive.getMPG())[0];
		updateInterval();
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
		output = "Stay on surface for " + interval + " minutes.\n";
		return output;
	}
	
	public void draw() {
		
	}
}
